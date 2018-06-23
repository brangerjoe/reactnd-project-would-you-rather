import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { handleAddQuestionAnswer } from '../actions/shared';

class Question extends React.Component {
    state = {
        selectedOption: 'none'
    }

    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { selectedOption } = this.state;
        const { id, dispatch } = this.props;

        dispatch(handleAddQuestionAnswer(id, selectedOption));

    }

    render() {
        const { authedUser, question, user, size, id } = this.props;
        let vote = 'none';

        if (question.optionOne.votes.includes(authedUser))
            vote = 'optionOne';
        else if (question.optionTwo.votes.includes(authedUser))
            vote = 'optionTwo';

        return (
            <div>
                <Link to={`/question/${id}`} className='question'>
                    <img
                        src={user.avatarURL}
                        alt={user.name}
                        className='avatar'
                    />
                    <div className='question-info'>
                        {question.optionOne.text} or {question.optionTwo.text}
                    </div>
                </Link>
                {size === 'full' && (
                    <div>
                        {(vote === 'optionOne' || vote === 'optionTwo')
                            ? <div>
                                Results:
                                <div className={vote === 'optionOne' ? 'selected' : ''}>
                                    {question.optionOne.text}
                                </div>
                                <div className={vote === 'optionTwo' ? 'selected' : ''}>
                                    {question.optionTwo.text}
                                </div>

                            </div>
                            : <div>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        <input
                                            type="radio"
                                            value="optionOne"
                                            onChange={this.handleOptionChange}
                                            checked={this.state.selectedOption === 'optionOne'} />
                                        {question.optionOne.text}
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="optionTwo"
                                            onChange={this.handleOptionChange}
                                            checked={this.state.selectedOption === 'optionTwo'} />
                                        {question.optionTwo.text}
                                    </label>
                                    <button
                                        className='btn'
                                        type='submit'
                                        disabled={this.state.selectedOption === 'none'}>
                                        Submit
                                    </button>
                                </form>
                            </div>}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, questions, users }, { id }) => {
    const question = questions[id];

    return {
        authedUser,
        question,
        user: question ? users[question.author] : null
    }
}

export default withRouter(connect(mapStateToProps)(Question));