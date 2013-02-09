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

module.exports = function(dir) {
	var cnf = new iCnf;
	cnf.rootDir = dir;
	return function(env) {
		return cnf.require(env);
	}
};

/**
 * @class iCnf
 */
function iCnf()
{
	this.rootDir = '';
}

(function() {

	/** require something {{{
	 */
	this.require = function(env) {
		env = env || process.env.NODE_ENV || 'production';
		var config = require(path.join(this.rootDir, 'etc', env + '.json')); 
		if (config.extend) {
			var comm = require(path.join(this.rootDir, 'etc', 'comm', config.extend + '.json'));
			for(var k in comm) {
				if (!config[k]) {
					config[k] = comm[k];
				}
			}
		}
		return config;
	};/*}}}*/

}).call(iCnf.prototype);

