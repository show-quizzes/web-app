import '../style.css';

import Layout from '../components/layout';
import Header from '../components/header';
import Question from '../components/question';
import Response from '../components/response';
import Answers from '../components/answers';

import data from '../db/the-office.json';

export default class TheOffice extends React.Component {
  state = {
    currQuesData: this.props.currQuesData,
    data,
    isAnswered: this.props.currQuesData.isAnswered,
    isCorrect: this.props.currQuesData.isCorrect,
    responses: this.props.currQuesData.responses
  };

  static async getInitialProps() {
    return {
      currQuesData: Object.assign({}, data.questions[0], data.defaults)
    };
  }

  handleAnswer = (answered, correct) => {
    this.setState({
      isAnswered: answered,
      isCorrect: correct
    });
  };

  handleReset = () => {
    this.setState({
      isAnswered: false,
      isCorrect: false
    });
  };

  render() {
    const { currQuesData, isAnswered, isCorrect, responses } = this.state;
    console.log(currQuesData);

    return (
      <Layout title={'The Office | Show Quizzes'}>
        <Header {...currQuesData} />
        <Question {...currQuesData} />
        <Answers
          {...currQuesData}
          handleAnswer={this.handleAnswer}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
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
