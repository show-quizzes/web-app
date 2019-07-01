export default ({ numRightAnswers, numQuestions, scoreAsPct }) => (
  <>
    <p>
      Incredible! You answered {numRightAnswers} questions correctly out of{' '}
      {numQuestions}, giving you a score of {scoreAsPct}%.{' '}
    </p>
    <p>Thank you for playing!</p>
  </>
);
