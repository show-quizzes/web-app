export default ({ currQuesNum, numQuestions }) => (
  <p className="progress">
    question {currQuesNum + 1} of {numQuestions}
  </p>
);
