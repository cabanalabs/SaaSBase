const c = require('./configs');
const bcrypt = require('bcrypt');

c.test('Does bcrypt work?', (t) => {
  bcrypt.genSalt(12, (saltErr, salt) => {
    bcrypt.hash('testPassword', salt, (hashErr, hash) => {
      bcrypt.compare('testPassword', hash, (compErr, isValid) => {
        t.ok(isValid, 'The password test works!');
        t.end();
      });
    });
  });
});
