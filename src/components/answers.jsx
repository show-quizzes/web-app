import Answer from "./answer.jsx";

export default ({
  answer: correctAnswerId,
  answers,
  handleAnswer,
  isAnswered,
  selectedAnswerId,
}) => {
  const letters = ["a", "b", "c", "d"];

  const Answers = answers.map((text, i) => {
    return (
      <Answer
        correctAnswerId={correctAnswerId}
        handleAnswer={handleAnswer}
        index={i}
        isAnswered={isAnswered}
        key={i}
        letter={letters[i]}
        selectedAnswerId={selectedAnswerId}
        text={text}
      />
    );
  });

  return (
    <div
      className={isAnswered ? "answers-wrapper answered" : "answers-wrapper"}
    >
      {Answers}
    </div>
  );
};
