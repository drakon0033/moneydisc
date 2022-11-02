const config = require('config');

module.exports = async (client, message, member, reason) => {

	await member.user.db.addWarn(message.author.id, reason || 'причина не указана');
	
	if(member.user.db.warns.length >= 7) {
		await member.user.db.clearWarns();
		client.getCommand('mute').run(client, message, [ member.toString(), '7d' ]);
	}

	message.channel.send(`${member} было выдано предупреждение администратором ${message.member}` + (reason ? `\n**за:** \`${reason}\`` : ''));
}
