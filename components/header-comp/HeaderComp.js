import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AvatarComp} from "../avatar-comp/AvatarComp";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

const styles= StyleSheet.create({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    avatarContainer: {
        height: 30,
        marginTop: 5,
        marginBottom: 5,
        left: 10
    },
    searchBox: {
        width: 300,
        height: 25,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#e4e7ee'
    },
    chatIcon: {
        right: 10,
        color: 'gray',
        transform: [
            {scaleX: -1}
        ]
    }
});

const HeaderComp = ({imageURL, navigation}) => {
    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <View style={styles.avatarContainer}>
                    <NativeBaseProvider>
                        <AvatarComp imageURL={imageURL}/>
                    </NativeBaseProvider>
                </View>
            </TouchableOpacity>
            <View style={styles.searchBox}>
                <FontAwesome name="search" size={15} style={{color: 'gray', marginLeft: 10}}/>
                <Text style={{color: 'black', marginLeft: 5}}>Search</Text>
            </View>
            <Ionicons name="chatbox-ellipses" style={styles.chatIcon} size={22}/>
        </View>
    );
};

export default HeaderComp;
