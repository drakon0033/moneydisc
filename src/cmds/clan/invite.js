const emojiChoiser = require('../../util/emojiChoiser.js');
const { validateDescription, validateOwner } = require('./validate.js');
const { validateMember } = require('../validate.js');
const taggabling = require('../../util/taggabling.js');

module.exports = async (message) => {
	const clan = message.author.db.clan;
	const member = message.mentions.members.first();

	const validOwner = validateOwner(message);
	if(!validOwner.valid) {
		message.channel.send(validOwner.error);
		return;
	}

	const validMember = validateMember(member);
	if(!validMember.valid) {
		message.channel.send(validMember.error);
		return;
	}

	if(member.user.db.clan) {
		message.channel.send(`${member} уже находится в клане.`);
		return;
	}

	const msg = await message.channel.send(`${member} вы были приглашены в клан "${clan}". Принять приглашение?`);
	const choiser = await emojiChoiser(msg, member.id, { time: 6e4 });
	choiser.on('accept', () => {
		member.user.db.setClan(clan._id);
		clan.addMember(member.id);
		member.taggabling()
		msg.edit(`${member} принял приглашение в клан.`);

	})

	choiser.on('reject', () => {
		msg.edit(`${member} отклонил приглашение в клан.`);
	})
}
