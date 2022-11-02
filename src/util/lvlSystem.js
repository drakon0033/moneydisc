let getIterationXp = n => (90 * n - 90) * n;

let getXp = (lvl) => {
	let xp = 0;
	while(lvl > 0) {
        xp += getIterationXp(lvl-2);
        lvl--;
	}
	return xp;
}  
function getLvl(xp) {
	let lvl = 1;
	while(xp > 0) {
		xp -= getIterationXp(lvl);
		lvl++
	}
	return lvl;
}

module.exports = { getXp, getLvl }