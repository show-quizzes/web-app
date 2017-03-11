/* eslint no-underscore-dangle: "off" */

export const isCorrect = () => ({
  type: 'IS_CORRECT'
});

export const setResponse = (response) => ({
  type: 'SET_RESPONSE',
  response
});

export const reset = () => ({
  type: 'RESET'
});
