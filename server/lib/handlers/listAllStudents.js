'use strict';
const DB = require('../db').db;
const _ = require('lodash');
const Boom = require('boom');

module.exports = (request, reply) => {
  let result = [];
  DB.createReadStream()
    .on('data', data => {
      // exclude admins from list
      if (data.value.info.isAdmin) return;

      const seed = {
        info: {
          username: data.key
        }
      };
      delete data.value.info.password;
      result.push(
        _(seed)
          .defaultsDeep(data.value)
          .omit('password')
          .value()
      );
    })
    .on('error', (err) => {
      if (err) {
        console.log(err);
        return reply(Boom.serverTimeout(err));
      }
    })
    .on('end', () => {
      reply(_.sortBy(result, 'classNo'));
    });
};
