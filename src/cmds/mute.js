const { validateMember } = require('./validate.js');
const ms = require('ms');
const MS_PATTERN = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i

module.exports.run = async (client, message, [ , time ]) => {
	if(!message.member.permissions.has(4194304)) {
		message.channel.send('[warn] perm 4194304');
		return;
	}
	const member = message.mentions.members.first();
	const validMember = validateMember(member);
	if(!validMember.valid) {
		message.channel.send(validMember.error);
		return;
	}

	if(!MS_PATTERN.test(time)) {
		message.channel.send('Вы неправильно указали время. Используйте подобную запись "10seconds, 10s, 10minutes, 10m"');
		return;
	}

	await member.user.db.setMute(Date.now() + ms(time));
	message.channel.send(`${member} был замьючен на ${time}.`);
}

exports.config = {
	help: {
		description: 'Забирает возможность писать в чат.',
		usage: '<@member> <time> `time - [ 10s - 10seconds | 10m - 10minutes ]`'
	}
}
