var Good = require('good');

module.exports = {
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        log: '*',
        response: '*'
      },
      config: {
        format: 'DD MMM HH:mm:ss.SSS',
        utc: false
      }
    }]
  }
};
