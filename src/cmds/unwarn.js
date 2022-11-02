module.exports.run = (client, message, [ ,n ]) => {
	return client.getCommand('_warn').run(client, message, [ , 'remove', [ n ] ]);
}

exports.config = {
	help: {
		description: 'Убрать варн пользователю.',
		usage: '<@member> <number>'
	}
}
