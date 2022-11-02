const { validateName, validateOwner } = require('./validate.js');

module.exports = (message, name) => {
	const clan = message.author.db.clan;

	const validOwner = validateOwner(message);
	if(!validOwner.valid) {
		message.channel.send(validOwner.error);
		return;
	}

	const validName = validateName(name);
	if(!validName.valid) {
		message.channel.send(validName.error);
		return;
	}
	
	clan.setName(name);
	message.channel.send('Название клана изменено.');
}
