export default class Response extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { responseText, isAnswered, isCorrect, reset } = this.props;
    let $reset;
    let response;

    if (isAnswered && isCorrect) {
      response = responseText[1];

      $reset = (
        <span className="reset" onClick={() => reset('next')}>
          next question.
        </span>
      );
    } else if (isAnswered && !isCorrect) {
      response = responseText[0];
      $reset = (
        <span className="reset" onClick={() => reset('reset')}>
          try again.
        </span>
      );
    } else {
      response = responseText[2];
    }

    return (
      <div className="response">
        {response} {$reset}
      </div>
    );
  }
}
