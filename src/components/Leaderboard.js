import React from 'react';
import { connect } from 'react-redux';

class Leaderboard extends React.Component {
    render() {
        const { authedUser, users } = this.props;

        return (
            <div>
                <h1>Leaderboard</h1>
                <table className="bordered">
                    <tbody>
                        {Object.keys(users)
                            .sort((a, b) => {
                                return (Object.keys(users[b].answers).length + users[b].questions.length) -
                                    (Object.keys(users[a].answers).length + users[a].questions.length)
                            })
                            .map((user, index) => {
                                const { name, questions, answers } = users[user];
                                const questionCount = questions.length;
                                const answerCount = Object.keys(answers).length;

                                return (
                                    <tr key={user} className={user === authedUser ? 'leaderboard-selected' : ''}>
                                        <td className="w10">{index + 1}</td>
                                        <td className="w30">{name}</td>
                                        <td className="w20">{questionCount} questions</td>
                                        <td className="w20">{answerCount} answers</td>
                                        <td className="w20">{questionCount + answerCount} total</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Leaderboard);