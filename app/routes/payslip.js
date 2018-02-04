
export const payslipRoute = (app) => {

	app.get('/oauth', require(__base + "/app/controllers/payslip.js").oauth)
	app.post('/addPayslip', require(__base + "/app/controllers/payslip.js").addPaylip)
	app.post('/slackchallenge', require(__base + "/app/controllers/payslip.js").slackChallenge)

}