import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends React.Component {
    state = {
        showType: 'unanswered'
    }

    setShowType(type) {
        this.setState({
            showType: type
        });
    }

    render() {
        const { showType } = this.state;
        const { questionIDs } = this.props;

        return (
            <div>
                <div className='middle'>
                    <h1>Would You Rather?</h1>
                </div>
                <div>
                    <div className='middle'>
                        <button
                            className={showType !== 'answered' ? 'button outline' : ''}
                            onClick={() => this.setShowType('answered')}>
                            Answered
                        </button>
                        <button
                            className={showType !== 'unanswered' ? 'button outline' : ''}
                            onClick={() => this.setShowType('unanswered')}>
                            Unanswered
                    </button>
                    </div>
                </div>

                <div className={showType !== 'answered' ? 'hidden' : ''}>
                    <h2>Answered:</h2>
                    {questionIDs.answeredQuestions.map((id) => (
                        <li key={id}>
                            <Question id={id} format="small" />
                        </li>
                    ))}
                </div>

                <div className={showType !== 'unanswered' ? 'hidden' : ''}>
                    <h2>Unanswered:</h2>
                    {questionIDs.unansweredQuestions.map((id) => (
                        <li key={id}>
                            <Question id={id} format="small" />
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, questions }) => {
    const qids = Object.keys(questions).sort((a, b) => {
        return questions[b].timestamp - questions[a].timestamp;
    });

    const questionIDs = {
        answeredQuestions: qids.filter((id) => (
            questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser))
        ),
        unansweredQuestions: qids.filter((id) => (
            !questions[id].optionOne.votes.includes(authedUser) && !questions[id].optionTwo.votes.includes(authedUser))
        )
    }

    return {
        authedUser,
        questionIDs
    }
}

export default connect(mapStateToProps)(QuestionList);