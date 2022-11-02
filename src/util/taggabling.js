const {GuildMember} = require('discord.js');
const { TAG_MAX } = require('./Constants').clan;

function hasTag(str) {
	return /^(\[\w{1,4}\])/.test(str);
}

/**
 * @param {string} nickname - the display name of the member
 * @param {string} tag - the clan tag
 * @return {}
 */
function taggabling(str, tag) {

	// if already has the tag, we skip it
	const nickname = !hasTag(str) ? str : str.slice(str.indexOf(']')+2);
	return `[${tag}] ${nickname}`;
}

module.exports = taggabling;
