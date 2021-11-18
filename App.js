/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import RootStackScreen from "./screens/root-stack-screen/pages/RootStackScreen";
import LoaderScreen from "./screens/root-stack-screen/root-stacks/loader-screen/pages/LoaderScreen";

const App: () => Node = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return (
        isLoading ? <LoaderScreen/> : (
            <NavigationContainer>
                <RootStackScreen/>
            </NavigationContainer>
        )
    );
};

export default App;
