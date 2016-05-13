
module.exports = (state, action) => {
  switch (action.type) {
    // SIGN IN
    case 'SIGN_OUT':
      return {
        status: 'SIGNED OUT',
      };
    case 'ATTEMPTING_SIGN_IN':
      return {
        status: 'SIGNING IN',
        login: action.login,
        signInMessage: 'Signing in..',
      };
    case 'SIGN_IN_SUCCEEDED':
      return {
        isSignedIn: true,
        dashboardUrl: '/dashboard',
        signInAuthToken: action.authToken,
        status: 'SUCCESSFUL SIGN IN',
        name: action.name,
        signInMessage: `Thanks for signing in, ${action.name}! Taking you to the dashboard...`,
      };
    case 'SIGN_IN_FAILED':
      return {
        status: 'ERROR SIGNING IN',
        name: state.name,
        signInError: action.errorMessage,
      };
    // ACCOUNT REGISTRATION
    case 'TRYING_TO_REGISTER':
      return {
        status: 'REGISTERING',
        name: action.name,
        email: action.email,
        registerMessage: 'Trying to register...',
      };
    case 'REGISTERED_NEW_ACCOUNT':
      return {
        status: 'SUCCESSFUL REGISTRATION',
        name: state.name,
        email: action.email,
        registerMessage: `Thanks for signing up, ${action.name}! You can now login!`,
      };
    case 'REGISTRATION_FAILED':
      return {
        status: 'REGISTRATION ERROR',
        name: action.name,
        email: action.email,
        registerError: action.errorMessage,
      };
    default:
      return state;
  }
};
