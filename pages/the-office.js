import '../style.css';

import Layout from '../components/layout';
import Header from '../components/header';
import Question from '../components/question';
import Response from '../components/response';
import Answers from '../components/answers';

import data from '../db/the-office.json';

export default class TheOffice extends React.Component {
  state = {
    correctAnswerId: this.props.currQuesData.answer,
    classes: '',
    currQuesData: this.props.currQuesData,
    data,
    isAnswered: this.props.currQuesData.isAnswered,
    isCorrect: this.props.currQuesData.isCorrect,
    responses: this.props.currQuesData.responses,
    selectedAnswerId: null
  };

  static async getInitialProps() {
    return {
      currQuesData: Object.assign({}, data.questions[0], data.defaults)
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

  handleReset = () => {
    this.setState({
      isAnswered: false,
      isCorrect: false
    });
  };

  render() {
    const {
      classes,
      currQuesData,
      isAnswered,
      isCorrect,
      responses,
      selectedAnswerId
    } = this.state;
    // console.log(currQuesData);

    return (
      <Layout title={'The Office | Show Quizzes'}>
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
      </Layout>
    );
  }
}
