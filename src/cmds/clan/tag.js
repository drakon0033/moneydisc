const { validateTag, validateOwner } = require('./validate.js');
const taggabling = require('../../util/taggabling.js');

module.exports = (message, tag) => {
	const clan = message.author.db.clan;

	const validOwner = validateOwner(message);
	if(!validOwner.valid) {
		message.channel.send(validOwner.error);
		return;
	}
	
	const validTag = validateTag(tag);
	if(!validTag.valid) {
		message.channel.send(validTag.error);
		return;
	}
	clan.setTag(tag);
	message.guild.members.cache.filter(i => clan.members.has(i.id)).each(member => {
		member.taggabling()
	});
	message.channel.send('Тег клана изменён.');
}
