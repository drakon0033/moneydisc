const { 
	TAG_MAX, 
	DESCRIPTION_MAX, 
	NAME_MAX, 
	NAME_MIN 
} = require('../../util/Constants.js').clan;

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
	validateName(name) {
		if(!name) return error('Название клана не указано')
		if(name.length < NAME_MIN) return error(`Название клано слишком короткое [минум ${NAME_MIN} символа]`);
		if(name.length > NAME_MAX) return error(`Название клана слишком длинное [максимум ${NAME_MAX} символов]`);
		return OK;
	},
	validateTag(tag) {
		if(!tag) return error('Тег клана не указан.');
		if(tag.length > TAG_MAX) return error(`Тег клана слишком длинный [максимум ${TAG_MAX} символа]`);
		return OK;
	},
	validateDescription(description) {
		if(!description) return error('Описание не указано.');
		if(description.length > DESCRIPTION_MAX) return error(`Описание слишком длинное [максимум ${DESCRIPTION_MAX} символов]`);
		return OK;
	},
	validateClan(message) {
		if(!message.author.db.clan) return error('Вы ещё не присоеденились к клану.');
		return OK;
	},
	validateOwner(message) {
		if(!validate.validateClan(message).valid) return validate.validateClan(message);
		if(message.author.db.clan.owner._id !== message.author.id) return error('У вас недостаточно прав для данного действия. Вы должны быть создателем клана.');
		return OK;
	}
}

module.exports = validate;
