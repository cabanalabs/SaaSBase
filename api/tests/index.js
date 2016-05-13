require('./api_test_configs');
const c = global.Configs;

c.test.onFinish(() => {
  c.server.stop((stopErr) => {
    if (stopErr) {
      throw stopErr;
    }
    c.db.close(didClose => {
      if (!didClose) {
        throw (new Error('The DB Did not close!'));
      }
    });
  });
});

const runThroughAllTests = () => {
  // Run through all tests
  require('fs').readdirSync(__dirname).forEach((file) => {
    if (file.startsWith('test_')) {
      require(`./${file}`)(c.test);
    }
  });
};

const startHapiServer = () => {
  c.test('Test Hapi server', (thapi) => {
    c.server.start(error => {
      thapi.notOk(error, 'Web server needs to be running');
      thapi.end();
      if (!error) {
        runThroughAllTests();
      }
    });
  });
};

const setupDB = (dbc) => {
  c.test('Wipe and recreate Mongo collections', (colTest) => {
    const collections = ['accounts', 'sessions'];
    let colCount = 0;
    collections.forEach(colName => {
      // drop the collection First
      dbc.dropCollection(colName, (err) => {
        colTest.notOk(err, `No error while dropping ${colName}`);
        dbc.createCollection(colName, (createErr) => {
          colTest.notOk(createErr, `No error while creating ${colName}`);
          colCount += 1;
          if (colCount === collections.length) {
            colTest.end();
            startHapiServer();
          }
        });
      });
    });
  });
};

// Everything starts here
c.test('Test DB Server', (tdbc) => {
  // Connect to Mongo before starting
  // Hapi server
  c.db.connect(c.testDB, (dbError, dbc) => {
    tdbc.notOk(dbError, 'We do not want a DB error!');
    tdbc.end();
    if (!dbError) {
      setupDB(dbc);
    }
  });
});
