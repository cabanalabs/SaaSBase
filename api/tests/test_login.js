const c = global.Configs;

const callServer = (request, callback) => {
  c.server.inject(request, callback);
};
module.exports = (p) => {
  const email = 'johnnyboy@cabanalabs.com';
  const registrationInfo = {
    email,
    password: 'HULL25$#@!@',
    name: 'John Hennessey',
  };
  const loginInfo = {
    email,
    password: registrationInfo.password,
  };

  const runLoginTests = (dt) => {
    dt.test('Try logging in with bad username', at => {
      callServer({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'dne@badlogin.com',
          password: 'HolyMolyWowow',
        },
      }, res => {
        at.equal(res.statusCode, 401, 'Login is rightfully unsuccessful.');
        at.end();
      });
    });

    dt.test('Try logging in with bad password', bt => {
      callServer({
        method: 'POST',
        url: '/login',
        payload: {
          email,
          password: 'HolyMolyWowow',
        },
      }, res => {
        bt.equal(res.statusCode, 401,
                'Login is rightfully unsuccessful. Baad password');
        bt.end();
      });
    });

    dt.test('Try logging in as a real user', ct => {
      callServer({
        method: 'POST',
        url: '/login',
        payload: loginInfo,
      }, res => {
        ct.ok(res.headers.authorization !== null, 'Authorization is good.');
        ct.equal(res.result.name, registrationInfo.name, 'Name matches');
        ct.equal(res.statusCode, 200, 'Great login success!');

        callServer({
          method: 'POST',
          url: '/login',
          headers: {
            authorization: res.headers.authorization,
          },
          payload: {
            name: res.result.name,
          },
        }, authRes => {
          ct.ok(authRes.headers.authorization === res.headers.authorization, 'Check Auth is Good');
          ct.equal(authRes.result.name, registrationInfo.name, 'Check Auth Name matches');
          ct.equal(authRes.statusCode, 200, 'Auth Check success!');
          ct.end();
        });
      });
    });

    dt.test('Try to test bad auth check', et => {
      callServer({
        method: 'POST',
        url: '/login',
        headers: {
          authorization: 'THIS IS A BAD AUTH',
        },
        payload: {
          name: registrationInfo.name,
        },
      }, res => {
        et.equal(res.statusCode, 401,
                'Login is rightfully unsuccessful. Baad password');
        et.end();
      });
    });

    dt.test('Login and then logout', ft => {
      callServer({
        method: 'POST',
        url: '/login',
        payload: loginInfo,
      }, res => {
        ft.equal(res.statusCode, 200, 'Great login success!');
        callServer({
          method: 'POST',
          url: '/logout',
          headers: {
            authorization: res.headers.authorization,
          },
          payload: {
            name: res.result.name,
          },
        }, logoutRes => {
          ft.equal(logoutRes.statusCode, 200, `Logout success! -- ${logoutRes.result.message}`);
          ft.end();
        });
      });
    });
  };

  // First create a user
  p.test('Register an account for login purposes', dt => {
    const options = {
      method: 'POST',
      url: '/register',
      payload: registrationInfo,
    };
    callServer(options, res => {
      dt.equal(res.statusCode, 200, 'Person registration is succesful');
      runLoginTests(dt);
      dt.end();
    });
  });
};
