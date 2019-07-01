import '../style.css';

import Answers from '../components/answers';
import Header from '../components/header';
import Layout from '../components/layout';
import Progress from '../components/progress';
import Question from '../components/question';
import Response from '../components/response';

import data from '../db/the-office.json';

export default class TheOffice extends React.Component {
  state = {
    correctAnswerId: this.props.currQuesData.answer,
    classes: '',
    currQuesData: this.props.currQuesData,
    currQuesNum: this.props.currQuesNum,
    data,
    gameOver: false,
    isAnswered: this.props.currQuesData.isAnswered,
    isCorrect: this.props.currQuesData.isCorrect,
    numQuestions: this.props.numQuestions,
    responses: this.props.currQuesData.responses,
    selectedAnswerId: null
  };

  static async getInitialProps() {
    return {
      currQuesData: Object.assign({}, data.questions[0], data.defaults),
      currQuesNum: 0,
      numQuestions: data.questions.length
    };
  }

  handleAnswer = (answered, index) => {
    this.setState({
      classes:
        index === this.state.correctAnswerId
          ? 'answer correct'
          : 'answer incorrect',
      isAnswered: answered,
      isCorrect: index === this.state.correctAnswerId ? true : false,
      selectedAnswerId: index
    });
  };

  handleReset = type => {
    if (type === 'reset') {
      this.setState({
        isAnswered: false,
        isCorrect: false
      });
    } else {
      this.loadNextQuestion();
    }
  };

  loadNextQuestion = () => {
    if (this.state.currQuesNum === this.state.numQuestions - 1) {
      this.setState({ gameOver: true });
      return;
    }

    this.setState(
      state => ({ currQuesNum: state.currQuesNum + 1 }),
      this.updateData
    );
  };

  updateData() {
    this.setState({
      correctAnswerId: this.state.data.questions[this.state.currQuesNum].answer,
      classes: '',
      currQuesData: this.state.data.questions[this.state.currQuesNum],
      isAnswered: false,
      isCorrect: false
    });
  }

  render() {
    const {
      classes,
      currQuesData,
      currQuesNum,
      gameOver,
      isAnswered,
      isCorrect,
      numQuestions,
      responses,
      selectedAnswerId
    } = this.state;

    return (
      <Layout title={'The Office | Show Quizzes'}>
        {!gameOver ? (
          <>
            <Header {...currQuesData} />
            <Question {...currQuesData} />
            <Answers
              {...currQuesData}
              classes={classes}
              handleAnswer={this.handleAnswer}
              isAnswered={isAnswered}
              selectedAnswerId={selectedAnswerId}
            />
            <Response
              isAnswered={isAnswered}
              isCorrect={isCorrect}
              reset={this.handleReset}
              responseText={responses}
            />
            <Progress currQuesNum={currQuesNum} numQuestions={numQuestions} />
          </>
        ) : (
          <div>
            The game is now over. Thank you for playing! (Stats of how you did
            to come...)
          </div>
        )}
      </Layout>
    );
  }
}
