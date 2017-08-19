const Joi = require('joi');

// leesei:
// TODO: response validation?

const routes = [{
  method: 'POST',
  path: '/auth/login',
  config: {
    auth: false,
    tags: ['api', 'auth'],
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    },
    handler: require('./handlers/login')
  }
}, {
  method: 'POST',
  path: '/auth/logout',
  config: {
    tags: ['api', 'auth'],
    auth: {
      access: {
        scope: ['admin', 'student']
      }
    },
    handler: require('./handlers/logout')
  }
}, {
  method: 'GET',
  path: '/user/{username}/info',
  config: {
    tags: ['api', 'auth'],
    description: '[user] check if session exist, return user.info object',
    auth: {
      access: {
        scope: ['student', 'admin']
      }
    },
    handler: require('./handlers/getUser')
  }
}, {
  // leesei: both students and admin can change isConfirmed?
  // cyrusn:
  // admin use /release, as the payload are different
  // admin payload: { username: student_username, isConfirmed: boolean};
  // student payload: {isConfirmed: boolean};
  // leesei: I don't understand, discuss on phone
  // cyrusn: trying to understand restful api structure
  // see if now better
  // DONE: need to see use case, we can allow [admin] to PUT
  // to '/students/subjectPriority' to change `isConfirmed`
  // I see there is one thing that you're missing on RESTful API
  // we should put id in param and reduce use of query
  // PUT /students/lp1311004/priority
  // PUT /students/lp1311004/confirmed (possible API to replace '/students/isConfirmed')
  method: 'PUT',
  path: '/student/{username}/priority/combos',
  config: {
    tags: ['api'],
    description: '[student] update subjectPriority.combos, return combos',
    auth: {
      access: {
        scope: ['student']
      }
    },
    validate: {
      // no need to validate params
      // using request.auth.credentials.username to lookup student
      payload: {
        combos: Joi.array().required()
      }
    },
    handler: require('./handlers/subjectPriority')
  }
}, {
//   method: 'PUT',
//   path: '/student/{username}/priority/oles',
//   config: {
//     tags: ['api'],
//     description: '[student] update subjectPriority.oles, return oles',
//     auth: {
//       access: {
//         scope: ['student']
//       }
//     },
//     validate: {
//       // no need to validate params
//       // using request.auth.credentials.username to lookup student
//       payload: {
//         oles: Joi.array().required()
//       }
//     },
//     handler: require('./handlers/subjectPriority')
//   }
// }, {
  method: 'PUT',
  path: '/student/{username}/priority/confirm',
  config: {
    tags: ['api'],
    description: '[student] update subjectPriority.isConfirmed to true, return message',
    // no need to validate params
    // using request.auth.credentials.username to lookup student
    auth: {
      access: {
        scope: ['student']
      }
    },
    handler: require('./handlers/subjectPriority/confirm')
  }
}, {
  method: 'PUT',
  path: '/student/{username}/priority/unconfirm',
  config: {
    tags: ['api'],
    description: '[admin] update subjectPriority.isConfirmed to false, return message',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    validate: {
      params: {
        username: Joi.string().required()
      }
    },
    handler: require('./handlers/subjectPriority/unconfirm')
  }
}, {
  method: 'get',
  path: '/student/{username}/priority',
  config: {
    tags: ['api'],
    description: '[student] get student\'s priority,',
    auth: {
      access: {
        scope: ['student']
      }
    },
    handler: require('./handlers/subjectPriority')
  }
}, {
  method: 'GET',
  path: '/students',
  config: {
    tags: ['api'],
    description: '[admin] list all student data',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    handler: require('./handlers/listAllStudents')
  }
}, {
  method: 'GET',
  path: '/students/export/{type}',
  config: {
    tags: ['api'],
    description: '[admin] download student data and allocation in csv/json',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    validate: {
      params: {
        type: Joi.string().regex(/^json$|^csv$/)
      }
    },
    handler: require('./handlers/download')
  }
}, {
  method: 'POST',
  path: '/user',
  config: {
    tags: ['api'],
    description: '[superAdmin] create users, use http agent to do the job',
    notes: 'e.g.: [Postman - Chrome Web Store](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en), [jkbrzt/httpie](https://github.com/jkbrzt/httpie)',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    validate: {
      payload: {
        username: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        cname: Joi.string().required(),
        classNo: Joi.string(), // not required for admin user
        isAdmin: Joi.boolean().required()
      }
    },
    handler: require('./handlers/createUser')
  }
}, {
  method: 'POST',
  path: '/allocation/capacity',
  config: {
    tags: ['api'],
    description: '[admin] update the subjectCapacity for allocation, return subjectCapacity object',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    validate: {
      payload: {
        phy: Joi.number().integer().min(1),
        bio: Joi.number().integer().min(1),
        bafs: Joi.number().integer().min(1),
        chist: Joi.number().integer().min(1),
        ths: Joi.number().integer().min(1),
        ict: Joi.number().integer().min(1),
        va: Joi.number().integer().min(1),
        chem: Joi.number().integer().min(1),
        cscb: Joi.number().integer().min(1),
        econ: Joi.number().integer().min(1),
        hist: Joi.number().integer().min(1),
        geog: Joi.number().integer().min(1)
      }
    },
    handler: require('./handlers/subjectCapacity')
  }
}, {
  method: 'GET',
  path: '/allocation/capacity',
  config: {
    tags: ['api'],
    description: '[admin] returns subject capacities (if uploaded)',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    handler: require('./handlers/subjectCapacity')
  }
}, {
  method: 'POST',
  path: '/allocation/rank',
  config: {
    tags: ['api'],
    description: '[admin] upload studentRank.csv for allocation, return success message',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    validate: {
      payload: {
        rank: Joi.any()
          .meta({ swaggerType: 'file' })
          .description('csv file')
      }
    },
    payload: {
      parse: true,
      output: 'stream',
      defaultContentType: 'text/csv'
    },
    handler: require('./handlers/studentRank')
  }
}, {
  method: 'GET',
  path: '/allocation/rank',
  config: {
    tags: ['api'],
    description: '[admin] returns student ranks (if uploaded)',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    handler: require('./handlers/studentRank')
  }
}, {
  method: 'GET',
  path: '/allocation/result/{type}',
  config: {
    tags: ['api'],
    description: '[admin] get the statistic or students of allocation',
    auth: {
      access: {
        scope: ['admin']
      }
    },
    validate: {
      params: {
        type: Joi.string().regex(/^statistic$|^students$/)
      }
    },
    handler: require('./handlers/comboAllocate')
  }
}, {
		method: 'POST',
		path: '/user/delete',
		config: {		
			tags: ['api'],
			description: '[superAdmin] delete users, use http agent to do the job',
			auth: {
				access: {
   				scope: ['admin']
				}
			},
			validate: {
				payload: {
					username: Joi.string().required(),
				}
			},
			handler: require('./handlers/deleteUser')
	}
}];

if (require('../config').isServePublic) {
  routes.push({
    method: 'GET',
    path: '/{file*}',
    config: {
      tags: ['api'],
      description: 'serve the public folder with this server',
      auth: false,
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: true
        }
      },
      handler: {
        directory: {
          path: '.',
          listing: true
        }
      }
    }
  });
}

module.exports = routes;
