/**
 * @typedef {Object} Validation
 * @property {boolean} valid
 * @property {string} error
 */

/** @type {Validation} */
const OK = { valid: true, error: 'OK' } 

/** 
 * @param  {string} msg
 * @return {Validation}
 */
const error = (err) => ({ valid: false, error: err });

const validate = {
	validateMember(member) {
		if(!member) return error('Укажите участника сервера.');
		return OK;
	}
}

module.exports = validate;
