import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import SignInScreen from "../root-stacks/sign-in-screen/pages/SignInScreen";
import SignUpScreen from "../root-stacks/sign-up-screen/pages/SignUpScreen";

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
        <RootStack.Navigator
            headerMode="none"
            screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
            <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        </RootStack.Navigator>
    );
};

export default RootStackScreen;
