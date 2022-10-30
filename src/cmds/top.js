const moneyModule = require('./top/money.js');
const voiceModule = require('./top/voice.js');
const messagesModule = require('./top/chat.js');


module.exports.run = function(client, message, [ route ]) {
	switch(route) {
		case 'money': 
			moneyModule(message); 
		break;
		case 'voice': 
			voiceModule(message); 
		break;
		case 'chat': 
			messagesModule(message); 
		break;
		default: 
			client.getCommand('help').run(client, message, [ this.name ]);
	}
}

exports.config = {
	help: {
		description: "Топ участников сервера.",
		usage: [
			'money     `Топ пользователей по валюте.`',
			'voice     `Топ пользователей по времени в голосовых каналах.`',
			'chat  `Топ пользователей по сообщениям.`',
		]
	}
}