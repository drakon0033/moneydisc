const { validateMember } = require('./validate.js');

module.exports.run = async (client, message, args) => {
	if(!message.member.permissions.has(4)) {
		message.channel.send('У вас должно быть разрешение банить участников.');
		return;
	}
	const member = message.mentions.members.first();
	const validMember = validateMember(member);
	if(!validMember.valid) {
		message.channel.send(validMember.error);
		return;
	}
	if(!member.bannable) {
		message.channel.send("Я не могу забанить этого пользователя.");
		return;
	}
	await member.ban().catch(err => message.channel.send(err));
	message.channel.send(`${member} был забанен.`);
}

exports.config = {
	help: {
		description: 'Команда для модерирования. Банит упомянутого участника',
		usage: '<@member>'
	}
}
