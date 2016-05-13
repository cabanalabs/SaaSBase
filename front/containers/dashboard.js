const dashboardComponent = require('../components/dashboard');
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  name: state.name,
});

const FrontDeskContainer = connect(mapStateToProps, null)(dashboardComponent);

export default FrontDeskContainer;
