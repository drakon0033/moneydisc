const { validateOwner } = require('./validate.js');

module.exports = async (message) => {
	const clan = message.author.db.clan;

	const validOwner = validateOwner(message);
	if(!validOwner.valid) {
		message.channel.send(validOwner.error);
		return;
	}
	const members = await message.guild.members.fetch({ user: clan.members.map(i => i._id) });
	members.each(member => member.manageable && member.setNickname(null));
	await clan.members.each(member => member.leaveClan());
	await clan.delete();
	message.channel.send('Клан распущен.');	
}
