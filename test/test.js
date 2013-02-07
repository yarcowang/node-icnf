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

describe('test env should using test.json', function() {
	it('should equal to shunza when test', function() {
		icnf('test').gf.should.equal('shunza');
	});
});

