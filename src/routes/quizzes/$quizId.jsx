import { createFileRoute } from "@tanstack/react-router";
import { useQuizState } from "../../hooks/useQuizState";
import { getQuizData } from "../../quizRegistry";

import Answers from "../../components/answers.jsx";
import Header from "../../components/header.jsx";
import Progress from "../../components/progress.jsx";
import Question from "../../components/question.jsx";
import Response from "../../components/response.jsx";
import Results from "../../components/results.jsx";

export const Route = createFileRoute("/quizzes/$quizId")({
  component: QuizPage,
});

function QuizPage() {
  const { quizId } = Route.useParams();
  const quiz = getQuizData(quizId);

  if (!quiz) {
    return (
      <div>
        <h1>Quiz not found</h1>
        <p>The quiz "{quizId}" does not exist.</p>
      </div>
    );
  }

  const { state, checkAnswer, handleReset } = useQuizState(quiz.data);

  const {
    correctAnswerId,
    currQuesData,
    currQuesNum,
    gameOver,
    isAnswered,
    isCorrect,
    numQuestions,
    numRightAnswers,
    responses,
    scoreAsPct,
    selectedAnswerId,
  } = state;

  // Don't render until quiz is initialized
  if (!state.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!gameOver ? (
        <>
          <Header {...currQuesData} />
          <Question {...currQuesData} />
          <Answers
            answer={correctAnswerId}
            answers={currQuesData.answers}
            handleAnswer={checkAnswer}
            isAnswered={isAnswered}
            selectedAnswerId={selectedAnswerId}
          />
          <Response
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            reset={handleReset}
            responseText={responses}
          />
          <Progress currQuesNum={currQuesNum} numQuestions={numQuestions} />
        </>
      ) : (
        <Results
          numRightAnswers={numRightAnswers}
          numQuestions={numQuestions}
          scoreAsPct={scoreAsPct}
        />
      )}
    </>
  );
}
