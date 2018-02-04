import nodemailer from 'nodemailer';
import { mailDetails } from '../config'
import async from 'async'

let transporter = nodemailer.createTransport({
	host: mailDetails.host,
	port: mailDetails.port,
	secure: true,
	auth: {
		user: mailDetails.user,
		pass: mailDetails.password
	}
});


export const emailSender = async (mailOptions) => {
	try {
		let info = await transporter.sendMail(mailOptions)
		return { status: true, message: info }
	}
	catch (err) {
		return { status: false, message: err }
	}
}