const c = global.Configs;
const callServer = (request, callback) => {
  c.server.inject(request, callback);
};

module.exports = (p) => {
  const email = 'vishal@cabanalabs.com';
  let person = {
    email,
    name: 'Vishal Tester',
    password: 'PinkFluffyUnicorns',
  };
  p.test('Bad request to /register (should fail - no payload!)', tr1 => {
    const options = {
      method: 'POST',
      url: '/register',
    };
    callServer(options, res => {
      tr1.equal(res.statusCode, 400, 'No payload submitted');
      tr1.end();
    });
  });

  p.test('Register a new person', t => {
    const options = {
      method: 'POST',
      url: '/register',
      payload: person,
    };
    callServer(options, res => {
      t.equal(res.statusCode, 200, 'Person registration is succesful');
      t.end();
    });
  });

  p.test('Attempt to register the same person twice', t => {
    const options = {
      method: 'POST',
      url: '/register',
      payload: person,
    };
    callServer(options, res => {
      t.equal(res.statusCode, 409, 'Person registration fails');
      t.end();
    });
  });

  p.test('Attempt to register with short password (400)', t => {
    person = {
      email: 'vishal@cabanalabs.com',
      password: '123',
    };
    const options = {
      method: 'POST',
      url: '/register',
      payload: person,
    };
    callServer(options, res => {
      t.equal(res.statusCode, 400, 'Longer password required');
      t.end();
    });
  });
};
