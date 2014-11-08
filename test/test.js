var icnf = require('../')(__dirname);

process.env['FOO'] = 'bar'; // set environment var for testing

describe('default should using production.json', function() {
	it('should equal to yarco', function() {
		icnf().name.should.equal('yarco');
	});
});

describe('development env should using development.json', function() {
	it('should equal to shunza', function() {
		icnf('development').gf.should.equal('shunza');
	});
});

describe('they should all have field host in comm/comm.json', function() {
	it('should equal 127.0.0.1', function() {
		icnf().host.should.equal('127.0.0.1');
		icnf('development').host.should.equal('127.0.0.1');
	});
});

describe('environment variable can be accessed', function() {
	it('should equal to the value of environment variable FOO', function() {
		icnf().env.should.equal('bar');
	});
});

describe('development version can not access FOO', function() {
	it('should have the original string `$FOO` because extendEnvValue is set to false', function() {
		icnf('development').env.should.equal('$FOO');
	});
});

describe('production version support multi-configs in `extend` field', function() {
	it('should have host-prod defined in comm/prod-extra.json', function() {
		icnf()['host-prod'].should.equal('this is from prod-extra');
	});
});

