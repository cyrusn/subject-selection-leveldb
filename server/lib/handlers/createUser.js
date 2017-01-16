'use strict';
const DB = require('../db').db;
const Boom = require('boom');
const Async = require('async');
const importUser = require('../../utils/importUser');

// create user
module.exports = (request, reply) => {
  Async.waterfall([
    // check existence of user
    (callback) => {
      DB.get(request.payload.username, err => {
        if (err) {
          if (err.notFound) return callback(null, request.payload);
          console.log(err);
          return callback(Boom.serverTimeout(err));
        }
        return callback(Boom.conflict('Students exist!'));
      });
    }
  ],
    // finally
    (err, user) => {
      if (err) {
        console.log(err);
        return reply(err);
      }

      importUser(user, false, (err, result) => {
        if (err) return reply(Boom.serverTimeout(err));
        reply(result);
      });
    });
};
