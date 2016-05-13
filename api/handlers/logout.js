const c = global.Configs;

module.exports = (request, reply) => {
  // First get the username
  const dbc = c.db.connection();
  const sessions = dbc.collection('sessions');
  if (request.headers.authorization) {
    sessions.findOneAndDelete(
      { token: request.headers.authorization, name: request.payload.name },
      (err, res) => {
        if (res.ok) {
          reply({ message: 'Logged out' }).code(200);
        } else {
          reply({ message: 'You may already have logged out!' }).code(410);
        }
      }
    );
  }
};
