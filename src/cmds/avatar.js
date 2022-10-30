const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first() || message.member;
	const url = member.user.avatarURL({ format: 'png', dynamic: true, size: 2048 });
	const embed = new MessageEmbed()
	.setURL(url)
	.setTitle(member.user.tag)
	.setImage(url)
	.setTimestamp();
	message.channel.send(embed);
}

exports.config = {
	help: {
		description: 'Получить аватарку пользователя.',
		usage: '<?@member>'
	}
}
