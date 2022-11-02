const price = require('config').price.clan;
const createModule = require('./clan/create.js'); 
const infoModule = require('./clan/info.js');
const tagModule = require('./clan/tag.js');
const leaveModule = require('./clan/leave.js');
const nameModule = require('./clan/name.js');
const disbandModule = require('./clan/disband.js');
const bannerModule = require('./clan/banner.js');
const descriptionModule = require('./clan/description.js');
const inviteModule = require('./clan/invite.js');

module.exports.run = (client, message, [ route, ...args ]) => {

	switch(route) {
		case 'info': 
			infoModule(message); 
			break;
		case 'create': 
			createModule(message, args); 
			break;
		case 'invite': 
			inviteModule(message); 
			break;
		case 'tag': 
			tagModule(message, args[0]); 
			break;
		case 'description': 
			descriptionModule(message, args[0]); 
			break;
		case 'name': 
			nameModule(message, args[0]); 
			break;
		case 'banner': 
			bannerModule(message); 
			break;
		case 'leave': 
			leaveModule(message); 
			break;
		case 'disband': 
			disbandModule(message); 
			break;
		default: 
			client.getCommand('help').run(client, message, [ 'clan' ]);
	}
}

exports.config = {
	help: {
		description: 'Взаимодействеие с кланами.',
		usage: [
			'info                  `Информация о клане в котором вы состоите.`',
			`create <name> <tag>   \`Создать клан. (требуется ${price})\``,
			'name <name>           `Изменить название клана.`',
			'invite <@member>      `Пригласить участника в клан.`',
			'tag <tag>             `Установить тег клана. Максимум 3 символа.`',
			'description <"desc">  `Установить описание клана`',
			'banner                `Установить банер клана (прикрепите файл к сообщению)`',
			'leave                 `Покинуть клан.`',
			'disband               `Расформировать клан.`'
		]
	}
}
