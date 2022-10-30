module.exports = async (message) => {
	if(!message.author.db.spouse) {
		message.channel.send(`Вы не в браке.`);
		return;
	};
	await message.author.db.spouse.divorce();
	await message.author.db.divorce();

	message.channel.send('Вы развелись, поздравляю 🎉');
}