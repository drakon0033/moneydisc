const UserModel = require('../models/User.js');
const { users: cache, clans } = require('./cache.js');
const {Collection} = require('discord.js');
const { getLvl } = require('../util/lvlSystem.js');


/**
 * @typedef {Object} Warn
 * @property {string} byID - moderator id
 * @property {number} time
 * @property {string} reason
 */

const MONEY_K = 7;
const LVL_K = 2.3;
const VOICE_K = 5000;

/**
 * @param  {Number} voice - time in a voice channel
 * @param  {Number} msgs - count of messages 
 * @return {Number} - xp
 */
function getXp(voice = 0, msgs = 0) {
		return ((voice/VOICE_K)+msgs)*LVL_K;
}

class UserDB {
	#db;

	/**
	 * @constructor
	 * @param {UserModel} dbuser
	 */
	constructor(dbuser) {

		this._id = dbuser._id;
		this.money = dbuser.money;
		this.mute = dbuser.mute;
		this.warns = dbuser.warns;
		this.voiceTime = dbuser.voiceTime;
		this.messages = dbuser.messages;
		this._spouse = dbuser.spouse;
		this._clan = dbuser.clan || null;

		this.#db = dbuser; 
	}
	get xp() {
		return getXp(this.voiceTime, this.messages);
	}
	get lvl() {
		return getLvl(this.xp);
	}
	async setMoney(money) {
		this.money = Number(money);
		return await this.#db.setMoney(this.money).catch(console.error);
	}
	async addMoney(money) {
		return await this.setMoney(this.money+money);
	}
	subMoney(money) {
		return this.setMoney(this.money-money);
	}
	get spouse() {
		return UserDB.findById(this._spouse);
	}
	get clan() {
		return clans.get(this._clan);
	}
	leaveClan() {
		if(!this.clan) throw new Error('User not joined in a clan');
		this._clan = null;
		return this.#db.setClan(null).catch(console.error);
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
	setMute(mute) {
		this.mute = mute;
		return this.#db.setMute(mute).catch(console.error);
	}
	setClan(_id) {
		if(!clans.get(_id)) throw new Error(`Clan with id "${_id}" not exists`);
		this._clan = _id;
		return this.#db.setClan(_id).catch(console.error);
	}
	async addMessage() {
		this.messages++;

		//we will be saving each 30 messages
		if(!(this.messages % 30)) {
			await this.#db.setMessages(this.messages).catch(console.error);
			const money = (this.xp-getXp(this.voiceTime, this.messages-30))/MONEY_K;
			await this.addMoney(money);
		} 
	}
	async setVoiceTime(time) {
		this.voiceTime = time;
		return await this.#db.setVoiceTime(this.voiceTime).catch(console.error);		 
	}
	async addVoiceTime(time) {
		const result = await this.setVoiceTime(this.voiceTime+time);
		const money = (this.xp-getXp(this.voiceTime-time, this.messages))/MONEY_K
		await this.addMoney(money);
		return result;
	}
	addWarn(byID, reason) {

		/** type {Warn} */
		const warn = { byID, reason, time: Date.now() }
		return this.#db.addWarn(warn).catch(console.error);
	}
	removeWarn(n) {
		this.warns.splice(n,1);
		return this.#db.removeWarn(n).catch(console.error);
	}
	clearWarns() {
		this.warns = [];
		return this.#db.clearWarns().catch(console.error);
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
