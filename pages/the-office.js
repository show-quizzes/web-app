import '../style.css';

import Answers from '../components/answers';
import Header from '../components/header';
import Layout from '../components/layout';
import Progress from '../components/progress';
import Question from '../components/question';
import Response from '../components/response';
import Results from '../components/results';

import data from '../db/the-office.json';

export default class TheOffice extends React.Component {
  state = {
    classes: '',
    correctAnswerId: this.props.currQuesData.answer,
    currQuesData: this.props.currQuesData,
    currQuesNum: this.props.currQuesNum,
    data,
    gameOver: false,
    isAnswered: this.props.currQuesData.isAnswered,
    isCorrect: this.props.currQuesData.isCorrect,
    numQuestions: this.props.numQuestions,
    numRightAnswers: null,
    responses: this.props.currQuesData.responses,
    scoreAsPct: null,
    scores: {},
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

    this.aggregateScore(index);
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
      this.computeFinalScore();
      return;
    }

    this.setState(
      state => ({ currQuesNum: state.currQuesNum + 1 }),
      this.updateData
    );
  };

  aggregateScore = answerIndex => {
    const { correctAnswerId, currQuesNum, scores } = this.state;
    const correctAnswer = answerIndex === correctAnswerId;

    if (!scores[currQuesNum]) {
      if (correctAnswer) {
        scores[currQuesNum] = 'correct';
      } else {
        scores[currQuesNum] = 'incorrect';
      }
    }
  };

  computeFinalScore = () => {
    const numRightAnswers = Object.values(this.state.scores).filter(score => {
      return score === 'correct';
    }).length;

    this.setState({
      scoreAsPct: ((numRightAnswers / this.state.numQuestions) * 100).toFixed(
        1
      ),
      numRightAnswers
    });
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
      numRightAnswers,
      responses,
      scoreAsPct,
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
          <Results
            numRightAnswers={numRightAnswers}
            numQuestions={numQuestions}
            scoreAsPct={scoreAsPct}
          />
        )}
      </Layout>
    );
  }
}
