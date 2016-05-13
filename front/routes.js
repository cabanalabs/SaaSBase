const Cookie = require('cookie');
const c = global.Configs;
module.exports = [{
  // Serve static image assets
  method: 'GET',
  path: '/{param*}',
  config: {
    handler: {
      directory: {
        path: `${__dirname}/public`,
      },
    },
  },
},
{
  // Home route
  method: 'GET',
  path: '/',
  config: {
    handler: (request, reply) => {
      reply.view('home');
    },
  },
},
{
  method: 'GET',
  path: '/dashboard',
  config: {
    handler: (request, reply) => {
      // Auth right here, bitch.
      const dbc = c.db.connection();
      const authCookie = Cookie.parse(request.headers.cookie || '');
      const sessions = dbc.collection('sessions');
      sessions.findOne(
        { token: authCookie.Authorization || '-', name: authCookie.name || '-' },
        (err, res) => {
          if (err || !res) {
            reply.view('logged_out');
          } else {
            reply.view('dashboard');
          }
        }
      );
    },
  },
}];
