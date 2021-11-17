import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import SignInScreen from "../root-stacks/sign-in-screen/pages/SignInScreen";
import SignUpScreen from "../root-stacks/sign-up-screen/pages/SignUpScreen";

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        </RootStack.Navigator>
    );
};

export default RootStackScreen;