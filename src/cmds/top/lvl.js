const { MessageEmbed } = require('discord.js');
const {users} = require('../../structures/cache.js');

module.exports = (message) => {
	const embed = new MessageEmbed()
	.setTitle('Top lvl')
	.setDescription(
		users.array().sort((a, b) => b.lvl-a.lvl )
		.slice(0,10)
		.map((i, n) => `**№ ${n+1}** <@${i._id}> **${i.lvl} LVL**`)
		.join('\n\n')
	)
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());
	message.channel.send(embed);
}
