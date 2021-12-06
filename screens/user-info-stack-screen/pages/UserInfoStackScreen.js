import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import ProfileScreen from "../../stack-screens/profile-screen/pages/ProfileScreen";
import EditIntroScreen from "../../stack-screens/edit-intro-screen/pages/EditIntroScreen";
import EditAboutScreen from "../../stack-screens/edit-about-screen/pages/EditAboutScreen";

const UserInfoStack = createStackNavigator();

const UserInfoStackScreen = () => {
    return (
        <UserInfoStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <UserInfoStack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <UserInfoStack.Screen name="EditIntroScreen" component={EditIntroScreen}/>
            <UserInfoStack.Screen name="EditAboutScreen" component={EditAboutScreen}/>
        </UserInfoStack.Navigator>
    );
};

export default UserInfoStackScreen;
