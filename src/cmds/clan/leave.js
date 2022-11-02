const { validateClan, validateOwner } = require('./validate.js');

module.exports = (message) => {
	const clan = message.author.db.clan;

	const validClan = validateClan(message);
	if(!validClan.valid) {
		message.channel.send(validClan.error);
		return;
	}

	const validOwner = validateOwner(message);
	if(validOwner.valid) {
		message.channel.send('Вы не можете покинуть собственный клан.');
		return;
	}

	clan.removeMember(message.author.id);
	message.author.db.leaveClan();
	if(message.member.manageable) message.member.setNickname(null);
	message.channel.send(`Вы покинули клан "${clan}"`);
}
