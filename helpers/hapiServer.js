const Hapi = require('hapi');
const server = new Hapi.Server();
const vision = require('vision');
const inert = require('inert');
const hapiReactViews = require('hapi-react-views');

// Require babel-core for server-side
// rendering of React ES6 templates
require('babel-core/register')({
  presets: ['react', 'es2015'],
});

module.exports = (port, routes) => {
  server.connection({
    host: 'localhost',
    port: port || 8000,
  });
  // Connect Vision View Engine Manager
  server.register([{
    register: inert,
  }, {
    register: vision,
  }], (err) => {
    if (err) {
      throw err;
    } else {
      // Add the React-rendering view engine
      // to the Hapi.js server module
      // this will pre-render templates.
      server.views({
        engines: {
          jsx: hapiReactViews,
        },
        relativeTo: `${__dirname}/../front`,
        path: 'views',
      });
    }
  });
  server.route(routes);
  return server;
};
