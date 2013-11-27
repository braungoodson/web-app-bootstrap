var assert = require('assert');
var descriptions = [];
var descriptors = [];
descriptions[0] = 'deathcartoons';
descriptors[0] = function () {
	it('runs',function(done){
		var deathcartoons = require('./index.js');
		assert(deathcartoons != null);
		done();
	});
}
describe(descriptions[0],descriptors[0]);
