import {
    SET_IS_ERROR,
    SET_IS_ERROR_TRIGGER,
    SIGN_UP,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
    SIGN_UP_WITH_GOOGLE
} from "./signUpActionType";

export function signUp(data, userName) {
    return {
        type: SIGN_UP,
        data,
        userName
    }
}

export function signUpWithGoogle() {
    return {
        type: SIGN_UP_WITH_GOOGLE
    }
}

export function signUpSuccess(user, info, message) {
    return {
        type: SIGN_UP_SUCCESS,
        user,
        info,
        message
    }
}

export function signUpFailure(message) {
    return {
        type: SIGN_UP_FAILURE,
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
