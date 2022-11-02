const { validateMember } = require('./validate.js');

module.exports.run = async (client, message) => {
	if(!message.member.permissions.has(4194304)) {
		message.channel.send('[warn] perm 4194304');
		return;
	}
	const member = message.mentions.members.first();
	const validMember = validateMember(member);
	if(!validMember.valid) {
		message.channel.send(validMember.error);
		return;
	}

	await member.user.db.setMute(null);
	message.channel.send(`${member} теперь может писать.`);
}

exports.config = {
	help: {
		description: 'Возвращает возможность писать в чат',
		usage: '<@member>'
	}
}
