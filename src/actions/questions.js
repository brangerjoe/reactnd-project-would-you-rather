import { _saveQuestionAnswer, _saveQuestion } from '../util/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
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
            dispatch(hideLoading());
        });
    }
}

function addQuestionAnswer({ authedUser, qid, answer }) {
    return {
        type: 'ADD_QUESTION_ANSWER',
        authedUser,
        qid,
        answer
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
            dispatch(hideLoading());
        });
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}