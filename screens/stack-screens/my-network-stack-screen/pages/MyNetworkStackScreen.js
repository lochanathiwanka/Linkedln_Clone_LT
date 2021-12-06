import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import HeaderComp from "../../../../components/header-comp/HeaderComp";
import {useSelector} from "react-redux";
import {Context} from "../../../../components/context/Context";

const MyNetworkScreen = ({navigation}) => {
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

