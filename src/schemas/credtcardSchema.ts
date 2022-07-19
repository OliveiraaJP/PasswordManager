import JoiBase from 'joi';
import JoiDate from '@joi/date';

const joi = JoiBase.extend(JoiDate);

const passwordRegex = /^\d{4}$/;
const numberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
const securityCodeRegex = /^\d{3}$/

export const createCardSchema = joi.object({
    title: joi.string().required(),
	number: joi.string().pattern(numberRegex).required(),
	cardholderName: joi.string().required(),
	securityCode: joi.string().length(3).pattern(securityCodeRegex).required(),
	expirationDate: joi.date().format('MM/YY').required(),
	password: joi.string().length(4).pattern(passwordRegex).required(),
	isVirtual: joi.boolean().strict().required(),
	type: joi.string().valid('credit', 'debit', 'both').required(),
})