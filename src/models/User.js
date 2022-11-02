const { Schema, model } = require('mongoose')

/**
 * @typedef {Object} Warn
 * @property {string} byID - moderator id
 * @property {number} time
 * @property {string} reason
 */

const schema = new Schema({
	_id: String,
	mute: {
		type: Number,
		default: null
	},
	warns: [{ 
		byID: String, 
		time: Number, 
		reason: String,
		index: false
	}],
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
	clan: {
		type: String,
		default: null 
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
	setClan(_id) {
		this.clan = _id;
		return this.save();
	},
	setSpouse(_id) {
		this.spouse = _id;
		return this.save();
	},
	setMute(mute) {
		this.mute = mute;
		return this.save();
	},
	
	/**
	 * @param {Warn} warn
	 */
	addWarn(warn) {
		this.warns.push(warn);
		return this.save();
	},
	removeWarn(n) {
		this.warns.splice(n,1);
		return this.save();	 
	},
	clearWarns() {
		this.warns = [];
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
