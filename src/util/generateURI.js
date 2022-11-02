const {format} = require('url');

/**
 * for simple generate a mongo uri 
 * @param  {Object} options 
 * @param  {string} options.username - your username 
 * @param  {string} options.password - your password
 * @param  {string} options.name     - db name
 * @return {string}                  - valid mongo uri
 */
function generateURI({ username = '', password = '', name = '' }) {
	return format({
		protocol: "mongodb+srv",
		slashes: true,
		auth: `${username}:${password}`,
		host: 'cluster0.tllgdyj.mongodb.net',
		pathname: name,
		query: { retryWrites: true, w: 'majority' }
	})
}

module.exports = generateURI;
