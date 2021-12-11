import {call, put, takeLatest} from "@redux-saga/core/effects";
import {ADD_USER, GET_USER_INFO, REMOVE_USER, SET_IS_ERROR, SIGN_IN, SIGN_IN_WITH_GOOGLE} from "./signInActionType";
import {
    addUserInfo,
    addUserTrigger,
    removeUserTrigger,
    setIsErrorTrigger,
    signInFailure,
    signInSuccess
} from "./signInAction";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";

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

async function getUser(uid) {
    return await firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((data) => data);
}

async function getUserInfo(uid) {
    return await firestore()
        .collection('info')
        .doc(uid)
        .get()
        .then((data) => data);
}

async function addedUserToCollection(createdUser) {
    return firestore()
        .collection('users')
        .doc(createdUser.uid)
        .set(createdUser)
        .then(() => {
            return getUser(createdUser.uid);
        });
}

async function addUserInfoToDB(info) {
    return firestore()
        .collection('info')
        .doc(info.uid)
        .set(info)
        .then(() => {
            return getUserInfo(info.uid);
        });
}

function getSignedUserOBJ(uid, name, email, photoURL, coverPhoto) {
    return {
        uid: uid,
        name: name,
        email: email,
        photoURL: photoURL,
        coverPhoto: coverPhoto
    }
}

function getInfoOBJ(uid, firstName, lastName) {
    return {
        uid: uid,
        firstName: firstName,
        lastName: lastName,
        additionalName: '',
        headline: '',
        position: '',
        industry: '',
        education: '',
        experience: '',
        skills: '',
        country: '',
        city: '',
        phoneNumber: '',
        phoneType: '',
        address: '',
        birthday: '',
        connections: 0,
        about: 'About you',
        profileURL: 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'
    }
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

        // get user
        const existUser = yield call(getUser, user.user.uid);

        // add signed user to "users" collection
        const signedUser = getSignedUserOBJ(user.user.uid, user.user.displayName, user.user.email, existUser._data.photoURL, existUser._data.coverPhoto);

        if (user) {
            const info = yield call(getUserInfo, user.user.uid);
            yield put(signInSuccess(signedUser, 'User signed in!'));
            yield put(addUserInfo(info._data));
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

        const checkUserExists = yield call(getUser, user.user.uid);

        if (!checkUserExists._exists) {
            // add signed user to "users" collection
            const signedUser = getSignedUserOBJ(user.user.uid, user.user.displayName, user.user.email, user.user.photoURL, 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png');

            // user info
            const userName = signedUser.name.split(' ');
            const info = getInfoOBJ(user.user.uid, userName[0], userName[1]);

            // add details to users collection
            const user2 = yield call(addedUserToCollection, signedUser);
            //add details to info collection
            const usrInfo = yield call(addUserInfoToDB, info);
            if (user2) {
                yield put(signInSuccess(signedUser, 'User signed in!'));
                yield put(addUserInfo(usrInfo._data));
                addUserToAsyncStorage(signedUser).then(() => {});
            } else {
                yield put(signInFailure('Something went wrong!'));
            }
        } else {
            const info = yield call(getUserInfo, user.user.uid);
            yield put(signInSuccess(checkUserExists._data, 'User signed in!'));
            yield put(addUserInfo(info._data));
            addUserToAsyncStorage(checkUserExists._data).then(() => {});
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

function* getUserCaller(action) {
    try {
        const info = yield call(getUserInfo, action.uid);
        if (info) {
            yield put(addUserInfo(info._data));
        }
    } catch (e) {
        yield put(signInFailure(e.toString()));
    }
}

export default function* signInSaga() {
    yield takeLatest(SIGN_IN, signInCaller);
    yield takeLatest(SIGN_IN_WITH_GOOGLE, signInWithGoogleCaller);
    yield takeLatest(SET_IS_ERROR, setIsErrorCaller);
    yield takeLatest(ADD_USER, addUserCaller);
    yield takeLatest(REMOVE_USER, removeUserCaller);
    yield takeLatest(GET_USER_INFO, getUserCaller);
}
