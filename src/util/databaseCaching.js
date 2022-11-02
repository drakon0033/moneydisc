const UserDB = require('../structures/UserDB.js');
const UserModel = require('../models/User.js');

const ClanDB = require('../structures/ClanDB.js');
const ClanModel = require('../models/Clan.js');

async function databaseCaching() {
	const dbusers = await UserModel.find({});
	for(dbuser of dbusers) if(!UserDB.findById(dbuser._id)) UserDB.cache(dbuser);

	const dbclans = await ClanModel.find({});
	for(dbclan of dbclans) if(!ClanDB.findById(dbclan._id)) ClanDB.cache(dbclan);
}

module.exports = databaseCaching;
