import {SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_WITH_GOOGLE} from "./signUpActionType";

export function signUp(data, userName) {
    return {
        type: SIGN_UP,
        data,
        userName
    }
}

export function signUpWithGoogle(data) {
    return {
        type: SIGN_UP_WITH_GOOGLE,
        data
    }
}

export function signUpSuccess(user, message) {
    return {
        type: SIGN_UP_SUCCESS,
        user,
        message
    }
}

export function signUpFailure(message) {
    return {
        type: SIGN_UP_FAILURE,
        message
    }
}
