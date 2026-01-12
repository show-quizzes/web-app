export default ({
  correctAnswerId,
  handleAnswer,
  index,
  isAnswered,
  letter,
  selectedAnswerId,
  text,
}) => {
  let classNames = "answer";
  const handleSelection = (index) => {
    handleAnswer(index);
  };

  if (isAnswered && index === selectedAnswerId) {
    // Add correct or incorrect class to the selected answer
    if (index === correctAnswerId) {
      classNames = "answer correct";
    } else {
      classNames = "answer incorrect";
    }
  }

  return (
    <div className={classNames} onClick={() => handleSelection(index)}>
      {letter}. {text}
    </div>
  );
};
