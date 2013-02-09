var icnf = require('../')(__dirname);

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

describe('they should also have field host', function() {
	it('should equal 127.0.0.1', function() {
		icnf().host.should.equal('127.0.0.1');
		icnf('development').host.should.equal('127.0.0.1');
	});
});

