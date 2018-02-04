'use strict';

export const paySlipSchema = function (app, mongoose) {
	var paySlipSchema = new mongoose.Schema({
		userName: String,
		email: { type: String, default: "" },
		salaryData: { type: String, default: "" },
		date: {
			type: Date,
			default: Date.now()
		},
	});
	paySlipSchema.set('autoIndex', (app.get('env') === 'development'));

	app.db.model('Payslip', paySlipSchema);

};
