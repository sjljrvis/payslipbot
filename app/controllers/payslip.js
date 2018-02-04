import fs from 'fs'
import async from "async"
import { emailSender } from '../../utils/email'


export const fetchUserPayslipFromDB = async (db ,userName) => {
	try {
		let payslip = await db.models.Payslip.find({ userName: userName });
		if (payslip.length > 0) {
			let temp = payslip.map((x) => {
				return x.salaryData;
			});
			let salaryData = temp.join("\n");
			fs.writeFileSync(`${__base}/public/${userName}`, salaryData);
			return { status: true, user : payslip, message: `Your salary slip here- https://payslipbot.herokuapp.com/${userName}` }
		}
		else {
			return { status: false, message: `Sorry I could not find your records` }
		}
	}
	catch (e) {
		console.log(e);
		return { status: false, message: `Sorry ${userName} Error in my Database` }
	}
}


export const addPaylip = async (req, res) => {
	try {
		let salary = await req.app.db.models.Payslip.create({ userName: req.body.userName, email: req.body.email, salaryData: req.body.salaryData });
		res.json({ status: true, messsage: "salary Added success fully" })
	}
	catch (e) {
		res.json(e);
	}
}


export const oauth = async (req, res) => {
	res.redirect(302,'https://slack.com');
}


export const slackChallenge = async (req, res) => {
	res.json(req.body.challenge);
}
