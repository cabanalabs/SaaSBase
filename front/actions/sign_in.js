import fetch from 'isomorphic-fetch';

const attemptSigningIn = (login, password) => (
  {
    type: 'ATTEMPTING_SIGN_IN',
    login,
    password,
  }
);

const receiveAccess = (authToken, name) => (
  // save auth token
  {
    type: 'SIGN_IN_SUCCEEDED',
    authToken,
    name,
  }
);

const loginFailed = errorMessage => (
  {
    type: 'SIGN_IN_FAILED',
    errorMessage,
  }
);

const signOut = () => {
  localStorage.removeItem('JWT');
  localStorage.removeItem('name');
  return {
    type: 'SIGN_OUT',
  };
};

const getSignedOut = function getSignedOut() {
  return dispatch => {
    const JWT = localStorage.getItem('JWT');
    const name = localStorage.getItem('name');
    if (!JWT) {
      dispatch(signOut());
    } else {
      fetch('/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: JWT,
        },
        body: JSON.stringify({
          name,
        }),
      }).then(response => {
        if (response.status === 200) {
          dispatch(signOut());
        }
      });
    }
  };
};

const checkSignIn = function checkSignIn() {
  return dispatch => {
    // Get auth from localstorage
    const JWT = localStorage.getItem('JWT');
    const name = localStorage.getItem('name');
    if (!JWT) {
      dispatch(signOut());
    } else {
      fetch('/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: JWT,
        },
        body: JSON.stringify({
          name,
        }),
      }).then(response => {
        if (response.status === 200) {
          dispatch(receiveAccess(JWT, name));
        } else {
          dispatch(signOut());
        }
      });
    }
  };
};

const trySigningIn = function trySigningIn(email, password) {
  return dispatch => {
    dispatch(attemptSigningIn(email, password));
    fetch('/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(response => {
      if (response.status === 200) {
        response.json().then(body => {
          // Save auth to localstorage
          const authorization = response.headers.get('Authorization');
          localStorage.setItem('JWT', authorization);
          localStorage.setItem('name', body.name);
          dispatch(receiveAccess(authorization, body.name));
        });
      } else {
        dispatch(loginFailed('Sign in failed. Please, try again.'));
      }
    });
  };
};

module.exports = {
  attemptSigningIn,
  receiveAccess,
  loginFailed,
  trySigningIn,
  checkSignIn,
  getSignedOut,
  signOut,
};
