const c = require('./configs');

c.test('Ensure that the DB server starts', (t) => {
  // Connect to Mongo before starting
  // Hapi server
  c.db.connect(c.testDB, dbError => {
    if (dbError) {
      throw dbError;
    } else {
      t.ok(!dbError, 'DB Server Started successfully');

      // TODO: Wipe the DB before running all the tests

      // Run through all tests
      require('fs').readdirSync(__dirname).forEach((file) => {
        if (file.startsWith('test_')) {
          require(`./${file}`);
        }
      });

      // Once all the tests are done
      c.db.close((didClose) => {
        c.test('Make sure that the DB connection closes', (de) => {
          de.ok(didClose, 'DB connection did infact close');
          de.end();
        });
      });
    }
    t.end();
  });
});
