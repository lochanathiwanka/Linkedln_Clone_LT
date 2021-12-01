import React from 'react';
import {View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import HeaderComp from "../../../../../components/header-comp/HeaderComp";
import {useSelector} from "react-redux";

const HomeScreen = ({navigation}) => {
    // selector
    const user = useSelector(state => state.signInReducer.user);

    return (
        <View>
            <HeaderComp imageURL={user.photoURL} navigation={navigation}/>
        </View>
    );
};

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <HomeStack.Screen name='HomeStack' component={HomeScreen}/>
    </HomeStack.Navigator>
);

export default HomeStackScreen;
