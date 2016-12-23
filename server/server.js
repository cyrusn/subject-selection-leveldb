const Hapi = require('hapi');
const Session = require('hapi-auth-cookie');
const Inert = require('inert');
const Route = require('./lib/route');
const Logging = require('./lib/logging');
const Path = require('path');
const Port = require('./config').port;
const isServePublic = require('./config').isServePublic;
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Pack = require('./package');

const Swagger = {
  register: HapiSwagger,
  options: {
    info: {
      title: 'F4 Subject-Selection API Documentation',
      version: Pack.version
    },
    payloadType: 'form'
  }
};

const server = new Hapi.Server();

server.connection({
  port: Port,
  routes: {
    cors: {
      credentials: !isServePublic
    }
  }
});

server.register([Session, Inert, Logging, Vision, Swagger], function (err) {
  if (err) return;

  server.path(Path.resolve(__dirname, '../public'));
  server.auth.strategy('session', 'cookie', true, {
    cookie: 'Subject-Selection',
    password: 'liping',
    isSecure: false,
    ttl: 30 * 60 * 1000
  });

  server.route(Route);

  server.start(function () {
    console.log('Server port: ' + Port);
    if (isServePublic) console.log('Mounted public folder: /public');
    console.log('Server running at: ' + server.info.uri);
  });
});
