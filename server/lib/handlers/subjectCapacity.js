'use strict';
const Fs = require('fs');
const Aysnc = require('async');

const path = require('../../utils/constant').subjectCapacityFilePath;

module.exports = (request, reply) => {
  Aysnc.waterfall([
    //  check for post method
    (callback) => {
      if (request.method === 'post') {
        const subjectCapacity = request.payload;
        Fs.writeFile(path, JSON.stringify(subjectCapacity), 'utf8', callback);
      }
      callback(null);
    },
    // check if subjectCapacity.json exist
    (callback) => {
      Fs.access(path, Fs.R_OK, callback);
    },
    // read subjectCapacity.json file
    (callback) => {
      Fs.readFile(path, 'utf8', callback);
    }
  ],
  (err, subjectCapacity) => {
    reply(err || JSON.parse(subjectCapacity));
  });
};
