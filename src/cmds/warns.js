module.exports.run = (client, message, args) => {
	return client.getCommand('_warn').run(client, message, [ , 'list' ]);
}

exports.config = {
	help: {
		description: 'Список варнов пользователя',
		usage: '<@member>'
	}
}
