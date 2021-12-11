import {NavigationContainer} from "@react-navigation/native";
import RootStackScreen from "./root-stack-screen/pages/RootStackScreen";
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import DrawerScreen from "./drawer-screen/pages/DrawerScreen";
import LoaderScreen from "./stack-screens/loader-screen/pages/LoaderScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addUser, getUserInfo} from "./stack-screens/sign-in-screen/redux/signInAction";

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    // dispatcher
    const dispatch = useDispatch();

    // selector
    const user = useSelector(state => state.signInReducer.user);

    useEffect(() => {
        /*getData().then((u) => {
            u && dispatch(getUserInfo(u.uid));
            u && dispatch(addUser(u));
            setIsLoading(false);
        }).catch(e => {
            console.log('useEffect: ', e);
        });*/
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user');
                // return jsonValue != null ? JSON.parse(jsonValue) : null;
                if (jsonValue != null) {
                    const u = JSON.parse(jsonValue);
                    u && dispatch(getUserInfo(u.uid));
                    u && dispatch(addUser(u));
                    setIsLoading(false);
                }
                setIsLoading(false);
            } catch(e) {
                console.log('getData: ', e);
                // error reading value
            }
        }
        getData().then(() => {});
    }, []);

    return (
        isLoading ? <LoaderScreen/> : (
            <NavigationContainer>
                {user ? <DrawerScreen/> : <RootStackScreen/>}
            </NavigationContainer>
        )
    );
};

export default Main;


