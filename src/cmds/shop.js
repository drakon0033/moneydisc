const rolesModule = require('./shop/roles.js');


module.exports.run = function (client, message, [ route, n ]) {
	switch(route) {
		case 'roles': 
			rolesModule(client, message, parseInt(n)); 
		break;
		default: 
			client.getCommand('help').run(client, message, [ this.name ]);
	}
}

exports.config = {
	help: {
		description: "Магазин где вы можете преобрести возможности за игровую валюту.",
		usage: [
			'roles           `Список ролей в магазине.`',
			'roles <number>  `Купить роль в магазине.`'
		]
	}
}