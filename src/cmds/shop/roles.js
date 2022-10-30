const { MessageEmbed } = require('discord.js');
const config = require('config').roles;
const {COIN} = require('../../util/Constants.js').emoji;

module.exports = async (client, message, number) => {
	
	const roles = message.guild.roles.cache.filter(role => {
		return Object.keys(config).includes(role.id) && !message.member.roles.cache.has(role.id)
	});
	
	if(number) {
		const role = roles.array()[number-1];
		if(!role) {
			message.channel.send('Пожалуйста, введите корректно номер роли.');
			return;
		}
		if(message.author.db.money < config[role.id]) {
			message.channel.send('У вас недостаточно средств для покупки данной роли.');
			return;
		}
		message.member.roles.add(role.id);
		await message.author.db.subMoney(config[role.id]);
		message.channel.send(`Вы успешно купили роль ${role}`);
		return;
	}

	
	const description = roles.array()
	.map((role, i) => `**№ ${i+1}** ${role} **${config[role.id]}** ${COIN}`)
	.join('\n').trim();

	const embed = new MessageEmbed()
	.setTitle('Магазин ролей.')
	.setDescription(description.length ? description : '**Вы купили все роли.**')
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());

	message.channel.send(embed);
}