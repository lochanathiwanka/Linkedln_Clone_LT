import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from "react-native-vector-icons/Feather";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Context} from "../../../../components/context/Context";
import {ActivityIndicator, Avatar, TextInput, Title} from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 40,
        elevation: 3,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 15,
        width: width,
    },
    textInput: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    footerContainer: {
        height: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const PostScreen = ({navigation}) => {
    // image reference
    let reference = undefined;

    // selector
    const user = useSelector(state => state.signInReducer.user);
    const info = useSelector(state => state.signInReducer.info);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const refRBSheet = useRef();
    const setIsShowTabMenu = useContext(Context);

    useEffect(() => {
        refRBSheet.current.open();
        const unsubscribe = navigation.addListener('focus', () => {
            setIsShowTabMenu('none');
        });
        return () => unsubscribe;
    }, [navigation]);

    const contentHandler = (value) => {
        setContent(value);
    }

    // select image from camera
    const selectImageFromCamera = async () => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            cropping: true
        }).then(image => {
            setImage(image.path);
            refRBSheet.current.close();
        }).catch((e) => {
            console.log(e);
        });
    }

    // select image from gallery
    const selectImageFromGallery = async () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            cropping: true
        }).then(image => {
            setImage(image.path);
            refRBSheet.current.close();
        }).catch((e) => {
            console.log(e);
        });
    }

    // select video from gallery
    const selectVideoFromGallery = async () => {
        ImagePicker.openPicker({
            mediaType: 'video',
        }).then(video => {
            setVideo(video.path);
            refRBSheet.current.close();
        }).catch((e) => {
            console.log(e);
        });
    }

    // get image file name
    const getFileName = (path) => {
        return path.split("/").pop();
    }

    // upload image to the bucket
    const uploadFile = async (path) => {
        // upload file
        const task = reference.putFile(path);
        task.then(async (resource) => {
            const url = await storage().ref(resource.metadata.name).getDownloadURL();

            const post = {
                uid: user.uid,
                userName: user.name,
                userImage: user.photoURL,
                userDesc: info.headline,
                content: content,
                photoURL: image ? url : null,
                videoURL: video ? url : null,
                created: new Date().toISOString()
            }

            // add post
            firestore()
                .collection('posts')
                .add(post)
                .then(() => {
                    setIsLoading(false);
                    navigation.reset({index: 0, routes: [{name: 'Home'}]});
                });
        }).catch((e) => {
            alert(e);
        });
    }

    const addPostHandler = async () => {
        if (image) {
            setIsLoading(true);
            reference = storage().ref(getFileName(image));
            await uploadFile(image);
            await ImagePicker.clean();
        } else if (video) {
            setIsLoading(true);
            reference = storage().ref(getFileName(video));
            await uploadFile(video);
            await ImagePicker.clean();
        }
    }

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}]})}
                    style={{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
                >
                    <Feather name="x" size={20} style={{paddingLeft: 10}}/>
                    <Title>Share post</Title>
                    <TouchableOpacity style={{right: 10}} onPress={addPostHandler}>
                        <Text style={{color: '#0e76a8', fontSize: 14, fontWeight: '700'}}>Post</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
               <KeyboardAwareScrollView>
                   <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 15, paddingBottom: 20}}>
                       <Avatar.Image
                           source={{uri: user.photoURL ? user.photoURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'}}
                           size={40}
                       />
                       <View style={{left: 10}}>
                           <Text style={{color: 'black', fontWeight: '500', paddingBottom: 5}}>{user ? user.name : 'User'}</Text>
                           <TouchableOpacity style={{width: 100, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',borderRadius: 20, borderColor: 'gray', borderWidth: 1}}>
                               <Entypo name="network" size={12} style={{left: 5}}/>
                               <Text style={{color: 'black', fontWeight: '700'}}>Anyone</Text>
                               <AntDesign name="caretdown" size={12} style={{right: 5}}/>
                           </TouchableOpacity>
                       </View>
                   </View>
                   <TextInput value={content} onChangeText={(text) => contentHandler(text)} underlineColor="white" multiline={true}
                              placeholder="What do you want to talk about?" activeUnderlineColor="white" selectionColor="black" style={styles.textInput}/>
                   {image && !video && (
                       <TouchableOpacity style={{alignSelf: 'center'}}>
                           <TouchableOpacity style={{position: 'absolute', right: 8, zIndex: 5, top: 18}} onPress={() => setImage(null)}>
                               <Image
                                   style={{width: 20, height: 20}}
                                   source={require('../../../../assets/images/close.png')}
                               />
                           </TouchableOpacity>
                           <Image
                               style={{width: width - 35, height: 250, marginTop: 10}}
                               source={{
                                   uri: image,
                               }}
                           />
                       </TouchableOpacity>
                   )}
                   {video && !image && (
                       <View style={{alignSelf: 'center'}}>
                           <TouchableOpacity style={{position: 'absolute', right: 8, zIndex: 5, top: 45}} onPress={() => setVideo(null)}>
                               <Image
                                   style={{width: 20, height: 20}}
                                   source={require('../../../../assets/images/close.png')}
                               />
                           </TouchableOpacity>
                           <Video
                               style={{width: width - 35, height: 250, marginTop: 10}}
                               controls={true}
                               fullscreen={true}
                               resizeMode="cover"
                               paused={true}
                               poster="https://wallpaperaccess.com/full/38130.jpg"
                               source={{uri: video}}
                           />
                       </View>
                   )}
                   <RBSheet
                       ref={refRBSheet}
                       closeOnDragDown={true}
                       closeOnPressMask={true}
                       openDuration={250}
                       animationType="slide"
                       customStyles={{
                           wrapper: {
                               backgroundColor: "transparent",
                           },
                           draggableIcon: {
                               backgroundColor: "gray"
                           },
                           container: {
                               borderTopColor: '#efefef',
                               borderTopWidth: 1,
                               height: 365
                           }
                       }}
                   >
                       <View style={{display: 'flex'}}>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 10}} onPress={() => selectImageFromGallery()}>
                               <FontAwesome name="image" size={18}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Add a photo</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20}} onPress={selectVideoFromGallery}>
                               <FontAwesome name="video-camera" size={18}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Take a video</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                               <FontAwesome name="certificate" size={19}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Celebrate an occasion</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                               <MaterialCommunityIcons name="file-document" size={19}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Add a document</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                               <MaterialIcons name="shopping-bag" size={19}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Share that you're hiring</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                               <MaterialIcons name="perm-contact-cal" size={19}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Find an expert</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                               <Entypo name="bar-graph" size={19}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Create a poll</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{width: 200, display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: 10, marginTop: 20}}>
                               <MaterialCommunityIcons name="calendar" size={19}/>
                               <Text style={{marginLeft: 15, color: 'black', fontSize: 15, fontWeight: '600'}}>Create an event</Text>
                           </TouchableOpacity>
                       </View>
                   </RBSheet>
               </KeyboardAwareScrollView>
           </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={{alignSelf: 'flex-start', left: 15, paddingTop: 10, paddingBottom: 10}}>
                    <Text style={{color: '#0e76a8', fontWeight: '500'}}>Add hashtag</Text>
                </TouchableOpacity>
                <View style={{width: width, display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                    <View style={{width: 150, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', left: 20}}>
                        <TouchableOpacity onPress={selectImageFromCamera}>
                            <FontAwesome name="camera" size={18}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectVideoFromGallery}>
                            <FontAwesome name="video-camera" size={18}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectImageFromGallery}>
                            <FontAwesome name="image" size={18}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                            <MaterialCommunityIcons name="dots-horizontal" size={18}/>
                        </TouchableOpacity>
                    </View>
                    <View  style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', right: 10}}>
                        <Ionicons name="chatbox-ellipses" size={18} style={{paddingRight: 5}}/>
                        <Text style={{color: 'gray', fontSize: 12, fontWeight: '700'}}>Anyone</Text>
                    </View>
                </View>
            </View>
            {isLoading && (
                <View style={{position: 'absolute', backgroundColor: '#363535', width: width, height: height, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.6}}>
                    <ActivityIndicator animating={true} color={'white'} size={50}/>
                </View>
            )}
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

