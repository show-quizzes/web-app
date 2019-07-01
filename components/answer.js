export default ({
  classes,
  handleAnswer,
  index,
  isAnswered,
  letter,
  selectedAnswerId,
  text
}) => {
  let classNames = '';
  const handleSelection = index => {
    handleAnswer(true, index);
  };

  if (isAnswered) {
    if (index === selectedAnswerId) {
      classNames = classes;
    } else {
      classNames = 'answer';
    }
  } else {
    classNames = 'answer';
  }

  return (
    <div className={classNames} onClick={() => handleSelection(index)}>
      {letter}. {text}
    </div>
  );
};
