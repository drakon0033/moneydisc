const { MessageEmbed } = require('discord.js');
const {users} = require('../../structures/cache.js');

module.exports = (message) => {
	const embed = new MessageEmbed()
	.setTitle('Top messages')
	.setDescription(
		users.array().sort((a, b) => b.messages-a.messages )
		.slice(0,10)
		.map((i, n) => `**№ ${n+1}** <@${i._id}> ${parseInt(i.messages)}`)
		.join('\n\n')
	)
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());
	message.channel.send(embed);
}
