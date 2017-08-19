'use strict';
const DB = require('../db').db;
const Boom = require('boom');

module.exports = (request, reply) => {
  if (!request.auth.isAuthenticated) return reply(Boom.unauthorized());

  const username = request.auth.credentials.username;

  DB.get(username, (err, value) => {
    if (err) return reply(Boom.serverTimeout(err));
		delete value.info.password;
    return reply({
      key: username,
      value
    });
  });
  return;
};

