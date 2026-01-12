import theOfficeData from "./data/the-office.json";

export const quizRegistry = {
  "the-office": {
    id: "the-office",
    title: "The Office",
    data: theOfficeData,
  },
};

export function getQuizData(quizId) {
  return quizRegistry[quizId] || null;
}

export function getAllQuizzes() {
  return Object.values(quizRegistry);
}
