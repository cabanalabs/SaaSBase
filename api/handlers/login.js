const c = global.Configs;
const bcrypt = require('bcrypt');
const aguid = require('aguid');
const JWT = require('jsonwebtoken');

module.exports = (request, reply) => {
  // First get the username
  const dbc = c.db.connection();
  const accounts = dbc.collection('accounts');
  const sessions = dbc.collection('sessions');
  if (request.headers.authorization) {
    sessions.findOne(
      { token: request.headers.authorization, name: request.payload.name },
      (err, res) => {
        if (err || !res) {
          reply({ message: 'Bad or expired login credentials' }).code(401);
        } else {
          reply({ name: request.payload.name, message: 'Login successful' }).code(200)
                                   .header('Authorization', request.headers.authorization);
        }
      }
    );
  } else {
    accounts.findOne({ email: request.payload.email }, (err, res) => {
      if (err) {
        reply({ message: 'Bad login credentials' }).code(401);
      } else {
        if (res) {
          bcrypt.compare(request.payload.password, res.password, (passErr, isValid) => {
            if (passErr || !isValid) {
              reply({ message: 'Bad login credentials' }).code(401);
            } else {
              // Create random uuid to be used as session id
              const sessionID = aguid();
              // Create aguid with the person's email
              const accountID = aguid(request.payload.email);
              // Create a signed token using JWT.sign with the
              //   the aguid and session id
              const token = JWT.sign({ jti: sessionID, account: accountID },
                                      c.JWTSecret);

              // Create session object and store it in the DB
              const session = {
                token,
                name: res.name,
                sessionID,
                accountID,
                created: new Date().toISOString(),
                ua: request.headers['user-agent'],
              };
              sessions.insert(session, (saveSessionErr, saveResult) => {
                if (saveResult.result.ok) {
                  reply({ name: res.name, message: 'Login successful' }).code(200)
                                           .header('Authorization', token);
                } else {
                  reply({ message: 'Something went wrong. - Login issue' }).code(500);
                }
              });

              // Reply with the auth info
            }
          });
        } else {
          reply({ message: 'Bad login credentials' }).code(401);
        }
      }
    });
  }
};
