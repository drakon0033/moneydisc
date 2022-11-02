const ClanModel = require('../models/Clan.js');
const { clans: cache, users } = require('./cache.js');
const { Collection } = require('discord.js');

class ClanDB {
	#db;

	/**
	 * @constructor
	 * @param {ClanModel} dbclan
	 */
	constructor(dbclan) {

		this._id = dbclan._id;
		this.name = dbclan.name;
		this.banner_url = dbclan.banner_url;
		this.tag = dbclan.tag;
		this.description = dbclan.description;
		this.members = new Collection();

		for(const _id of dbclan.members) this.members.set(_id, users.get(_id));

		this.#db = dbclan; 
	}
	get owner() {
		return users.get(this._id);
	}
	addMember(_id) {
		const user = users.get(_id);
		if(!user) throw new Error(`User with _id ${_id} not exists`);
		if(this.members.has(_id)) throw new Error(`A member with _id in this clan "${_id}" already exists`);
		this.members.set(_id, user);
		return this.#db.addMember(_id).catch(console.error);
	}
	removeMember(_id) {
		if(!this.members.has(_id)) throw new Error(`A member with _id in this clan "${_id}" not exists`);
		this.members.delete(_id);
		return this.#db.removeMember(_id).catch(console.error);
	}
	setName(name) {
		this.name = name;
		return this.#db.setName(name).catch(console.error);
	}
	setTag(tag) {
		this.tag = tag;
		return this.#db.setTag(tag).catch(console.error);
	}
	setBanner(banner_url) {
		this.banner_url = banner_url;
		return this.#db.setBanner(banner_url).catch(console.error);
	}
	setDescription(description) {
		this.description = description;
		return this.#db.setDescription(description).catch(console.error);
	}
	delete() {
		cache.delete(this._id);
		return this.#db.remove().catch(console.error);
	}
	toString() {
		return this.name;
	}
	static delete(_id) {
		return ClanDB.findById(_id).delete();
	}
	static create(data) {
		const dbclan = new ClanModel(data);
		
		ClanModel.exists({ _id: dbuser._id }).then(exists => {
			if(!exists) dbclan.save().catch(console.error);
		});

		return ClanDB.cache(dbclan);
	}
	static cache(dbclan) {
		if(!(dbclan instanceof ClanModel)) throw new TypeError('clan must be type the ClanModel');
		if(ClanDB.findById(dbclan._id)) throw Error(`clan with id "${dbclan._id}" already exists`);
		const clan = new ClanDB(dbclan);
		cache.set(clan._id, clan);
		return clan;
	}
	static findById(_id) {
		return cache.get(_id);
	}
}

module.exports = ClanDB;
