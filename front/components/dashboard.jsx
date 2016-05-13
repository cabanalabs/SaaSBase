const React = require('react');
const PropTypes = React.PropTypes;

const Dashboard = function Dashboard({ messages }) {
  return (
    <div>
      <div id="menu"><div id="welcome_message">Menu</div></div>
      <div id="dashboard">
        <h1>Admin Content</h1>
        <p>This is where all the work will be done.</p>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  messages: PropTypes.object,
};
module.exports = Dashboard;
// Properties
// logged in or not?

// if user is logged in
// render the logged in state
// show welcome box with logout button

// if user is not logged in
// render the logged out state
// show username, password, login buttons
