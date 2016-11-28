var MODULE_REQUIRE
	/* built-in */
	, assert = require('assert')

	/* NPM */

	/* in-package */
	, dev = require('../index')
	;

describe('Return on DEV mode: dev( { mode: value, ... }, default )', function() {
	it('Under Dev mode A', function() {
		assert.equal(1, dev({ 'A': 1 }));
	});

	it('Under Dev mode B', function() {
		assert.equal(1, dev({ 'B': 1 }));
	});

	it('Not under Dev mode C', function() {
		assert.equal(0, dev({ 'C': 1 }, 0));
	});

	it('Dev mode A prior to B', function() {
		assert.equal(2, dev({ 'B': 1, 'A': 2 }));
	});
});

describe('Do something on DEV mode: dev( { mode: dev.action(fn) } )', function() {
	it('Run under Dev mode A', function() {
		var what;
		dev({
			'A': dev.action(function() { what = 'a'; })
		});
		assert.equal('a', what);
	});
});

describe('Do something immediately: dev.run()', function() {
	it('Run immediately under Dev mode A', function(done) {
		dev.run('A', done);
	});

	it('Run immediately under Dev mode', function(done) {
		dev.run(done);
	});
});

describe('Simple API', function() {
	it('Return value under mode, (mode, value)', function() {
		assert.equal(1, dev('A', 1));
	});

	it('Return value under one of modes, (modes, value)', function() {
		assert.equal(1, dev('A,C', 1));
	});

	it('TRUE under mode, (mode)', function() {
		assert.strictEqual(true, dev('A'));
	});

	it('FALSE out of mode, (mode)', function() {
		assert.strictEqual(false, dev('C'));
	});

	it('TRUE under any mode, ()', function() {
		assert.strictEqual(true, dev());
	});

	it('(mode, value, default)', function() {
		assert.equal(-1, dev('C', 1, -1));
	});
});
