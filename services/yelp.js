const keys = require('../config/keys');
const yelp = require('yelp-fusion');

exports.client = yelp.client(keys.yelpKey);
