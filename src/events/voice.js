module.exports.run = (client, oldState, newState) => {
	if(!oldState.channel && newState.channel) client.emit('voiceJoin', oldState, newState);
	if(oldState.channel && !newState.channel) client.emit('voiceLeave', oldState, newState);
}

module.exports.name = 'voiceStateUpdate';
