import {SET_IS_ERROR_TRIGGER, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from "./signUpActionType";

// initial state
const initialState = {
    user: null,
    info: null,
    successMessage: '',
    errorMessage: '',
    isError: false
}

// reducer
export default function signUpReducer(state = initialState, actions) {
    switch (actions.type) {
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                user: actions.user,
                info: actions.info,
                successMessage: actions.message,
                isError: false
            };
        case SIGN_UP_FAILURE:
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
