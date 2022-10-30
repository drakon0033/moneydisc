const UserDB = require('../structures/UserDB.js');
const UserModel = require('../models/User.js');


async function databaseCaching() {
	const dbusers = await UserModel.find({});
	for(dbuser of dbusers) if(!UserDB.findById(dbuser._id)) UserDB.cache(dbuser);

}

module.exports = databaseCaching;
