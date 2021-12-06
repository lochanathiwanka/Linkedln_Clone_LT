import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput, Title} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Entypo from "react-native-vector-icons/Entypo";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Checkbox} from "native-base";
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

const EditIntroScreen = ({navigation}) => {
    // selector
    const user = useSelector(state => state.signInReducer.user);
    const info = useSelector(state => state.signInReducer.info);

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(info ? info.firstName : ' ');
    const [lastName, setLastName] = useState(info ? info.lastName : ' ');
    const [additionalName, setAdditionalName] = useState(info ? info.additionalName : ' ');
    const [headline, setHeadline] = useState(info ? info.headline : ' ');
    const [position, setPosition] = useState(info ? info.position : ' ');
    const [industry, setIndustry] = useState(info ? info.industry : ' ');
    const [education, setEducation] = useState(info ? info.education : ' ');
    const [country, setCountry] = useState(info ? info.country : ' ');
    const [city, setCity] = useState(info ? info.city : ' ');

    const save = () => {
        const tempUser = {...user};
        const tempInfo= {...info};

        tempUser.name = firstName+" "+lastName;
        tempInfo.firstName = firstName;
        tempInfo.lastName = lastName;
        tempInfo.headline = headline;
        tempInfo.position = position;
        tempInfo.industry = industry;
        tempInfo.education = education;
        tempInfo.country = country;
        tempInfo.city = city;

        // update user
        firestore()
            .collection('users')
            .doc(user.uid)
            .set(tempUser)
            .then(() => {
                firestore()
                    .collection('info')
                    .doc(user.uid)
                    .set(tempInfo)
                    .then(() => {
                        dispatch({
                            type: 'UPDATE_USER',
                            user: tempUser,
                            info: tempInfo
                        });
                        navigation.reset({index: 0, routes: [{name: 'ProfileScreen'}]});
                    });
            });
    }

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.reset({index: 0, routes: [{name: 'ProfileScreen'}]})}>
                    <Feather name="x" size={20} style={{paddingLeft: 10}}/>
                </TouchableOpacity>
                <Title style={{color: 'black', fontSize: 19, left: 25}}>Edit intro</Title>
            </View>
            <View style={styles.contentContainer}>
                <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
                    <View>
                        <TextInput value={firstName} onChangeText={(text) => setFirstName(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="First name*"/>
                        <TextInput value={lastName} onChangeText={(text) => setLastName(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="Last name*"/>
                        <TextInput value={additionalName} onChangeText={(text) => setAdditionalName(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="Additional name"/>
                        <Text style={{color: 'black', fontSize: 12, left: 25, paddingTop: 25}}>Name pronunciation</Text>
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 15}}>
                            <Entypo name="plus" size={18} style={{color: '#0e76a8', marginLeft: 20, paddingTop: 10}}/>
                            <Text style={{color: '#0e76a8', fontSize: 15, fontWeight: '600', paddingTop: 10}}>Add name pronunciation</Text>
                        </TouchableOpacity>
                        <TextInput value={headline} onChangeText={(text) => setHeadline(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="Headline*"/>
                    </View>
                    <View>
                        <Title style={{color: 'black', fontSize: 19, left: 15, marginTop: 10}}>Current position</Title>
                        <TextInput value={position} onChangeText={(text) => setPosition(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="Position*"/>
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
                            <Entypo name="plus" size={18} style={{color: '#0e76a8', marginLeft: 20, paddingTop: 10}}/>
                            <Text style={{color: '#0e76a8', fontSize: 15, fontWeight: '600', paddingTop: 10}}>Add new position</Text>
                        </TouchableOpacity>
                        <View style={{width: 270, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 20, marginLeft: 20}}>
                            <NativeBaseProvider>
                                <Checkbox value="true" defaultIsChecked accessibilityLabel="checkbox"/>
                            </NativeBaseProvider>
                            <Text style={{fontSize: 15, fontWeight: '500'}}>Show current company in my intro</Text>
                        </View>
                        <TextInput value={industry} onChangeText={(text) => setIndustry(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="Industry*"/>
                    </View>
                    <View>
                        <Title style={{color: 'black', fontSize: 19, left: 15, marginTop: 10}}>Education</Title>
                        <TextInput value={education} onChangeText={(text) => setEducation(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="Education*"/>
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
                            <Entypo name="plus" size={18} style={{color: '#0e76a8', marginLeft: 20, paddingTop: 10}}/>
                            <Text style={{color: '#0e76a8', fontSize: 15, fontWeight: '600', paddingTop: 10}}>Add new education</Text>
                        </TouchableOpacity>
                        <View style={{width: 225, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 20, marginLeft: 20}}>
                            <NativeBaseProvider>
                                <Checkbox value="true" defaultIsChecked accessibilityLabel="checkbox"/>
                            </NativeBaseProvider>
                            <Text style={{fontSize: 15, fontWeight: '500'}}>Show education in my intro</Text>
                        </View>
                    </View>
                    <View>
                        <Title style={{color: 'black', fontSize: 19, left: 15, marginTop: 10}}>Location</Title>
                        <TextInput value={country} onChangeText={(text) => setCountry(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={styles.textInput} label="Country/Region"/>
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
                            <Text style={{left: 20, color: '#0e76a8', fontSize: 15, fontWeight: '600', paddingTop: 10}}>Use current location</Text>
                        </TouchableOpacity>
                        <TextInput value={city} onChangeText={(text) => setCity(text)} underlineColor="black"
                                   activeUnderlineColor="black" style={[styles.textInput, {paddingTop: 30}]} label="City/District"/>
                    </View>
                    <View>
                        <Title style={{color: 'black', fontSize: 19, left: 15, marginTop: 25}}>Contact info</Title>
                        <Text style={{color: 'black', fontSize: 14, left: 15}}>Add or edit your profile URL, email, websites and more</Text>
                        <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 20}}>
                            <Text style={{left: 20, color: '#0e76a8', fontSize: 15, fontWeight: '600', paddingTop: 10}}>Edit contact info</Text>
                        </TouchableOpacity>
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

export default EditIntroScreen;
