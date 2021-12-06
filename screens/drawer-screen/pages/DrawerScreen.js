import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import RootTabScreen from "../../root-tab-screen/pages/RootTabScreen";
import {CardStyleInterpolators} from "@react-navigation/stack";
import DrawerContent from "../drawer-content/pages/DrawerContent";
import UserInfoStackScreen from "../../user-info-stack-screen/pages/UserInfoStackScreen";

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={RootTabScreen}/>
            <Drawer.Screen name="UserInfo" component={UserInfoStackScreen}/>
        </Drawer.Navigator>
    );
};

export default DrawerScreen;
