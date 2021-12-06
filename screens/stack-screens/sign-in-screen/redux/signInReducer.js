// initial state
import {
    ADD_USER_INFO,
    ADD_USER_TRIGGER,
    REMOVE_USER_TRIGGER,
    SET_IS_ERROR_TRIGGER,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS
} from "./signInActionType";

const initialState = {
    user: null,
    info: null,
    successMessage: '',
    errorMessage: '',
    isError: false
}

// reducer
export default function signInReducer(state = initialState, actions) {
    switch (actions.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                user: actions.user,
                successMessage: actions.message,
                isError: false
            };
        case SIGN_IN_FAILURE:
            return {
                ...state,
                errorMessage: actions.message,
                isError: true
            };
        case SET_IS_ERROR_TRIGGER:
            return {
                ...state,
                isError: actions.isError
            };
        case ADD_USER_TRIGGER:
            return {
                ...state,
                user: actions.user
            };
        case REMOVE_USER_TRIGGER:
            return {
                ...state,
                user: null
            };
        case ADD_USER_INFO:
            return {
                ...state,
                info: actions.info,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: actions.user,
                info: actions.info
            };
        case 'UPDATE_USER_INFO':
            return {
                ...state,
                info: actions.info
            };
        case 'UPDATE_USER_PHOTO_URL':
            return {
                ...state,
                user: actions.user
            };
        default:
            return initialState;
    }
}
