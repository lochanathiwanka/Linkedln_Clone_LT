import React from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, TextInput, Title} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import firestore from "@react-native-firebase/firestore";

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topHeaderContainer: {
        flex: 1,
        height: 50,
        width: width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textInput: {
        width: 280,
        height: 40,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'none'
    },
    imageContainer: {
        position: 'relative',
        width: width,
        height: 120,
        backgroundColor: 'white'
    },
    coverImage: {
        position: 'absolute',
        top: 0,
        height: 75,
        width: width
    },
    pencilIconContainer: {
        position: 'absolute',
        right: 10,
        top: 20,
        width: 30,
        height: 30,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfafa'
    },
    pencilIcon: {
        color: '#0e76a8'
    },
    editIcon: {
        position: 'absolute',
        right: 15,
    },
    circle: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 94,
        height: 94,
        borderRadius: 100,
        backgroundColor: '#fcfafa',
        zIndex: 4,
        top: 20,
        left: 10
    },
    profilePhoto: {
        zIndex: 5,
    },
    contentContainer: {
        flex: 11,
        width: width,
    },
    section1: {
        width: width,
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    dashboardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cfd1ef',
        marginTop: 6,
        paddingBottom: 10
    },
    aboutContainer: {
        position: 'relative',
        width: width,
        backgroundColor: 'white',
        marginTop: 5
    }
});

const ProfileScreen = ({navigation}) => {
    // image reference
    let reference = undefined;

    // dispatcher
    const dispatch = useDispatch();

    // selector
    const user = useSelector(state => state.signInReducer.user);
    const info = useSelector(state => state.signInReducer.info);

    const openImage = async (imgType) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            reference = storage().ref(getFileName(image.path))
            uploadImage(image.path, imgType);
        }).catch((e) => {
            console.log(e);
        });
    }

    // get image file name
    const getFileName = (path) => {
        return path.split("/").pop();
    }

    // upload image to the bucket
    const uploadImage = async (path, imgType) => {
        // upload file
        const task = reference.putFile(path);
        task.then(async (img) => {
            const imageURL = await storage().ref(img.metadata.name).getDownloadURL();
            const tempUser = {...user};
            tempUser[imgType] = imageURL;

            // update user's photo
            firestore()
                .collection('users')
                .doc(user.uid)
                .set(tempUser)
                .then(() => {
                    dispatch({
                        type: 'UPDATE_USER_PHOTO_URL',
                        user: tempUser
                    });
                });
        }).catch((e) => {
            alert(e);
        });
    }

    return (
        <View style={styles.root}>
            <View style={styles.topHeaderContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={30} style={{color: 'gray', left: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <TextInput value="Lochana Thiwanka" underlineColor="black"
                               activeUnderlineColor="#0e76a8"
                               style={styles.textInput}
                               left={<TextInput.Icon name={() => <FontAwesome name="search" size={15} style={{color: 'gray', marginLeft: 10}}/>} />}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="settings-sharp" size={20} style={{color: 'black', right: 10}}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 15}}>
                <KeyboardAwareScrollView style={{backgroundColor: '#f3dacf'}}>
                    <View style={styles.imageContainer}>
                        <View style={styles.circle}>
                            <TouchableOpacity onPress={() => openImage('photoURL')}>
                                <Avatar.Image
                                    style={styles.profilePhoto}
                                    source={{uri: user.photoURL ? user.photoURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'}}
                                    size={90}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.coverImage} onPress={() => openImage('coverPhoto')}>
                            <Image
                                style={styles.coverImage}
                                source={{
                                    uri: user.coverPhoto ? user.coverPhoto : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png',
                                }}
                            />
                            <View style={styles.pencilIconContainer}>
                                <EvilIcons name="pencil" size={25} style={styles.pencilIcon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.editIcon, {top: 90}]} onPress={() => navigation.navigate('EditIntroScreen')}>
                            <MaterialCommunityIcons name="pencil-outline" size={24}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        {info && (
                            <View style={styles.section1}>
                                {info.firstName && <Title style={{paddingLeft: 10}}>{info.firstName+" "+info.lastName}</Title>}
                                {info.headline.length > 0 && <Text style={{fontSize: 15, fontWeight: '400', color: 'black', paddingLeft: 10}}>{info && info.headline}</Text>}
                                {info.position.length > 0 && <Text style={{paddingTop: 10, color: 'black', paddingLeft: 10}}>{info && info.position+" * "+info.education}</Text>}
                                {info.country.length > 0 && <Text style={{color: 'gray', paddingLeft: 10}}>{info && info.city+", "+info.country}</Text>}
                                <Text style={{color: '#0e76a8', fontWeight: '600', paddingTop: 10, paddingLeft: 10}}>{info.connections < 500 ? info.connections+" connections" : info.connections+"+ connections"}</Text>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10, paddingTop: 15, paddingLeft: 10}}>
                                    <TouchableOpacity style={{width: 170, height: 30, borderRadius: 20, backgroundColor: '#0e76a8', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Open to</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{width: 170, height: 30, borderRadius: 20, borderColor: '#464545', borderWidth: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: '#464545', fontSize: 16, fontWeight: '500'}}>Add section</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 100, borderColor: '#464545', borderWidth: 1}}>
                                        <Feather name="more-horizontal" size={20}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={styles.dashboardContainer}>
                        <View style={{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                            <View style={{left: 10}}>
                                <Text style={{color: 'black', fontSize: 16, fontWeight: '400'}}>Your Dashboard</Text>
                                <Text style={{color: 'gray', fontStyle: 'italic'}}>Private to you</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', right: 10}}>
                                <MaterialIcons name="star-half" size={20}/>
                                <Text style={{color: 'gray', fontWeight: '700', marginLeft: 6}}>ALL-STAR</Text>
                            </View>
                        </View>
                        <View style={{width: width - 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, marginTop: 10}}>
                            <View style={{width: (width - 10) / 3, display: 'flex', justifyContent: 'space-between', height: 80, borderRightColor: '#d7d7d7', borderRightWidth: 1}}>
                                <Text style={{color: '#0e76a8',  fontSize: 16, fontWeight: '700', paddingTop: 10, left: 10}}>159</Text>
                                <Text style={{width: 130, height: 45, color: 'gray', fontStyle: 'italic', paddingBottom: 10, left: 10}}>Who viewed your profile</Text>
                            </View>
                            <View style={{width: (width - 10) / 3, display: 'flex', justifyContent: 'space-between', height: 80, borderRightColor: '#d7d7d7', borderRightWidth: 1}}>
                                <Text style={{color: '#0e76a8',  fontSize: 16, fontWeight: '700', paddingTop: 10, left: 10}}>289</Text>
                                <Text style={{width: 130, height: 45, color: 'gray', fontStyle: 'italic', paddingBottom: 10, left: 10}}>Post views</Text>
                            </View>
                            <View style={{width: (width - 10) / 3, display: 'flex', justifyContent: 'space-between', height: 80}}>
                                <Text style={{color: '#0e76a8',  fontSize: 16, fontWeight: '700', paddingTop: 10, left: 10}}>40</Text>
                                <Text style={{width: 80, height: 45, color: 'gray', fontStyle: 'italic', paddingBottom: 10, left: 10}}>Search appearances</Text>
                            </View>
                        </View>
                        <View style={{width: width - 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 8, marginTop: 10}}>
                            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#d7d7d7', borderBottomWidth: 1}}>
                                <Entypo name="500px" size={20} style={{marginLeft: 15}}/>
                                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', left: 15}}>
                                    <View style={{display: 'flex', flexDirection: 'row', width: 330}}>
                                        <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>Creator mode:</Text>
                                        <Text style={{color: 'gray', fontSize: 15, fontWeight: '600', left: 5}}>off</Text>
                                    </View>
                                    <Text style={{color: 'gray', width: 330, marginTop: 4, paddingBottom: 10}}>Creator mode highlights content on your profile and helps you get discovered by potential followers.</Text>
                                </View>
                            </View>
                            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', borderBottomColor: '#d7d7d7', borderBottomWidth: 1, marginTop: 10}}>
                                <MaterialIcons name="people-alt" size={20} style={{marginLeft: 15}}/>
                                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', left: 15}}>
                                    <View style={{display: 'flex', flexDirection: 'row', width: 330}}>
                                        <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>My Network</Text>
                                    </View>
                                    <Text style={{color: 'gray', width: 330, marginTop: 4, paddingBottom: 10}}>Manage your connections, events and interests.</Text>
                                </View>
                            </View>
                            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                                <MaterialCommunityIcons name="label-variant" size={20} style={{marginLeft: 15, transform: [{ rotate: '270deg' }]}}/>
                                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', left: 15}}>
                                    <View style={{display: 'flex', flexDirection: 'row', width: 330}}>
                                        <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>My items</Text>
                                    </View>
                                    <Text style={{color: 'gray', width: 330, marginTop: 4, paddingBottom: 10}}>Keep track of your jobs, courses, and articles</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.aboutContainer}>
                        <View>
                            <Text style={{color: 'black', fontSize: 15, fontWeight: '600', left: 10, marginTop: 15}}>About</Text>
                            <Text style={{width: 275, color: 'black', left: 10, marginTop: 10, paddingBottom: 15}}>{info ? info.about : 'About you'}</Text>
                        </View>
                        <TouchableOpacity style={[styles.editIcon, {top: 15}]} onPress={() => navigation.navigate('EditAboutScreen')}>
                            <MaterialCommunityIcons name="pencil-outline" size={24}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};

export default ProfileScreen;
