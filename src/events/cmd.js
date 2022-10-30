const User = require('../structures/UserDB.js');
const config = require('config');

module.exports.run = async (client, message) => {
	message.author.db.addMessage();
	if(!message.author) return;
	if(message.channel.type == 'dm') return;
	if(message.author.bot) return;
	if(!message.content.startsWith(config.prefix)) return;
	const [ command, ...args ] = (message.content.slice(config.prefix.length).match(/"[^"]+"|\S+/g) || []).map(i => i.replace(/"/g,'').trim());
	const cmd = client.getCommand(command);
	if(!cmd)return;
	if(message.author.db.mute && cmd.name != 'eval') return;
	cmd.run(client, message, args);
}

module.exports.name = 'message';
