'use strict';
const isServeHTML = require('../../config').isServeHTML;

module.exports = (request, reply) => {
  request.cookieAuth.clear();
  console.log();
  if (isServeHTML) return reply.redirect('/');
  return reply({
    message: 'user logout'
  });
};
