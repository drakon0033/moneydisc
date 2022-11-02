const { validateOwner } = require('./validate.js');

module.exports = (message) => {
	const clan = message.author.db.clan;

	const validOwner = validateOwner(message);
	if(!validOwner.valid) {
		message.channel.send(validOwner.error);
		return;
	}

	const banner = message.attachments.first()?.url;
	if(!banner) {
		message.channel.send('Вы не прикрипили изображение к этому сообщению.');
		return;
	}
	clan.setBanner(banner);
	message.channel.send('Банер изменён.');
}
