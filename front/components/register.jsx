const React = require('react');
const PropTypes = React.PropTypes;
const RegistrationControls = function registrationControls({ onClick, messages }) {
  let errorsAndMessages = '';
  if (messages.registerError) {
    errorsAndMessages = <div id="errors" className="Errors">{messages.registerError}</div>;
  } else if (messages.registerMessage) {
    errorsAndMessages = <div id="messages" className="Messages">{messages.registerMessage}</div>;
  }
  return (
    <div id="registration_controls">
      <form id="registration_form">
        <input type="text" id="registration_name" placeholder="Your Name" />
        <input type="text" id="registration_email" placeholder="E-Mail Address" />
        <input type="password" id="registration_password" placeholder="Password" />
        {errorsAndMessages}
        <button
          id="register"
          onClick={
            (e) => {
              e.preventDefault();
              onClick(
                document.getElementById('registration_name').value,
                document.getElementById('registration_email').value,
                document.getElementById('registration_password').value);
            }
          }
        >Register</button>
      </form>
    </div>
  );
};

RegistrationControls.propTypes = {
  onClick: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

module.exports = RegistrationControls;
