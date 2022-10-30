module.exports = function(client) {
	
	const voiceAccum = new Map();

	client.on('voiceJoin', (oldState, newState) => {
		voiceAccum.set(newState.member.id, Date.now());
	})
	
	client.on('voiceLeave', (oldState, newState) => {
		const time = voiceAccum.get(newState.member.id);
		if(!time)return;
		newState.member.user.db.addVoiceTime(Date.now() - time);
	})
}
