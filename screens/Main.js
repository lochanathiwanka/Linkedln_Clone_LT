import LoaderScreen from "./root-stack-screen/root-stacks/loader-screen/pages/LoaderScreen";
import {NavigationContainer} from "@react-navigation/native";
import RootStackScreen from "./root-stack-screen/pages/RootStackScreen";
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    // selector
    const user = useSelector(state => state.signInReducer.user);

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

export default Main;


