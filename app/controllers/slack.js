/*botToken
* Initializing slack here
*/
import { RtmClient, WebClient, RTM_EVENTS } from '@slack/client'
import { apiaiPromise } from './apiai'
import { fetchUserPayslipFromDB } from './payslip'
import { emailSender } from '../../utils/email'

const htmlregex = /<mailto:|>/ig;
export const slack = (app) => {


	const rtm = new RtmClient(app.config.slack.botToken);
	const web = new WebClient(app.config.slack.botToken);

	let users = [];
	let updateUsers = (data) => {
		users = data.members.map((x) => { return { name: x.name, id: x.id } });
	}
	let findUserNameById = (id) => {
		return users.filter(x => x.id == id).map(y => { return y.name });
	}

	(async () => {
		try {
			let data = await (web.users.list());
			updateUsers(data);
		}
		catch (err) {
			console.error('web.users.list Error:', err);
		}
	})();



	rtm.on(RTM_EVENTS.MESSAGE, (message) => {
		(async () => {
			let response = await (apiaiPromise(message.text));
			let userName = findUserNameById(message.user);
			if (response.result.fulfillment.speech == 'okay') {
				let payslip = await (fetchUserPayslipFromDB(app.db, userName));
				if (payslip.status) {
					let mailOptions = {
						from: 'sejal@binarynumbers.io',
						to: payslip.user[0].email,
						subject: 'Payslip',
						text: 'Your salary is -',
						html: `<h1>Your salary slip here- https://payslipbot.herokuapp.com/${userName}<h1>`,// plain text  
						attachments: [{
							path: `${__base}/public/${userName}`
						}]
					};
					let emailInfo = emailSender(mailOptions)
					await (rtm.sendMessage(`Hey @${userName} ${payslip.message}`, message.channel))
				}
				else {
					await (rtm.sendMessage(`Hey @${userName} ${payslip.message}`, message.channel));
					await (rtm.sendMessage(`You can add your salary by typing "Add my salary : userName-email-salaryData"  Data should be "-" seprated`, message.channel))
				}
			}
			else if (response.result.fulfillment.speech == 'payslip added') {
				try {
					message.text = message.text.replace(htmlregex , "");
					let salaryInput = message.text.split(':')[1].trim().split('-');
					console.log(salaryInput)
					if (salaryInput.length != 4) {
						throw "exception"
					}
					else {
						if (salaryInput[1].indexOf('@') != -1) {
							let salary = await app.db.models.Payslip.create({ userName: salaryInput[0], email: salaryInput[2], salaryData: salaryInput[3] });
							await (rtm.sendMessage(`Hey @${userName} Your salary slip is added`, message.channel));
						}
						else {
							throw "email exception"
						}
					}
				}
				catch (err) {
					if (err == "email exception") {
						await (rtm.sendMessage(`Email should be in correct format for-eg : "user@gmail.com"`, message.channel));
						return;
					}
					await (rtm.sendMessage(`Command should be in given format "Add my salary : userName-user@email.com-salary is 800000"  Data should be "-" seprated`, message.channel))
				}
			}
			else {
				await (rtm.sendMessage(`${response.result.fulfillment.speech} ${userName}`, message.channel))
			}
		})();
	});

	rtm.start();

}
