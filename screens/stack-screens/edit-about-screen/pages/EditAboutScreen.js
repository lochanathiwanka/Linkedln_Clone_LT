import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import {TextInput, Title} from "react-native-paper";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {useDispatch, useSelector} from "react-redux";
import firestore from "@react-native-firebase/firestore";

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 9,
        width: width
    },
    textInput: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0e76a8',
        borderRadius: 20,
        width: width - 50,
        height: 25
    }
});

const EditAboutScreen = ({navigation}) => {
    const info = useSelector(state => state.signInReducer.info);
    const [description, setDescription] = useState(info ? info.about : ' ');

    const dispatch = useDispatch();

    const save = () => {
        const tempInfo = {...info};
        tempInfo.about = description;

        // update user's about
        firestore()
            .collection('info')
            .doc(info.uid)
            .set(tempInfo)
            .then(() => {
                dispatch({
                    type: 'UPDATE_USER_INFO',
                    info: tempInfo
                });
                navigation.reset({index: 0, routes: [{name: 'ProfileScreen'}]});
            });
    }

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.reset({index: 0, routes: [{name: 'ProfileScreen'}]})}>
                    <Feather name="x" size={20} style={{paddingLeft: 10}}/>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
                    <View>
                        <Title style={{color: 'black', fontSize: 19, left: 15}}>Edit about</Title>
                        <TextInput value={description} onChangeText={(text) => setDescription(text)} underlineColor="black"
                                   multiline={true} activeUnderlineColor="black" style={styles.textInput} label="Description"/>
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={save}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditAboutScreen;
