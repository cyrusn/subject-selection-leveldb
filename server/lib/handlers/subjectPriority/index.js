'use strict';
const DB = require('../../db').db;
const Boom = require('boom');
const Async = require('async');
const _ = require('lodash');

module.exports = (request, reply) => {
  const username = request.auth.credentials.username;

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
      if (request.method === 'get') return callback(null, data.subjectPriority);

      const result = _.defaults({subjectPriority: request.payload}, data);
      DB.put(username, result, err => {
        if (err) return callback(Boom.serverTimeout(err));
        return callback(null, result.subjectPriority);
      });
    }
  ],
    // finally
    (err, result) => {
      if (err) console.log(err);
      return reply(err || result);
    });
};
