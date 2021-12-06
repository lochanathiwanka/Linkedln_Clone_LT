/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import type {Node} from 'react';
import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import Main from "./screens/Main";

const App: () => Node = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>
    );
};

export default App;
