import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import FrontDeskContainer from '../containers/front_desk';
import frontDeskReducer from '../reducers/front_desk';
import { createStore, applyMiddleware } from 'redux';
import { checkSignIn } from '../actions/sign_in';

let store = createStore(
  frontDeskReducer,
  {},
  applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <FrontDeskContainer />
  </Provider>,
  document.getElementById('app'),
  () => {
    store.dispatch(checkSignIn());
  }
);
