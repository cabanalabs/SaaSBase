const React = require('react');
const PropTypes = React.PropTypes;
const Cookie = require('react-cookie');
const RegistrationControls = require('./register');
const SignInControls = require('./sign_in');
const WelcomeText = require('./welcome_text');

const FrontDesk =
({
  onSignInClick,
  onRegisterClick,
  onSignOutClick,
  messages,
  isSignedIn,
  name,
  signInAuthToken,
  dashboardUrl,
}) => {
  let sessionControls = '';
  if (isSignedIn) {
    // Set cookie here
    Cookie.save('Authorization', signInAuthToken, { path: '/' });
    Cookie.save('name', name, { path: '/' });
    sessionControls =
    (<div id="front_desk">
      <div id="welcome_box"><form action={dashboardUrl}>
        <div id="welcome_message">Hi, {name}!</div>
        <button id="btnDashboard">Open Dashboard</button>
        <button
          id="signout"
          onClick={
            (e) => {
              e.preventDefault();
              Cookie.remove('Authorization', { path: '/' });
              Cookie.remove('name', { path: '/' });
              onSignOutClick();
            }
          }
        >Sign Out</button>
      </form></div>
    </div>);
  } else {
    sessionControls =
      (<div id="front_desk">
        <h2>Sign in</h2>
        <SignInControls onClick={onSignInClick} messages={messages} />
        <h2>Create an account</h2>
        <RegistrationControls onClick={onRegisterClick} messages={messages} />
      </div>);
  }
  return (
    <div>
      {sessionControls}
      <WelcomeText />
    </div>
  );
};

FrontDesk.propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  messages: PropTypes.object,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  signInAuthToken: PropTypes.string,
  dashboardUrl: PropTypes.string,
};
module.exports = FrontDesk;
