import React from 'react';
import { connect } from  'react-redux';

import Header from './Header';
import Question from './Question';
import Response from './Response';
import Answers from './Answers';

import { reset, setResponse } from '../actions';

const mapStateToProps = (state) => {
  return ({
    app: state.app
  });
};

const mapDispatchToProps = (dispatch) => ({
  onReset: () => {
    dispatch(reset());
  },
  onSetResponse: (response) => {
    dispatch(setResponse(response));
  }
});

const App = ({ app, onReset, onSetResponse }) => (
  <div id="content-wrapper">
    <Header { ...app }/>
    <Question { ...app }/>
    <Answers { ...app } onSetResponse={ onSetResponse }/>
    <Response { ...app } onReset={ onReset } onSetResponse={ onSetResponse }/>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
