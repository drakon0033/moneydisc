const { MessageEmbed } = require('discord.js');
const {users} = require('../../structures/cache.js');
const {COIN} = require('../../util/Constants.js').emoji;


module.exports = (message) => {
	const embed = new MessageEmbed()
	.setTitle('Топ Богатых')
	.setDescription(
		users.array().sort((a, b) => b.money-a.money )
		.slice(0,10)
		.map((db, i) => `**💰№ ${i+1}** <@${db._id}> ${parseInt(db.money)} ${COIN}`)
		.join('\n')
	)
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());
	message.channel.send(embed);
}
