import {NavigationContainer} from "@react-navigation/native";
import RootStackScreen from "./root-stack-screen/pages/RootStackScreen";
import React, {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import DrawerScreen from "./drawer-screen/pages/DrawerScreen";
import LoaderScreen from "./stack-screens/loader-screen/pages/LoaderScreen";
import {addUser} from "./stack-screens/sign-in-screen/redux/signInAction";

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    // dispatcher
    const dispatch = useDispatch();

    // selector
    const user = useSelector(state => state.signInReducer.user);

    useEffect(() => {
        getData().then((u) => {
            dispatch(addUser(u));
        });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log(e);
            // error reading value
        }
    }

    return (
        isLoading ? <LoaderScreen/> : (
            <NavigationContainer>
                {user ? <DrawerScreen/> : <RootStackScreen/>}
            </NavigationContainer>
        )
    );
};

export default Main;


