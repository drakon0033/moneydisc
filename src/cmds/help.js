const { MessageEmbed } = require('discord.js');
const config = require('config');

module.exports.run = (client, message, [command]) => {
	const cmd = client.getCommand(command);
	const getEmbed = () => new MessageEmbed()
	.setTitle('Help')
	.setTimestamp()
	.setFooter(message.author.username, message.author.displayAvatarURL());

	if(!cmd) {
		const embed = getEmbed()
		.setDescription(`Для более подробной информации об конкретной команде, используйте\n` +
		`\`${config.prefix}help {command name}\`\n\n` +
		`Для понимания семантики help'а используйте\n` +
		`\`${config.prefix}help help\``)
		.addField('Список команд', client.commands.array().filter(i => !i.name.startsWith('_')).join(', '))
		message.channel.send(embed);
		return;
	}else {
		function getUsage(usage) {
			const pref = `**${config.prefix}${cmd.name}** `;
			return usage instanceof Array ? usage.map(i => pref+i).join('\n') : pref + usage;
		}
		const embed = getEmbed()
		.addField('Использование', getUsage(cmd.help.usage))
		.setDescription(cmd.help.description)
		message.channel.send(embed);
	}
}

exports.config = {
	help: {
		description: 'Кастом аргумент - `<argument>`\n' +
		'Необязательным аргумент - `<?argument>`\n' +
		'Предпочтительно пишется в ковычках - `<"argument one">`\n' +
		'Упоминание - `<&role>` / `<@member>` / `<#channel>`\n' +
		'Так же могут совмещаться `<?"argument one">`',
		usage: '<command>'
	}
}
