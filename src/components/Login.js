import React from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends React.Component {
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
        this.props.dispatch(setAuthedUser(this.state.selectedOption));
        console.log('logging in:', this.state.selectedOption)
    }

    render() {
        const { selectedOption } = this.state;
        const { users } = this.props;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {Object.keys(users).map((user) => (
                        <div key={user}>
                            <input
                                type="radio"
                                value={user}
                                onChange={this.handleOptionChange}
                                checked={selectedOption === user} />
                            {users[user].name}
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login);