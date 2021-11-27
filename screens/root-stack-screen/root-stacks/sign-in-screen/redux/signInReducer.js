// initial state
import {SET_IS_ERROR_TRIGGER, SIGN_IN_FAILURE, SIGN_IN_SUCCESS} from "./signInActionType";

const initialState = {
    user: null,
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
        default:
            return initialState;
    }
}
