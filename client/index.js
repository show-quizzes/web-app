/* eslint no-underscore-dangle: "off" */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

import './stylesheets/main.css';

const store = createStore(
  reducers,
  window.__INITIAL_STATE__,
  applyMiddleware(thunk)
);

console.log(store.getState());

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
