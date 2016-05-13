const Account = require('../models/account');
const handleRegister = require('./handlers/register');
const handleLogin = require('./handlers/login');
const logoutHandler = require('./handlers/logout');

module.exports = [
  { path: '/register', method: 'POST',
    config: { auth: false, validate: Account,
              handler: handleRegister } },
  { path: '/login', method: 'POST',
    config: { auth: false,
              handler: handleLogin } },
  { path: '/logout', method: 'POST',
    config: { auth: false,
              handler: logoutHandler } },
];
