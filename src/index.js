const {Client, Collection} = require('discord.js');
const config = require('config');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const generateURI = require('./util/generateURI.js');
const databaseCaching = require('./util/databaseCaching.js');
const voiceLevelModule = require('./modules/voiceLevel.js');
require('./extensions.js');

const client = new Client();

/**
 * @typedef {Object} Command
 * @property {Function} run
 * @property {string} name
 * @property {string[]} aliases
 * @property {Object} help
 * @property {string} help.description
 * @property {string[]|string} help.usage
 */

/** @type {Map<string, Command>} */
client.commands = new Collection();

/**
 * @param  {string} command
 * @return {Command|undefined}
 */
client.getCommand = function getCommand(command){
	return client.commands.get(command) || client.commands.find(i => i.aliases.includes(command));
}

const commands = fs.readdirSync('./src/cmds/');

for(const command of commands) {
	const filePath = path.join(__dirname, 'cmds', command);
	if(fs.lstatSync(filePath).isDirectory()) continue;
	const { config = {}, run } = require(filePath);
	if(!run) continue;

	/** @type {Command} */
	const cmd = {
		run: run,
		name: (config.name || path.basename(filePath, '.js')).toLowerCase(),
		aliases: config.aliases instanceof Array ? config.aliases : typeof config.aliases == 'string' ? [config.aliases] : [],
		help: {
			description: config.help?.description,
			usage: config.help?.usage
		},
		toString() {
			return this.name;
		}
	}

	client.commands.set(cmd.name, cmd);
}

const events = fs.readdirSync('./src/events/');

for(const event of events) {
	const filePath = path.join(__dirname, 'events', event);
	if(fs.lstatSync(filePath).isDirectory()) continue;

	const props = require(filePath);
	client.on(props.name, props.run.bind(null, client));
}

voiceLevelModule(client);

mongoose.connect(generateURI(config.mongo), {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(async _ => {
	await databaseCaching();
	console.log('mongo connected!');
	client.login(process.env.DISCORD_TOKEN);
})
