// TODO: delete this file
'use strict';
const DB = require('../db').db;
const Boom = require('boom');
const _ = require('lodash');

// get user data
module.exports = (request, reply) => {
  const username = request.params.username;

  DB.get(username, (err, data) => {
    if (err) {
      console.log(err);
      return reply(Boom.serverTimeout(err));
    }
    const isConfirmed = !data.subjectPriority.isConfirmed;
    const result = _.defaultsDeep({subjectPriority: {isConfirmed}}, data);

    DB.put(username, result, err => {
      if (err) {
        console.log(err);
        return reply(Boom.serverTimeout(err));
      }
      return reply({
        message: `${username} ${isConfirmed ? 'is confirmed' : 'is released'}`
      });
    });
  });
};
