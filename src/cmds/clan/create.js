const price = require('config').price.clan;
const ClanDB = require('../../structures/ClanDB.js');
const { validateName, validateTag } = require('./validate.js');
const {COIN} = require('../../util/Constants.js').emoji;

module.exports = async (message, [ name, tag ]) => {
	const validName = validateName(name);
	if(!validName.valid) {
		message.channel.send(validName.error);
		return;
	}

	const validTag = validateTag(tag);
	if(!validTag.valid) {
		message.channel.send(validTag.error);
		return;
	}

	if(message.author.db.clan) {
		message.channel.send('Вы уже находитесь в клане.');
		return;
	}

	if(message.author.db.money < price) {
		message.channel.send(`У вас недостаточно средств. Необходимо ${price} ${COIN} для создания клана.`);;
		return;
	}

	const clan = ClanDB.create({ _id: message.author.id, tag, name, members: [message.author.id] });
	await message.author.db.setClan(clan._id);
	message.member.taggabling();

	message.channel.send('Клан успешно создан.');
	await message.author.db.subMoney(price);
	message.channel.send(`${message.member} -${price} ${COIN}`);
}
 