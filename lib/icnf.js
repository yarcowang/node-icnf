/**
 * @file icnf.js
 * core file
 *
 * @author Yarco <yarco.wang@gmail.com>
 * @since 2013/01/16
 * @copyright BSD
 */
// vim: set tabstop=2 shiftwidth=2 softtabstop=2 noexpandtab ai si: 

var path = require('path');

module.exports = function(dir) { // project root
	var root = dir;

	return function(env) {
		env = env || process.env.NODE_ENV || 'production';
		return require(path.join(root, 'etc', env + '.json')); // <PROJECT>/etc/<ENV>.json
	}
}

