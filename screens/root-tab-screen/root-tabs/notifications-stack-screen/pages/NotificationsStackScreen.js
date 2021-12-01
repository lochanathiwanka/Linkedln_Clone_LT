import React from 'react';
import {Text, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";

const NotificationsScreen = () => {
    return (
        <View>
            <Text>
                Notifications
            </Text>
        </View>
    );
};

const NotificationsStack = createStackNavigator();

const NotificationsStackScreen = () => {
    return (
        <NotificationsStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <NotificationsStack.Screen name='NotificationsStack' component={NotificationsScreen}/>
        </NotificationsStack.Navigator>
    );
};

export default NotificationsStackScreen;

