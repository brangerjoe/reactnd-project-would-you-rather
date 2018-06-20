import { _getUsers, _getQuestions } from '../util/_DATA';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';

// REMOVE
const AUTHED_USER = 'tylermcginnis';

export function handleInitialData() {
    return (dispatch) => {
        _getUsers().then((users) => {
            dispatch(receiveUsers(users));
        });

        _getQuestions().then((questions) => {
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_USER));
        });

    }
}