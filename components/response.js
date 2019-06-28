export default class Response extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { responseText, isAnswered, isCorrect, reset } = this.props;
    let tryAgain;
    let response;

    if (isAnswered && isCorrect) {
      response = responseText[1];
    } else if (isAnswered && !isCorrect) {
      response = responseText[0];
      tryAgain = (
        <span className="try-again" onClick={reset}>
          try again
        </span>
      );
    } else {
      response = responseText[2];
    }

    return (
      <div className="response">
        {response} {tryAgain}
      </div>
    );
  }
}
