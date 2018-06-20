import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends React.Component {
    render() {
        return (
            <div>
                <h1>Question List</h1>
                AuthedUser: {this.props.authedUser}
                {console.log("Questions", this.props.answeredQuestions)}
                <h2>Answered:</h2>
                {this.props.answeredQuestions.map((id) => (
                    <li key={id}>
                        <Question id={id} />
                    </li>
                ))}
                <h2>Unanaswered:</h2>
                {this.props.unansweredQuestions.map((id) => (
                    <li key={id}>
                        <Question id={id} />
                    </li>
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, questions }) => {
    // const unansweredQuestionIDs = questions.filter((question) => (question.optionOne.votes.includes(authedUser)))
    // console.log(questions);
    // const questionIDs = {
    //     answered: Object.keys(questions.filter((question) => {
    //         question.optionOne.votes.includes(authedUser) || question.optionOne.votes.includes(authedUser)
    //     }))
    // }

    const questionIDs = Object.keys(questions);
    const answeredQuestions = questionIDs.filter((id) => (
        questions[id].optionOne.votes.includes(authedUser) || questions[id].optionOne.votes.includes(authedUser)
    ));

    const unansweredQuestions = questionIDs.filter((id) => (
        !questions[id].optionOne.votes.includes(authedUser) && !questions[id].optionOne.votes.includes(authedUser)
    ));

    return {
        // unansweredQuestionIDs,
        // answeredQuestionIDs
        authedUser,
        answeredQuestions,
        unansweredQuestions
    }
}

export default connect(mapStateToProps)(QuestionList);