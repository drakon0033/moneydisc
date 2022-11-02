const ms = require('ms');
const { MessageEmbed, User } = require('discord.js');
const { getXp, getLvl } = require('../util/lvlSystem.js');
const {EMPTY_BAR, COIN} = require('../util/Constants.js').emoji;

function bar(first, second, complt = '<:sssdsd:834473288327102464>', empty = EMPTY_BAR) {
  let dif = Math.round((first * 10) / second)
  return complt.repeat(dif) + empty.repeat(10-dif);
}

module.exports.run = async (client, message, args) => {
	const user = message.mentions.users.first() || message.author; 

	let spouse = await client.users.fetch(user.db.spouse?._id).catch(() => false);
	if(!(spouse instanceof User)) {
		spouse = null;
	}

	const field = (str) => '```js\n ' + str + ' \n```';
	const embed = new MessageEmbed()
	.setTitle(user.tag)
	.addField(`Баланс ${COIN}`, field(parseInt(user.db.money)), true)
	.addField('Партнёр💕', spouse ? field(spouse.tag) : field('Нет'), true)
	.addField('Прогресс опыта', bar(user.db.xp, getXp(user.db.lvl+1)) + ` \`\`  ${user.db.lvl}  \`\``)
	.addField('Сообщений✉️', field(user.db.messages), true)
	.addField('Время в войсе⏱', field(ms(user.db.voiceTime)), true)
	.addField('Клан♛', user.db.clan ? field(user.db.clan.name) : field('Нет'), true)
	.setTimestamp()
    .setThumbnail((message.mentions.users.first() || message.author).displayAvatarURL({
          dynamic: true,
          size: 1024
        }))
	message.channel.send(embed);
}

module.exports.config = {
	name: 'profile',
	aliases: ['u', 'p'],
	help: {
		description: 'Информация о профиле пользователя',
		usage: '<?@member>'
	}
}
