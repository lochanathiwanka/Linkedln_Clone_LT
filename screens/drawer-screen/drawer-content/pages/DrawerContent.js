import React from 'react'
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import {Avatar, Drawer, Text, Title} from 'react-native-paper'
import {useDispatch, useSelector} from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {removeUser} from "../../../stack-screens/sign-in-screen/redux/signInAction";

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingBottom: 10,
        backgroundColor: '#f6f3ea'
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default function DrawerContent(props) {
    // selector
    const user = useSelector(state => state.signInReducer.user);

    // dispatcher
    const dispatch = useDispatch();

    const removeValue = async () => {
        try {
            auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            await AsyncStorage.removeItem('user');
            dispatch(removeUser());
        } catch(e) {
            console.log(e);
            // remove error
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent} >
                    <TouchableOpacity onPress={() => props.navigation.navigate('UserInfo')}>
                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection: 'row', marginTop: 15}}>
                                <Avatar.Image
                                    source={{uri: user ? user.photoURL ? user.photoURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png' : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'}}
                                    size={50}
                                />
                                <View style={{marginLeft: 15, width: 155}} >
                                    <Title style={styles.title} >{user ? user.name : 'User'}</Title>
                                    <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('UserInfo')}>
                                            <Title style={{fontSize: 15, fontWeight: 'bold', color: '#0e76a8'}}>View Profile</Title>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginLeft: 6}}>
                                            <Title style={{fontSize: 15, fontWeight: 'bold', color: '#0e76a8'}}>Settings</Title>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderTopColor: '#c7c7c7', borderTopWidth: 1, backgroundColor: '#f6f3ea', display: 'flex', flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                        <FontAwesome name="square" size={20} style={{color: '#dcae5b', marginLeft: 15}}/>
                        <Text style={{fontSize: 17, fontWeight: 'bold', color: '#0e76a8', marginLeft: 20}}>Try Premium for free</Text>
                    </View>
                    <Drawer.Section title="Recent" style={styles.drawerSection} >
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="people"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Spring Users"
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="people"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Front End Developer Group"
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5
                                    name="calendar-alt"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="React Native EU 2021 - Virtual ..."
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5
                                    name="calendar-alt"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Node.js Global Summit 22"
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5
                                    name="calendar-alt"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="MongoDB.live 2021"
                            onPress={() => {}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Groups" >
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="people"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Spring Users"
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="people"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Front End Developer Group"
                            onPress={() => {}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection} >
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={removeValue}
                />
            </Drawer.Section>
        </View>
    )
}
