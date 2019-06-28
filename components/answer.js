import { useState } from 'react';

export default ({
  correctAnswerId,
  handleAnswer,
  index,
  isAnswered,
  letter,
  text
}) => {
  const [classes, setClasses] = useState('answer');

  const handleSelection = index => {
    if (index === correctAnswerId) {
      setClasses('answer correct');
      handleAnswer(true, true);
    } else {
      setClasses('answer incorrect');
      handleAnswer(true, false);
    }
  };

  return (
    <div
      className={isAnswered ? classes : 'answer'}
      onClick={() => handleSelection(index)}
    >
      {letter}. {text}
    </div>
  );
};
