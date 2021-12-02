import {call, put, takeLatest} from "@redux-saga/core/effects";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import {SIGN_UP, SIGN_UP_WITH_GOOGLE} from "./signUpActionType";
import {signUpFailure, signUpSuccess} from "./signUpAction";

function userSignUp(email, password, userName){
    return auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
            createdUser.user.updateProfile({
                displayName: userName.firstName + ' ' + userName.lastName
            }).then(() => '');
            return createdUser;
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
                throw 'That email address is already in use!';
            }

            if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
                throw 'That email address is invalid!';
            }
        });
}

function addedUserToCollection(createdUser) {
    return firestore()
        .collection('users')
        .doc(createdUser.uid)
        .set(createdUser)
        .then((data) => data)
}

function* signUpCaller(action) {
    try {
        // user sign up
        const user = yield call(userSignUp, action.data.email, action.data.password, action.userName);

        // add signed user to "users" collection
        console.log(user);
        const createdUser = {
            uid: user.user.uid,
            name: action.userName.firstName+' '+action.userName.lastName,
            email: user.user.email,
            photoURL: user.user.photoURL
        }

        if (user) {
            try {
                const user2 = yield call(addedUserToCollection, createdUser);
                if (user2) {
                    yield put(signUpSuccess(createdUser, 'User signed up!'));
                }
            } catch (e) {
                yield put(signUpFailure(e.toString()));
            }
        }
    } catch (e) {
        console.log(e);
        yield put(signUpFailure(e.toString()));
    }
}

function* signUpWithGoogleCaller(data) {
    try {
        yield put(signUpSuccess(data, 'Success'));
    } catch (e) {
        yield put(signUpFailure(e.toString()));
    }
}

export default function* signUpSaga() {
    yield takeLatest(SIGN_UP, signUpCaller);
    yield takeLatest(SIGN_UP_WITH_GOOGLE, signUpWithGoogleCaller);
}
