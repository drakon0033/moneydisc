const config = require('config');

module.exports = async (message, member, n) => {
	if(+n != n) {
		message.channel.send('Неверный номер варна.');
		return;
	}
	await member.user.db.removeWarn(n-1);
	message.channel.send('Варн был снят.');
}
