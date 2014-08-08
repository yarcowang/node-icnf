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
	this.extendEnvValue = true;
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

		if (this.extendEnvValue) {
			function extendEnv(o) {
				if (require('util').isArray(o)) {
					for(var i = 0, len = o.length; i < len; i++) {
						o[i] = extendEnv(o[i]);
					}
				} else if (typeof o == 'object' && o !== null) {
					for(var k in o) {
						o[k] = extendEnv(o[k]);
					}
				} else if (typeof o == 'string' && o[0] == '$') { // env variable
					if (typeof process.env[o.substring(1)] != null) {
						o = process.env[o.substring(1)];
					}
				}

				return o;
			}

			config = extendEnv(config);
		}
		
		return config;
	};/*}}}*/

}).call(iCnf.prototype);

