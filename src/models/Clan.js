const { Schema, model } = require('mongoose')

const schema = new Schema({
	_id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	tag: {
		type: String,
		required: true
	},
	members: {
		type: [String],
		default: []
	},
	banner_url: {
		type: String,
		default: null
	},
	description: {
		type: String,
		default: null
	},
}, { versionKey: false })

schema.methods = {
	addMember(_id) {
		this.members.push(_id);
		return this.save();
	},
	removeMember(_id) {
		const index = this.members.indexOf(_id);
		if(index == -1) throw new Error(`A member with _id in this clan "${_id}" is not exists`);
		this.members.splice(index, 1);
		return this.save();
	},
	setName(name) {
		this.name = name;
		return this.save();
	},
	setTag(tag) {
		return this.save();
	},
	setBanner(banner_url) {
		this.banner_url = banner_url;
		return this.save();
	},
	setDescription(description) {
		this.description = description;
		return this.save();
	}
}

module.exports = model('Clans', schema);
