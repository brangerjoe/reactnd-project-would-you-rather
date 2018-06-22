import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { withRouter } from 'react-router-dom';

class NewQuestion extends React.Component {
    state = {
        questionOne: '',
        questionTwo: ''
    }

    handleOptionChange = (e, question) => {
        this.setState({
            [question]: e.target.value
        });
    }

    handleSubmit = (e) => {
        const { questionOne, questionTwo } = this.state;
        const { dispatch, authedUser } = this.props;

        e.preventDefault();

        dispatch(handleAddQuestion(authedUser, questionOne, questionTwo))
            .then(() => {
                this.props.history.push('/');
            });
        this.setState({
            questionOne: '',
            questionTwo: ''
        });
    }

    render() {
        return (
            <div>
                <h1>New</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.questionOne} onChange={(e) => this.handleOptionChange(e, 'questionOne')} />
                    <input type='text' value={this.state.questionTwo} onChange={(e) => this.handleOptionChange(e, 'questionTwo')} />
                    <button
                        type='submit'
                        disabled={this.state.questionOne === '' || this.state.questionTwo === ''}>
                        Submit
                     </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion));