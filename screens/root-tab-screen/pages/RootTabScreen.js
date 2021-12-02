import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text} from "react-native";
import {CardStyleInterpolators} from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStackScreen from "../../stack-screens/home-stack-screen/pages/HomeStackScreen";
import MyNetworkStackScreen from "../../stack-screens/my-network-stack-screen/pages/MyNetworkStackScreen";
import PostStackScreen from "../../stack-screens/post-stack-screen/pages/PostStackScreen";
import NotificationsStackScreen from "../../stack-screens/notifications-stack-screen/pages/NotificationsStackScreen";
import JobsStackScreen from "../../stack-screens/jobs-stack-screen/pages/JobsStackScreen";

const RootTab = createBottomTabNavigator();

const RootTabScreen = () => {
    return (
        <RootTab.Navigator
            initialRouteName="HomeTab"
            activeColor="#fff"
            barStyle={{backgroundColor: '#F8F8F8'}}
            screenOptions={{
                style: style.tabBar,
                keyboardHidesTabBar: true,
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <RootTab.Screen
                name="HomeTab"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        return <Text style={{color: focused ? 'black' : 'gray', fontSize: 10}}>Home</Text>
                    },
                    tabBarIcon: ({focused}) => {
                        return <Ionicons name="ios-home" style={{color: focused ? 'black' : 'gray'}} size={26}/>
                    },
                }}
            />
            <RootTab.Screen
                name="MyNetworkTab"
                component={MyNetworkStackScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        return <Text style={{color: focused ? 'black' : 'gray', fontSize: 10}}>My Network</Text>
                    },
                    tabBarIcon: ({focused}) => {
                        return <MaterialIcons name="nature-people" style={{color: focused ? 'black' : 'gray'}} size={26}/>
                    },
                }}
            />
            <RootTab.Screen
                name="PostTab"
                component={PostStackScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        return <Text style={{color: focused ? 'black' : 'gray', fontSize: 10}}>Post</Text>
                    },
                    tabBarIcon: ({focused}) => {
                        return <MaterialIcons name="add-box" style={{color: focused ? 'black' : 'gray'}} size={26}/>
                    },
                }}
            />
            <RootTab.Screen
                name="NotificationsTab"
                component={NotificationsStackScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        return <Text style={{color: focused ? 'black' : 'gray', fontSize: 10}}>Notifications</Text>
                    },
                    tabBarIcon: ({focused}) => {
                        return <Ionicons name="notifications" style={{color: focused ? 'black' : 'gray'}} size={26}/>
                    },
                }}
            />
            <RootTab.Screen
                name="JobsTab"
                component={JobsStackScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        return <Text style={{color: focused ? 'black' : 'gray', fontSize: 10}}>Jobs</Text>
                    },
                    tabBarIcon: ({focused}) => {
                        return <MaterialIcons name="shopping-bag" style={{color: focused ? 'black' : 'gray'}} size={26}/>
                    },
                }}
            />
        </RootTab.Navigator>
    );
};

export default RootTabScreen;

const style = StyleSheet.create({
    tabBar: {
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: '#E3E7F1',
        height: 75,
        paddingBottom: 5
    }
});

