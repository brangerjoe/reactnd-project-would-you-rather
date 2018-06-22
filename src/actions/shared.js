import { _getUsers, _getQuestions } from '../util/_DATA';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

// REMOVE
const AUTHED_USER = 'none';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());

        _getUsers().then((users) => {
            dispatch(receiveUsers(users));
        });

        _getQuestions().then((questions) => {
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_USER));
            dispatch(hideLoading());
        });

    }
}