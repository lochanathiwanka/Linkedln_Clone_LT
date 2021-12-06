import {
    ADD_USER,
    ADD_USER_INFO,
    ADD_USER_TRIGGER,
    GET_USER_INFO,
    REMOVE_USER,
    REMOVE_USER_TRIGGER,
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

export function signInWithGoogle() {
    return {
        type: SIGN_IN_WITH_GOOGLE
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

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export function addUserTrigger(user) {
    return {
        type: ADD_USER_TRIGGER,
        user
    }
}

export function removeUser() {
    return {
        type: REMOVE_USER
    }
}

export function removeUserTrigger() {
    return {
        type: REMOVE_USER_TRIGGER
    }
}

export function addUserInfo(info) {
    return {
        type: ADD_USER_INFO,
        info
    }
}

export function getUserInfo(uid) {
    return {
        type: GET_USER_INFO,
        uid
    }
}

