const c = global.Configs;
const bcrypt = require('bcrypt');

const encryptPassword = (password, callback) => {
  bcrypt.genSalt(12, (saltErr, salt) => {
    if (saltErr) {
      callback(saltErr, null);
    } else {
      bcrypt.hash(password, salt, (hashErr, hash) => {
        callback(hashErr, hash);
      });
    }
  });
};

module.exports = (request, reply) => {
  // Find account in DB with the
  // same email
  const dbc = c.db.connection();
  const accounts = dbc.collection('accounts');
  accounts.findOne({ email: request.payload.email }, (err, res) => {
    if (res) {
      // found the account
      reply({ error: 'Account alredy exists for that email. ' +
      'Send an email to vishal@cabanalabs.com' }).code(409);
    } else {
      // did not find the account, create it
      encryptPassword(request.payload.password, (hashErr, passHash) => {
        const newAccount = {
          email: request.payload.email,
          name: request.payload.name,
          password: passHash,
        };
        if (passHash) {
          // save the whole thing
          accounts.insert(newAccount, (saveAccountErr, saveResult) => {
            if (saveResult.result.ok) {
              reply({ name: newAccount.name, message: 'Account Created' }).code(200);
            } else {
              reply({ message: 'Trouble creating account - account issue' }).code(500);
            }
          });
        } else {
          reply({ message: 'Trouble creating account - password issue' }).code(500);
        }
      });
    }
  });
};
