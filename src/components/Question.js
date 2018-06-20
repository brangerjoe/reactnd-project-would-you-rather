import React from 'react';
import { connect } from 'react-redux';

class Question extends React.Component {
    render() {
        return (
            <div>
                <span>
                    <img 
                        src={this.props.user.avatarURL} 
                        alt={this.props.user.name}
                        className='avatar'
                    />
                </span>
                Asked by {this.props.user.name}: {this.props.question.optionOne.text} or {this.props.question.optionTwo.text}
                
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, questions, users }, { id }) => {
    const question = questions[id];

    return {
        authedUser,
        question,
        user: users[question.author]
    }
}

export default connect(mapStateToProps)(Question);