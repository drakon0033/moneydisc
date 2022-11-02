const price = require('config').price.marry;
const sendModule = require('./marry/send.js');
const divorceModule = require('./marry/divorce.js');

module.exports.run = function(client, message, [ route ]) {
	switch(route) {
		case 'send': 
			sendModule(message); 
		break;
		case 'divorce': 
			divorceModule(message); 
		break;
		default: 
			client.getCommand('help').run(client, message, [ this.name ]);
	}
}

exports.config = {
	help: {
		description: 'Обручиться с участником сервера.',
		usage: [
			`send <@member> \`Отправить запрос на брак. Требуется ${price} валюты.\``,
			'divorce `Расторгнуть брак. (Деньги вам не вернут)`'
		]
	}
}