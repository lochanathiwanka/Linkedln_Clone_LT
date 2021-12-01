import React from 'react';
import {Button, Text, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import {removeUser} from "../../../../root-stack-screen/root-stacks/sign-in-screen/redux/signInAction";

const JobsScreen = () => {
    // dispatcher
    const dispatch = useDispatch();

    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('user');
            dispatch(removeUser());
        } catch(e) {
            console.log(e);
            // remove error
        }
        console.log('Done.');
    }

    return (
        <View>
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

