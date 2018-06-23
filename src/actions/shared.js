import { _getUsers, _getQuestions } from '../util/_DATA';
import { receiveUsers, addUserQuestion, addUserAnswer } from '../actions/users';
import { receiveQuestions, addQuestion, addQuestionAnswer } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';
import { _saveQuestionAnswer, _saveQuestion } from '../util/_DATA';

// REMOVE
const AUTHED_USER = 'none';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());

        Promise.all([
            _getUsers(),
            _getQuestions()
        ]).then(([users, questions]) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setAuthedUser(AUTHED_USER));
            dispatch(hideLoading());
        });
        // _getUsers().then((users) => {
        //     dispatch(receiveUsers(users));
        // });

        // _getQuestions().then((questions) => {
        //     dispatch(receiveQuestions(questions))
        //     dispatch(setAuthedUser(AUTHED_USER));
        //     dispatch(hideLoading());
        // });

    }
}

export function handleAddQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => {
            dispatch(addQuestionAnswer({ authedUser, qid, answer }));
            dispatch(addUserAnswer({ authedUser, qid, answer }));
            dispatch(hideLoading());
        });
    }
}

export function handleAddQuestion(author, optionOneText, optionTwoText) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestion({
            author,
            optionOneText,
            optionTwoText
        }).then((question) => {
            dispatch(addQuestion(question));
            //dispatch(addUserQuestion(question));
            dispatch(hideLoading());
        });
    }
}