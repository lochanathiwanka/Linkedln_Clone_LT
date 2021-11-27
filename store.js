import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {spawn} from "@redux-saga/core/effects";
import signInReducer from "./screens/root-stack-screen/root-stacks/sign-in-screen/redux/signInReducer";
import signInSaga from "./screens/root-stack-screen/root-stacks/sign-in-screen/redux/signInSaga";

// root reducer
const rootReducer = combineReducers({
    signInReducer,
});

// saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// root saga
function* rootSaga() {
    yield spawn(signInSaga);
}

// run saga middleware
sagaMiddleware.run(rootSaga);

export default store;
