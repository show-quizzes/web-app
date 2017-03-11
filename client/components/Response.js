import React, { PropTypes } from 'react';

class Response extends React.Component {
  constructor() {
    super();
  }

  handleClickReset(){
    const { onReset, onSetResponse } = this.props;
    onReset();
    onSetResponse(2);
  }

  render(){
    const { response, responses, isAnswered, isCorrect } = this.props;

    let tryAgain;

    if(isAnswered && !isCorrect) {
      tryAgain = <span className="try-again" onClick={ this.handleClickReset.bind(this) }>try again</span>;
    }

    return (
      <div className="response">
      { response } { tryAgain }
      </div>
    );
  }
};

export default Response;
