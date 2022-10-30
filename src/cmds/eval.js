const Discord = require("discord.js");
const { prefix } = require('config');
const util = require('util');

const clean = text => typeof text === 'string' ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)) : text;

module.exports.run = async function(client, message, args) { 
  if (!['779826024585101342', '273493998956576778', '962746977513254913'].includes(message.author.id)) return;
  try {
    const code = message.content.slice(`${prefix}${this.name}`.length);
    let evaled = eval(code);
    if(evaled instanceof Promise) evaled = await evaled;
    if(evaled === undefined) evaled = 'undefined';
    const res = util.inspect(evaled, { depth: 1 }).toString();

    message.channel.send(
      `Type: ${util.inspect(evaled.constructor).slice(11,-1)} \n` +
      `Result: ${res}`
    , { code: "js", split: true, eval: true }, true);
  } catch (err) {
    message.channel.send(clean(err), { code: 'js' }, true);
  }
};

