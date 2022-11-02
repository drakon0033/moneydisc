const { validateDescription, validateOwner } = require('./validate.js');

module.exports = (message, description) => {
	const clan = message.author.db.clan;

	const validOwner = validateOwner(message);
	if(!validOwner.valid) {
		message.channel.send(validOwner.error);
		return;
	}

	const validDescription = validateDescription(description);
	if(!validDescription.valid) {
		message.channel.send(validDescription.error);
		return;
	}
	
	clan.setDescription(description);
	message.channel.send('Описание клана изменено.');
}
