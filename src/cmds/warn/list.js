const config = require('config');
const { MessageEmbed } = require('discord.js');

module.exports = async (message, member) => {
	const embed = new MessageEmbed()
	.setTitle('Список варнов.')
	.setDescription(
		member.user.db.warns.map((db, i) => `**№${i+1}** администратором <@${db.byID}> \по причине: \`${db.reason}\``).join('\n\n')
	)
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());

	message.channel.send(embed);
}
