const React = require('react');
const PropTypes = React.PropTypes;
const SignInControls = function loginControls({ onClick, messages }) {
  let errorsAndMessages = '';
  if (messages.signInError) {
    errorsAndMessages = <div id="errors" className="Errors">{messages.signInError}</div>;
  } else if (messages.signInMessage) {
    errorsAndMessages = <div id="messages" className="Messages">{messages.signInMessage}</div>;
  }
  return (
    <div id="sign_in_controls">
      <form id="sign_in_form">
        <input type="text" id="s_email" name="account_email" placeholder="Account E-Mail" />
        <input type="password" id="s_password" name="account_password" placeholder="Password" />
        {errorsAndMessages}
        <button
          id="sign_in"
          onClick={
            (e) => {
              e.preventDefault();
              onClick(
                document.getElementById('s_email').value,
                document.getElementById('s_password').value);
            }
          }
        >Sign in</button>
      </form>
    </div>
  );
};

SignInControls.propTypes = {
  onClick: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

module.exports = SignInControls;
