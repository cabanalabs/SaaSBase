import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import DashboardContainer from '../containers/dashboard';
import dashboardReducer from '../reducers/dashboard';
import { createStore, applyMiddleware } from 'redux';


let store = createStore(
  dashboardReducer,
  {},
  applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <DashboardContainer />
  </Provider>,
  document.getElementById('app'),
  () => {

  }
);
