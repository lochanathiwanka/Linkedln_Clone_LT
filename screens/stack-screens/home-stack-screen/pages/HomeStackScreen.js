import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import HeaderComp from "../../../../components/header-comp/HeaderComp";
import {Context} from "../../../../components/context/Context";

const HomeScreen = ({navigation}) => {
    // selector
    const user = useSelector(state => state.signInReducer.user);

    const setIsShowTabMenu = useContext(Context);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsShowTabMenu('flex');
        });
        return () => unsubscribe;
    }, [navigation]);

    return (
        <View>
            <HeaderComp imageURL={user.photoURL ? user.photoURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'} navigation={navigation}/>
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
