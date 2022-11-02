const { MessageEmbed } = require('discord.js');
const { validateClan } = require('./validate.js');

module.exports = (message) => {
	const clan = message.author.db.clan;

	const validClan = validateClan(message);
	if(!validClan.valid) {
		message.channel.send(validClan.error);
		return;
	}
	
	const field = (str) => '```js\n' + str + '\n```';

	const embed = new MessageEmbed()
	.setTitle(clan.name)
	.addField('Тег клана', field(`[${clan.tag}]`), true)
	.addField('Участников', field(clan.members.size), true)
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());
	if(clan.description) embed.setDescription(clan.description);
	else embed.addField('Описание', field('отсутствует'))
	if(clan.banner_url) embed.setImage(clan.banner_url);
	else embed.addField('Баннер', field('отсутствует'));
	message.channel.send(embed);
}
