import fetch from 'isomorphic-fetch';

const attemptRegistering = (login, password) => (
  {
    type: 'TRYING_TO_REGISTER',
    login,
    password,
  }
);

const successfulRegistration = (authToken, name) => (
  // save auth token
  {
    type: 'REGISTERED_NEW_ACCOUNT',
    name,
  }
);

const registrationFailed = errorMessage => (
  {
    type: 'REGISTRATION_FAILED',
    errorMessage,
  }
);

const tryRegistering = function trySigningIn(name, email, password) {
  return (dispatch) => {
    dispatch(attemptRegistering(name, email));
    fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((response) => {
      if (response.status === 200) {
        dispatch(successfulRegistration(response.headers.get('Authorization'), response.name));
      } else {
        dispatch(registrationFailed('All registration fields are required. Please, try again.'));
      }
    });
  };
};

module.exports = {
  attemptRegistering,
  successfulRegistration,
  registrationFailed,
  tryRegistering,
};
