import React from 'react';
import { connect } from 'react-redux';

class Leaderboard extends React.Component {
    render() {
        const { authedUser, users } = this.props;

        return (
            <div>
                <h1>Leaderboard</h1>
                {Object.keys(users).map((user) => (
                    <div key={user}>
                        <span>{users[user].name}</span>
                        <span>{users[user].questions.length} questions</span>
                        <span>{Object.keys(users[user].answers).length} answers</span>
                    </div>
                ))}
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