import {call, put, takeLatest} from "@redux-saga/core/effects";
import {ADD_USER, REMOVE_USER, SET_IS_ERROR, SIGN_IN, SIGN_IN_WITH_GOOGLE} from "./signInActionType";
import {addUserTrigger, removeUserTrigger, setIsErrorTrigger, signInFailure, signInSuccess} from "./signInAction";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

function userSignIn(email, password) {
    return auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedUser) => {
            return signedUser;
        })
        .catch(error => {
            if (error.code === 'auth/user-not-found') {
                throw 'User not found!';
            } else if (error.code === 'auth/wrong-password') {
                throw 'Password is not matched!';
            } else {
                throw 'Something went wrong!';
            }
        });
}

async function userSignInWithGoogle() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential).then((user) => user).catch((e) => {
        throw e;
    });
}

function* signInCaller(action) {
    try {
        // user sign in
        const user = yield call(userSignIn, action.data.email, action.data.password);

        // add signed user to "users" collection
        const signedUser = {
            uid: user.user.uid,
            name: user.user.displayName,
            email: user.user.email,
            photoURL: user.user.photoURL
        }

        if (user) {
            yield put(signInSuccess(signedUser, 'User signed in!'));
            addUserToAsyncStorage(signedUser).then(() => {});
        }
    } catch (e) {
        yield put(signInFailure(e.toString()));
    }
}

function* signInWithGoogleCaller() {
    try {
        // user sign in
        const user = yield call(userSignInWithGoogle);

        // add signed user to "users" collection
        const signedUser = {
            uid: user.user.uid,
            name: user.user.displayName,
            email: user.user.email,
            photoURL: user.user.photoURL
        }

        if (user) {
            yield put(signInSuccess(signedUser, 'User signed in!'));
            addUserToAsyncStorage(signedUser).then(() => {});
        }
    } catch (e) {
        yield put(signInFailure(e.toString()));
    }
}

async function addUserToAsyncStorage(user) {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
        console.log(e);
        put(signInFailure(e.toString()));
    }
}

function* setIsErrorCaller(action) {
    yield put(setIsErrorTrigger(action.isError));
}

function* addUserCaller(action) {
    yield put(addUserTrigger(action.user));
}

function* removeUserCaller() {
    yield put(removeUserTrigger());
}

export default function* signInSaga() {
    yield takeLatest(SIGN_IN, signInCaller);
    yield takeLatest(SIGN_IN_WITH_GOOGLE, signInWithGoogleCaller);
    yield takeLatest(SET_IS_ERROR, setIsErrorCaller);
    yield takeLatest(ADD_USER, addUserCaller);
    yield takeLatest(REMOVE_USER, removeUserCaller);
}
