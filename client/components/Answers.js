import React, { PropTypes } from 'react';

const Answers = ({ answers }) => {
  const letters = ['a','b','c','d'];
  const Answers = answers.map((answer, i) => {
    return <div className="answer" key={ i }>{ letters[i] }. { answer }</div>
  });

  return (
    <div className="answers-wrapper">
      { Answers }
    </div>
  )
};

export default Answers;
