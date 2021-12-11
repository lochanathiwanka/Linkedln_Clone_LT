import {call, takeLatest} from "@redux-saga/core/effects";
import {ADD_POST, VIEW_ALL_POSTS} from "./postActionType";
import firestore from "@react-native-firebase/firestore";

function getAllPosts() {
    return firestore()
        .collection('posts')
        .get()
        .then((data) => data);
}

function getPosts(uid) {
    return firestore()
        .collection('posts')
        .doc(uid)
        .get()
        .then((data) => data);
}

function addPostToCollection(post) {
    return firestore()
        .collection('posts')
        .add(post)
        .then(() => {
            return getPosts(post.uid);
        });
}

function* addPostCaller(action) {
    try {
        yield call(addPostToCollection, action.post);
    } catch (e) {
        console.log(e);
    }
}

function* viewPostsCaller() {
    try {
        const posts = yield call(getAllPosts);
        console.log(posts._docs._data);
        /*if (posts) {
            yield put(viewAllPostTrigger(posts));
        }*/
    } catch (e) {
        console.log(e);
    }
}


export default function* postSaga() {
    yield takeLatest(ADD_POST, addPostCaller);
    yield takeLatest(VIEW_ALL_POSTS, viewPostsCaller);
}
