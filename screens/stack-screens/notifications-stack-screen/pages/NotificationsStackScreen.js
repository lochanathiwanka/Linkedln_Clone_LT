import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import HeaderComp from "../../../../components/header-comp/HeaderComp";
import {useSelector} from "react-redux";
import {Context} from "../../../../components/context/Context";

const NotificationsScreen = ({navigation}) => {
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

