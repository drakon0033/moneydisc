const price = require('config').price.marry;
const emojiChoiser = require('../../util/emojiChoiser.js');
const {COIN} = require('../../util/Constants.js').emoji;
const { validateMember } = require('../validate.js');



module.exports = async(message) => {
	const member = message.mentions.members.first();

	const validMember = validateMember(member);
	if(!validMember.valid) {
		message.channel.send(validMember.error);
		return;
	}

	if(message.author.db.money < price) {
		message.channel.send(`У вас недостаточно средств. Необходимо ${price} ${COIN} для вступления в брак.`);;
		return;
	}

	if(member.id === message.author.id) {
		message.channel.send('Вы не можете обручиться с самим собой.');
		return;
	}

	if(member.user.bot) {
		message.channel.send('Вы не можете обручиться с ботом.');
		return;
	}

	if(member.user.db.spouse) {
		message.channel.send(`${member} уже в браке с <@${member.user.db.spouse._id}>`);
		return;
	}
	if(message.author.db.spouse) {
		message.channel.send(`Вы уже в браке с <@${message.author.db.spouse._id}>`);
		return;
	}

	const msg = await message.channel.send(`${member}, хотите ли вы обручиться с ${message.member} ?`);
	const choiser = await emojiChoiser(msg, member.id, { time: 6e4 });

	choiser.on('accept', () => {
		member.user.db.setSpouse(message.author.id);
		message.author.db.setSpouse(member.id);
		msg.edit(`${member} и ${message.member} вступили в брак.`);
		message.channel.send(`${message.member} -${price} ${COIN}`);
		message.author.db.subMoney(1000);
	})

	choiser.on('reject', () => {
		msg.edit(`Предложение было отклонено.`);
	})

}
