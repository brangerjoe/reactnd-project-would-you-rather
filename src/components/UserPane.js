import React from 'react';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser';

class UserPane extends React.Component {
    handleLogout = () => {
        const { dispatch } = this.props;

        dispatch(setAuthedUser('none'));
    }

    render() {
        const { authedUser, users } = this.props;

        return (
            <div>
                {authedUser !== 'none' &&
                    <div className='userpane'>
                        <div>
                            Welcome, {users[authedUser].name}! | <a href='#' onClick={this.handleLogout}>Log out</a>
                        </div>
                    </div>}
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

export default connect(mapStateToProps)(UserPane);