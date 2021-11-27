import {
    SET_IS_ERROR,
    SET_IS_ERROR_TRIGGER,
    SIGN_IN,
    SIGN_IN_FAILURE,
    SIGN_IN_SUCCESS,
    SIGN_IN_WITH_GOOGLE
} from "./signInActionType";

export function signIn(data) {
    return {
        type: SIGN_IN,
        data
    }
}

export function signInWithGoogle(data) {
    return {
        type: SIGN_IN_WITH_GOOGLE,
        data
    }
}

export function signInSuccess(user, message) {
    return {
        type: SIGN_IN_SUCCESS,
        user,
        message
    }
}

export function signInFailure(message) {
    return {
        type: SIGN_IN_FAILURE,
        message
    }
}

export function setIsError(isError) {
    return {
        type: SET_IS_ERROR,
        isError
    }
}

export function setIsErrorTrigger(isError) {
    return {
        type: SET_IS_ERROR_TRIGGER,
        isError
    }
}
