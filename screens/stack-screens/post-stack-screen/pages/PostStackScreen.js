import React from 'react';
import {View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import HeaderComp from "../../../../components/header-comp/HeaderComp";

const PostScreen = () => {
    // selector
    const user = useSelector(state => state.signInReducer.user);

    return (
        <View>
            <HeaderComp imageURL={user.photoURL}/>
        </View>
    );
};

const PostStack = createStackNavigator();

const PostStackScreen = () => {
    return (
        <PostStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <PostStack.Screen name="PostStack" component={PostScreen}/>
        </PostStack.Navigator>
    );
};

export default PostStackScreen;

