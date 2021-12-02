import {SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from "./signUpActionType";

// initial state
const initialState = {
    user: null,
    successMessage: '',
    errorMessage: ''
}

// reducer
export default function signUpReducer(state = initialState, actions) {
    switch (actions.type) {
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                user: actions.user,
                successMessage: actions.message
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                errorMessage: actions.message
            };
        default:
            return initialState;
    }
}
