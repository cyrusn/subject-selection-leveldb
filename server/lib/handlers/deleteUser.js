const DB = require('../db').db;
const Boom = require('boom');

module.exports = (request, reply) => {
  const username = request.payload.username
				
	DB.del(username, (err) => {
		if (err) return reply(Boom.badRequest(err))
		
		return reply({
		  message: username + ' is deleted'
		})
	})
}
