import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {spawn} from "@redux-saga/core/effects";
import signInReducer from "./screens/stack-screens/sign-in-screen/redux/signInReducer";
import signInSaga from "./screens/stack-screens/sign-in-screen/redux/signInSaga";
import signUpReducer from "./screens/stack-screens/sign-up-screen/redux/signUpReducer";
import signUpSaga from "./screens/stack-screens/sign-up-screen/redux/signUpSaga";

// root reducer
const rootReducer = combineReducers({
    signInReducer,
    signUpReducer
});

// saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// root saga
function* rootSaga() {
    yield spawn(signInSaga);
    yield spawn(signUpSaga);
}

// run saga middleware
sagaMiddleware.run(rootSaga);

export default store;
