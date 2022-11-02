const ms = require('ms');
const spams = new Map();

module.exports.run = async (client, message) => {
	if(message.author.db.mute > Date.now()) {
		message.delete();
		let n = spams.get(message.author.id) || 0;
		spams.set(message.author.id, n+1);

		// each 5th time
		if(!(n % 5)) message.author.send('> До конца мута усталось ' + ms(message.author.db.mute- Date.now())).catch(_ => false);
	} else if(message.author.db.mute) message.author.db.setMute(null);
}

module.exports.name = 'message';
