const { Structures, MessageEmbed, } = require('discord.js');
const UserDB = require('./structures/UserDB.js');

Structures.extend('User', U => class User extends U {
	get db() {
		const user = UserDB.findById(this.id);
		if(user) return user;
		else return UserDB.create({ _id: this.id });
	}
})

Structures.extend('TextChannel', T => class TextChannel extends T {
	send(content, options, isEval) {
		if(isEval) return super.send(content, options);
		if(content instanceof MessageEmbed) return super.send(content.setColor('#2f3136'), options);
		else return super.send(new MessageEmbed().setDescription(content).setColor('#2f3136'), options);
	}
})
