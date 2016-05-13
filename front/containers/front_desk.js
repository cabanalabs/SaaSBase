const frontDeskComponent = require('../components/front_desk');
import { trySigningIn, getSignedOut } from '../actions/sign_in';
import { tryRegistering } from '../actions/register';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  name: state.name,
  login: state.login,
  isSignedIn: state.isSignedIn,
  signInAuthToken: state.signInAuthToken,
  dashboardUrl: state.dashboardUrl,
  messages: {
    registerMessage: state.registerMessage,
    registerError: state.registerError,
    signInMessage: state.signInMessage,
    signInError: state.signInError,
    name: state.name,
  },
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick: (login, password) => dispatch(trySigningIn(login, password)),
  onRegisterClick: (name, email, password) => dispatch(tryRegistering(name, email, password)),
  onSignOutClick: () => dispatch(getSignedOut()),
});

const FrontDeskContainer = connect(mapStateToProps, mapDispatchToProps)(frontDeskComponent);

export default FrontDeskContainer;
