const Levelup = require('levelup');
const Path = require('path');
const dbName = require('../config.json').dbName;

const location = Path.resolve(__dirname, '../../db', dbName);

console.log('DB Name: ', dbName);
var db = Levelup(location, {
  valueEncoding: 'json'
});

module.exports = {db, location};
