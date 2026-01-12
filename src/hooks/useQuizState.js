import { useReducer } from "react";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "INIT_QUIZ":
      return {
        ...state,
        data: action.data,
        currQuesData: { ...action.data.questions[0], ...action.data.defaults },
        currQuesNum: 0,
        numQuestions: action.data.questions.length,
        correctAnswerId: action.data.questions[0].answer,
        responses: action.data.defaults.responses,
        isAnswered: action.data.defaults.isAnswered,
        isCorrect: action.data.defaults.isCorrect,
        gameOver: false,
        scores: {},
        selectedAnswerId: null,
        classes: "",
      };

    case "CHECK_ANSWER":
      const isCorrect = action.answerId === state.correctAnswerId;
      return {
        ...state,
        classes: isCorrect ? "answer correct" : "answer incorrect",
        isAnswered: true,
        isCorrect,
        selectedAnswerId: action.answerId,
        scores: state.scores[state.currQuesNum]
          ? state.scores
          : {
              ...state.scores,
              [state.currQuesNum]: isCorrect ? "correct" : "incorrect",
            },
      };

    case "TRY_AGAIN":
      return {
        ...state,
        isAnswered: false,
        isCorrect: false,
      };

    case "NEXT_QUESTION":
      const nextQuesNum = state.currQuesNum + 1;
      const isLastQuestion = nextQuesNum >= state.numQuestions;

      if (isLastQuestion) {
        return {
          ...state,
          gameOver: true,
        };
      }

      return {
        ...state,
        currQuesNum: nextQuesNum,
        currQuesData: state.data.questions[nextQuesNum],
        correctAnswerId: state.data.questions[nextQuesNum].answer,
        isAnswered: false,
        isCorrect: false,
        classes: "",
        selectedAnswerId: null,
      };

    case "SET_GAME_OVER":
      const numRightAnswers = Object.values(state.scores).filter(
        (score) => score === "correct"
      ).length;
      const scoreAsPct = ((numRightAnswers / state.numQuestions) * 100).toFixed(
        1
      );

      return {
        ...state,
        gameOver: true,
        numRightAnswers,
        scoreAsPct,
      };

    default:
      return state;
  }
};

const initialState = {
  classes: "",
  correctAnswerId: null,
  currQuesData: {},
  currQuesNum: 0,
  data: null,
  gameOver: false,
  isAnswered: false,
  isCorrect: false,
  numQuestions: 0,
  numRightAnswers: null,
  responses: [],
  scoreAsPct: null,
  scores: {},
  selectedAnswerId: null,
};

export function useQuizState(quizData) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Initialize quiz when data is provided
  if (quizData && !state.data) {
    dispatch({ type: "INIT_QUIZ", data: quizData });
  }

  const checkAnswer = (answerId) => {
    dispatch({ type: "CHECK_ANSWER", answerId });
  };

  const tryAgain = () => {
    dispatch({ type: "TRY_AGAIN" });
  };

  const nextQuestion = () => {
    const isLastQuestion = state.currQuesNum === state.numQuestions - 1;

    if (isLastQuestion) {
      dispatch({ type: "SET_GAME_OVER" });
    } else {
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  const handleReset = (type) => {
    if (type === "reset") {
      tryAgain();
    } else {
      nextQuestion();
    }
  };

  return {
    state,
    checkAnswer,
    handleReset,
  };
}
