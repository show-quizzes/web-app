export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESPONSE':
      return Object.assign({}, state, {
        response: state.responses[action.response]
      });
    case 'RESET':
      return Object.assign({}, state, {
        isAnswered: false,
        isCorrect: false
      })
    default:
      return state;
  }
};
