/*
	Я красно извиняюсь, но в другом случае мне пришлось бы переписывать 20% кода из за цикла зависимостей.
	А время тИк... ~ тАк...
*/


const {Collection} = require('discord.js');

module.exports = {
	users: new Collection(),
	clans: new Collection()
}
