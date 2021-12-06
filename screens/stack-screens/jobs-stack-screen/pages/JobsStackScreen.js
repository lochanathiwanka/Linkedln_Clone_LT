import React, {useContext, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../sign-in-screen/redux/signInAction";
import auth from "@react-native-firebase/auth";
import HeaderComp from "../../../../components/header-comp/HeaderComp";
import {Context} from "../../../../components/context/Context";

const JobsScreen = ({navigation}) => {
    // dispatcher
    const dispatch = useDispatch();

    // selector
    const user = useSelector(state => state.signInReducer.user);
    const setIsShowTabMenu = useContext(Context);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsShowTabMenu('flex');
        });
        return () => unsubscribe;
    }, [navigation]);

    const removeValue = async () => {
        try {
            auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            await AsyncStorage.removeItem('user');
            dispatch(removeUser());
        } catch(e) {
            console.log(e);
            // remove error
        }
    }

    return (
        <View>
            <HeaderComp imageURL={user.photoURL ? user.photoURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'} navigation={navigation}/>
            <Text>
                Jobs
            </Text>
            <Button title="Click" onPress={removeValue}/>
        </View>
    );
};

const JobsStack = createStackNavigator();

const JobsStackScreen = () => {
    return (
        <JobsStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <JobsStack.Screen name='JobsStack' component={JobsScreen}/>
        </JobsStack.Navigator>
    );
};

export default JobsStackScreen;

