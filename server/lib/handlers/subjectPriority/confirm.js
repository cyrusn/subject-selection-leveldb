'use strict';
const DB = require('../../db').db;
const Boom = require('boom');
const Async = require('async');
const combination = require('../../../../json/combination');
const _ = require('lodash');

module.exports = (request, reply) => {
  const username = request.auth.credentials.username;

  Async.waterfall([
    // get user data
    (callback) => {
      DB.get(username, (err, value) => {
        if (err) return callback(Boom.serverTimeout(err));
        return callback(null, value);
      });
    },
    // check combos.length
    (value, callback) => {
      if (value.subjectPriority.combos.length === combination.length) return callback(null, value);
      return callback(Boom.badImplementation('data not ready'));
    },
    // update data
    (data, callback) => {
      const result = _.defaultsDeep({subjectPriority: {isConfirmed: true}}, data);
      DB.put(username, result, err => {
        if (err) return callback(Boom.serverTimeout(err));
        return callback(null);
      });
    }
  ],
    // finally
    (err) => {
      if (err) console.log(err);
      return reply(err || {
        message: `${username} confirmed`
      });
    });
};
