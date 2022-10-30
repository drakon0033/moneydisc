const { Message } = require('discord.js');
const EventEmitter = require('events');


async function emojiChoiser(message, userId, { emojis = { accept: '<:yes_emj_png:834813792327172126>', reject: '<:no_emj_png:834813848753930273>' }, ...options }) {


	if(!(message instanceof Message)) throw new TypeError('message must be type the Discord.Message');

	const emitter = new EventEmitter();

	for(const emoji of Object.values(emojis)) await message.react(emoji);
	message.awaitReactions((reaction, user) => {
		return Object.values(emojis).includes(reaction.emoji.toString()) && user.id === userId  
	}, { ...options, maxUsers: 1 })
	.then(collected => {
		const emoji = collected.first()?.emoji;
		if(!emoji)return;
		if(emoji.toString() === emojis.accept) emitter.emit('accept');
		if(emoji.toString() === emojis.reject) emitter.emit('reject');
		message.reactions.removeAll();
	})

	return emitter;
}

module.exports = emojiChoiser;
