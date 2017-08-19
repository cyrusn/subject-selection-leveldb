const DB = require('../lib/db').db;

const deleteUser = (username, callbac) => {
	DB.del(username, function(err){
		if (err) console.log(err)
	})
}

module.exports = deleteUser
