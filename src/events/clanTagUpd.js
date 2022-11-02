module.exports.run = (client, oldMember, member) => {
	const clan = member.user.db.clan;
	if(!clan) return;
	if(oldMember.displayName === member.displayName) return;
	if(!member.manageable) return;

	member.taggabling();
}

module.exports.name = 'guildMemberUpdate';
