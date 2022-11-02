module.exports.run = (client, message, args) => {
	return client.getCommand('_warn').run(client, message, [ , 'add', ...args.slice(1) ]);
}

exports.config = {
	help: {
		description: 'Выдать варн пользователю.',
		usage: '<@member> <?"reason">'
	}
}
