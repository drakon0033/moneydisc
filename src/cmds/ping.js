module.exports.run = function(client, message, args) {
	message.channel.send('Понг!');
}

exports.config = {
	help: {
		description: `Вспомогательная команда для разработчика.`,
		usage: ''
	}
}
