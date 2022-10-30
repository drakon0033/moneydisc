const { Schema, model } = require('mongoose')

/**
 * @typedef {Object} Warn
 * @property {string} byID - moderator id
 * @property {number} time
 * @property {string} reason
 */

const schema = new Schema({
	_id: String,
	money: {
		type: Number,
		default: 0
	},
	voiceTime: {
		type: Number,
		default: 0
	},
	messages: {
		type: Number,
		default: 0
	},
	spouse: {
		type: String,
		default: null
	}
}, { versionKey: false })

schema.methods = {
	setMoney(money) {
		this.money = money;
		return this.save();
	},
	setSpouse(_id) {
		this.spouse = _id;
		return this.save();
	},	
	setMessages(n) {
		this.messages = n;
		return this.save(); 
	},
	setVoiceTime(time) {
		this.voiceTime = time;
		return this.save(); 
	}
}

module.exports = model('Members', schema);
