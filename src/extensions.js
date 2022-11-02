const { Structures, MessageEmbed, GuildMember } = require('discord.js');
const UserDB = require('./structures/UserDB.js');
const taggabling = require('./util/taggabling.js');

Structures.extend('User', U => class User extends U {
	get db() {
		const user = UserDB.findById(this.id);
		if(user) return user;
		else return UserDB.create({ _id: this.id });
	}
})

Structures.extend('GuildMember', GM => class GuildMember extends GM {
	taggabling() {
		if(!this.user.db.clan) return;
		if(!this.manageable) return; 
		const tag = this.user.db.clan.tag;
		const nickname = taggabling(this.displayName.slice(0, 32-(tag.length+2)), tag);
		if(this.displayName === nickname) return;
		this.setNickname(nickname).catch(console.error);
	}
})

Structures.extend('TextChannel', T => class TextChannel extends T {
	send(content, options, isEval) {
		if(isEval) return super.send(content, options);
		if(content instanceof MessageEmbed) return super.send(content.setColor('#2f3136'), options);
		else return super.send(new MessageEmbed().setDescription(content).setColor('#2f3136'), options);
	}
})
