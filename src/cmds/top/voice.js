const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const {users} = require('../../structures/cache.js');

module.exports = (message) => {
	const embed = new MessageEmbed()
	.setTitle('Топ Войс Онлайна')
	.setDescription(
		users.array().sort((a, b) => b.voiceTime-a.voiceTime )
		.slice(0,10)
		.map((i, n) => `**🔉№ ${n+1}** <@${i._id}> ${ms(i.voiceTime)}`)
		.join('\n\n')
	)
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());
	message.channel.send(embed);
}
