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
		var self = this;

		env = env || process.env.NODE_ENV || 'production';
		var config = require(path.join(this.rootDir, 'etc', env + '.json')); 

		if (config.extend) {
			var comms = typeof config.extend === 'string' ? [config.extend] : config.extend;
			comms.forEach(function(comm) {
				var c = require(path.join(self.rootDir, 'etc', 'comm', comm + '.json'));
				for(k in c) {
					if (!config[k]) {
						config[k] = c[k];
					}
				}
			});
		}

		if (config.hasOwnProperty('extendEnvValue')) {
			this.extendEnvValue = config.extendEnvValue;
		}

		if (this.extendEnvValue) {
			function extendEnv(o) {
				if (require('util').isArray(o) || typeof o == 'object') {
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

