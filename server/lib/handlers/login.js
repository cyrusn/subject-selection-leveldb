'use strict';
const DB = require('../db').db;
const Bcrypt = require('bcrypt');
const Boom = require('boom');
const Async = require('async');

module.exports = (request, reply) => {
  // request.cookieAuth.clear();
  Async.waterfall([
    // getUserData
    (callback) => {
      DB.get(request.payload.username, (err, value) => {
        if (err) {
          console.log(err);
          return callback(Boom.serverTimeout(err));
        }

        return callback(null, request.payload, value);
      });
    },
    // checkPassword
    (payload, value, callback) => {
// console.log(value)
						Bcrypt.compare(payload.password, value.info.password, (err, isValid) => {
        if (err || !isValid) {
          return callback(Boom.unauthorized('Invalid username or password'));
        }

        // leesei: why `scope` returned here will be checked?
        // hapi framework should only check `request.auth.credentials`
        // why are you not using validateFunc() in strategy?
        // cyrusn: cos I will set the cookie once i am logged in.
        // therefore set the scope here. also for this route
        // I set the config.auth to false, so the validateFunc should not work here.
        // please advise
        // leesei:
        // 1. I think `hapi-cookie-auth` is responsible for passing scope here
        // to `request.auth.credentials`, need to verify that
        // 2. my question is why `validateFunc()` in not needed in general
        // is that because we have a `login/` that acts as `validateFunc()` that
        // caches the result?

        // leesei: who is using the `key` field?
        // cyrusn: leveldb, just want to keep coherence
        // leesei: then maybe
        // - we should only add this in the module that interacts with leveldb
        // - teach leveldb to use `username` as key

        const username = payload.username;
        const isAdmin = value.info.isAdmin;
        const scope = isAdmin ? 'admin' : 'student';
        return callback(null, username, isAdmin, scope);
      });
    }
  ],
    // finally
    (err, username, isAdmin, scope) => {
      request.cookieAuth.set({
        username,
        isAdmin,
        scope
      });
      if (err) console.log(err);
      return reply(err || {
        message: `${username} logged in.`
      });
    }
  );
};
