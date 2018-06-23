import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Button from '@material-ui/core/Button';

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
        const { authedUser, questionIDs } = this.props;

        return (
            <div>
                <div className='middle'>
                    <h1>Would You Rather?</h1>
                </div>
                AuthedUser: {authedUser}
                <div>
                    <div className='middle'>
                        <Button
                            color={showType !== 'answered' ? 'default' : 'primary'}
                            variant='flat'
                            onClick={() => this.setShowType('answered')}>
                            Answered
                        </Button>
                        <Button
                            color={showType !== 'unanswered' ? 'default' : 'primary'}
                            variant='flat'
                            onClick={() => this.setShowType('unanswered')}>
                            Unanswered
                    </Button>
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