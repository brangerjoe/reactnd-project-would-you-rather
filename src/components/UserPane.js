import React from 'react';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser';

class UserPane extends React.Component {
    handleLogout = () => {
        const { dispatch } = this.props;

        dispatch(setAuthedUser('none'));
    }

    render() {
        const { authedUser } = this.props;

        return (
            <div>
                {authedUser !== 'none' &&
                    <div>
                        Welcome, {authedUser}!
                        <button onClick={this.handleLogout}>
                            Log out
                        </button>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(UserPane);