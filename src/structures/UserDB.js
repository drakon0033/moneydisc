const UserModel = require('../models/User.js');
const { users: cache } = require('./cache.js');
const {Collection} = require('discord.js');


/**
 * @typedef {Object} Warn
 * @property {string} byID - moderator id
 * @property {number} time
 * @property {string} reason
 */

const MONEY_K = 7;
const VOICE_K = 5000;
/**
 * @param  {Number} voice - time in a voice channel
 * @param  {Number} msgs - count of messages 
 * @return {Number} - xp
 */

class UserDB {
	#db;

	/**
	 * @constructor
	 * @param {UserModel} dbuser
	 */
	constructor(dbuser) {

		this._id = dbuser._id;
		this.money = dbuser.money;
		this.voiceTime = dbuser.voiceTime;
		this.messages = dbuser.messages;
		this._spouse = dbuser.spouse;

		this.#db = dbuser; 
	}
	setMoney(money) {
		this.money = Number(money);
		return this.#db.setMoney(this.money).catch(console.error);
	}
	addMoney(money) {
		return this.setMoney(this.money+money);
	}
	subMoney(money) {
		return this.setMoney(this.money-money);
	}
	get spouse() {
		return UserDB.findById(this._spouse);
	}
	setSpouse(_id) {
		if(!UserDB.findById(_id)) throw new Error(`User with _id "${_id}" not exists`);
		this._spouse = _id;
		return this.#db.setSpouse(_id).catch(console.error);
	}
	divorce() {
		if(!this.spouse) throw new Error('User is not in marriage.');
		this._spouse = null;
		return this.#db.setSpouse(null).catch(console.error);
	}
	async addMessage() {
		this.messages++;

		//we will be saving each 30 messages
		if(!(this.messages % 30)) {
			await this.#db.setMessages(this.messages).catch(console.error);
			const money = (this.voiceTime, this.messages-30)/MONEY_K;
		//	await this.addMoney(money);
		} 
	}
	setVoiceTime(time) {
		this.voiceTime = time;
		return this.#db.setVoiceTime(this.voiceTime).catch(console.error);		 
	}
	async addVoiceTime(time) {
        const result = await this.setVoiceTime(this.voiceTime+time);
        const money = Math.round(time/120000)
        await this.addMoney(money);
        return result;
    }
	delete() {
		cache.delete(this._id);
		return this.#db.remove().catch(console.error);
	}
	static delete(_id) {
		return UserDB.findById(_id).delete();	
	}
	static create(data) {
		const dbuser = new UserModel(data);
		dbuser.save().catch(console.error);
		return UserDB.cache(dbuser);
	}
	static cache(dbuser) {
		if(!(dbuser instanceof UserModel)) throw new TypeError('user must be type the UserModel');
		if(UserDB.findById(dbuser._id)) throw Error(`user with id "${dbuser._id}" already exists`);
		const user = new UserDB(dbuser);
		cache.set(user._id, user);
		return user;
	}
	static findById(_id) {
		return cache.get(_id);
	}
}

module.exports = UserDB;
