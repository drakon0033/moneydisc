const { validateMember } = require('./validate.js');
const addModule = require('./warn/add.js'); 
const removeModule = require('./warn/remove.js');
const listModule = require('./warn/list.js') 

module.exports.run = function (client, message, [ ,route, ...args ]) {
	if(!message.member.permissions.has(4194304)) {
		message.channel.send('У вас недостаточно прав что-бы выдать варн.');
		return;
	}
	const member = message.mentions.members.first();
	const validMember = validateMember(member);
	if(!validMember.valid) {
		message.channel.send(validMember.error);
		return;
	}

	switch(route) {
		case 'add': 
			addModule(client, message, member, args[0]); 
		break;
		case 'remove': 
			removeModule(message, member, args[0]); 
		break;
		case 'list': 
			listModule(message, member); 
		break;
		default: 
			client.getCommand('help').run(client, message, [ this.name ]);
	}
}

exports.config = {
	help: {
		description: 'Команда для взаимодействия с варнами',
		usage: [
			'<@member> add <?"reason"> `Добавляет пользователю одно предупреждение.`',
			'<@member> remove <number> `Убирает предупреждение у пользователя`',
			'<@member> list `Список предупреждений пользователя.`'
		]
	}
}
