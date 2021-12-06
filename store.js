import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {spawn} from "@redux-saga/core/effects";
import signInReducer from "./screens/stack-screens/sign-in-screen/redux/signInReducer";
import signInSaga from "./screens/stack-screens/sign-in-screen/redux/signInSaga";
import signUpReducer from "./screens/stack-screens/sign-up-screen/redux/signUpReducer";
import signUpSaga from "./screens/stack-screens/sign-up-screen/redux/signUpSaga";
import postReducer from "./screens/stack-screens/post-stack-screen/redux/postReducer";
import postSaga from "./screens/stack-screens/post-stack-screen/redux/postSaga";

// root reducer
const rootReducer = combineReducers({
    signInReducer,
    signUpReducer,
    postReducer
});

// saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// root saga
function* rootSaga() {
    yield spawn(signInSaga);
    yield spawn(signUpSaga);
    yield spawn(postSaga);
}

// run saga middleware
sagaMiddleware.run(rootSaga);

export default store;
