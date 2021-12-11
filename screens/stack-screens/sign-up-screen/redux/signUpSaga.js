import {call, put, takeLatest} from "@redux-saga/core/effects";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import {SET_IS_ERROR, SIGN_UP, SIGN_UP_WITH_GOOGLE} from "./signUpActionType";
import {setIsErrorTrigger, signUpFailure, signUpSuccess} from "./signUpAction";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {signInSuccess} from "../../sign-in-screen/redux/signInAction";

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
                throw 'That email address is already in use!';
            } else if (error.code === 'auth/invalid-email') {
                throw 'That email address is invalid!';
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

function addedUserToCollection(createdUser) {
    return firestore()
        .collection('users')
        .doc(createdUser.uid)
        .set(createdUser)
        .then(() => {
            return getUser(createdUser.uid);
        });
}

function addUserInfo(info) {
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

function* signUpCaller(action) {
    try {
        // user sign up
        const user = yield call(userSignUp, action.data.email, action.data.password, action.userName);

        // add signed user to "users" collection
        const createdUser = getSignedUserOBJ(user.user.uid, action.userName.firstName+' '+action.userName.lastName, user.user.email, 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png', 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png');

        // user info
        const info = getInfoOBJ(user.user.uid, action.userName.firstName, action.userName.lastName);

        if (user) {
            try {
                // add details to users collection
                const user2 = yield call(addedUserToCollection, createdUser);
                //add details to info collection
                yield call(addUserInfo, info);
                if (user2) {
                    yield put(signUpSuccess(null, null, 'User signed up!'));
                } else {
                    yield put(signUpFailure('Something went wrong!'));
                }
            } catch (e) {
                yield put(signUpFailure(e.toString()));
            }
        }
    } catch (e) {
        yield put(signUpFailure(e.toString()));
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

function* signUpWithGoogleCaller() {
    try {
        // user sign in
        const user = yield call(userSignInWithGoogle);

        const checkUserExists = yield call(getUser, user.user.uid);

        if (!checkUserExists._exists) {
            // add signed user to "users" collection
            const signedUser = getSignedUserOBJ(user.user.uid, user.user.displayName, user.user.email, user.user.photoURL);

            // user info
            const userName = signedUser.name.split(' ');
            const info = getInfoOBJ(user.user.uid, userName[0], userName[1]);

            // add details to users collection
            const user2 = yield call(addedUserToCollection, signedUser);
            //add details to info collection
            yield call(addUserInfo, info);
            if (user2) {
                yield put(signInSuccess(signedUser, 'User signed in!'));
                addUserToAsyncStorage(signedUser).then(() => {});
            } else {
                yield put(signUpFailure('Something went wrong!'));
            }
        }
    } catch (e) {
        yield put(signUpFailure(e.toString()));
    }
}

async function addUserToAsyncStorage(user) {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
        console.log(e);
        put(signUpFailure(e.toString()));
    }
}

function* setIsErrorCaller(action) {
    yield put(setIsErrorTrigger(action.isError));
}

export default function* signUpSaga() {
    yield takeLatest(SIGN_UP, signUpCaller);
    yield takeLatest(SIGN_UP_WITH_GOOGLE, signUpWithGoogleCaller);
    yield takeLatest(SET_IS_ERROR, setIsErrorCaller);
}
