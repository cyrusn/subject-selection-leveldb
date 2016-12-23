'use strict';
const DB = require('../../db').db;
const Boom = require('boom');
const Async = require('async');
const _ = require('lodash');

module.exports = (request, reply) => {
  const username = request.params.username;

  Async.waterfall([
    // get user data
    (callback) => {
      DB.get(username, (err, data) => {
        if (err) return callback(Boom.serverTimeout(err));
        return callback(null, data);
      });
    },
    // update data
    (data, callback) => {
      const result = _.defaultsDeep({subjectPriority: {isConfirmed: false}}, data);
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
        message: `${username} unconfirmed`
      });
    });
};
