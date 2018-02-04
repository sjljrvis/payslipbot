import {paySlipSchema} from './schema/payslip';

export const models = (app, mongoose) => {
  paySlipSchema(app, mongoose);  
}