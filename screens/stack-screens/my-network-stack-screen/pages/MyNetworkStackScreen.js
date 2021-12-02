import React from 'react';
import {Text, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";

const MyNetworkScreen = () => {
    return (
        <View>
            <Text>
                My Network
            </Text>
        </View>
    );
};

const MyNetworkStack = createStackNavigator();

const MyNetworkStackScreen = () => {
    return (
        <MyNetworkStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <MyNetworkStack.Screen name='MyNetworkStack' component={MyNetworkScreen}/>
        </MyNetworkStack.Navigator>
    );
};

export default MyNetworkStackScreen;

