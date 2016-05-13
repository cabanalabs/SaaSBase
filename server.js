global.Configs = require('./configs');
const c = global.Configs;

c.db = require('./helpers/db');
const db = c.db;
const apiRoutes = require('./api/routes');
const frontRoutes = require('./front/routes');
const server = require('./helpers/hapiServer')(c.mainPort,
  [...apiRoutes, ...frontRoutes]);
c.server = server;

// Connect to Mongo before starting
// Hapi server
db.connect(c.mainDB, dbError => {
  if (dbError) {
    throw dbError;
  } else {
    server.start(err => {
      if (err) {
        throw err;
      }
    });
  }
});
