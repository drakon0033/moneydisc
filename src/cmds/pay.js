const { validateMember } = require('./validate.js');
const {COIN} = require('../util/Constants.js').emoji;

module.exports.run = (client, message, [ ,n ]) => {
	const money = parseInt(n);
	
	const member = message.mentions.members.first();
	const validMember = validateMember(member);
	if(!validMember.valid) {
		message.channel.send(validMember.error);
		return;
	}
	if(!money) {
		message.channel.send(`Укажите сколько денег вы хотите перевести ${member}`);
		return;
	}
	if(money > message.author.db.money) {
		message.channel.send(`У вас недостаточно денег для перевода.`);
		return;
	}

	if(money < 1) {
		message.channel.send('Укажите положительное число.');
		return;
	}

	message.author.db.subMoney(money);
	member.user.db.addMoney(money);

	message.channel.send(`Вы успешно перевели **${money}** ${COIN}`);
}

exports.config = {
	help: {
		description: 'Передать участнику серверную валюту.',
		usage: '<@member> <money>'
	}
}
