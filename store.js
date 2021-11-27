import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from "redux-saga";

// root reducer
const rootReducer = combineReducers({
});

// saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// root saga
function* rootSaga() {
}

// run saga middleware
sagaMiddleware.run(rootSaga);

export default store;
