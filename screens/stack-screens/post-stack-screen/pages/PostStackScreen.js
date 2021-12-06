import React, {useContext, useEffect, useRef} from 'react';
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from "react-native-vector-icons/Feather";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Context} from "../../../../components/context/Context";
import {Avatar} from "react-native-paper";

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
        elevation: 10,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 13,
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
    },
    coverImage: {
        position: 'absolute',
        top: 0,
        height: 75,
        width: width
    },
});

const PostScreen = ({navigation}) => {
    // selector
    const user = useSelector(state => state.signInReducer.user);

    const refRBSheet = useRef();
    const setIsShowTabMenu = useContext(Context);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsShowTabMenu('none');
        });
        return () => unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.reset({index: 0, routes: [{name: 'Home'}]})}>
                    <Feather name="x" size={20} style={{paddingLeft: 10}}/>
                </TouchableOpacity>
            </View>
           <View style={styles.contentContainer}>
               <KeyboardAwareScrollView>
                   <View style={{display: 'flex', flexDirection: 'row'}}>
                       <Avatar.Image
                           style={styles.profilePhoto}
                           source={{uri: user.photoURL ? user.photoURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'}}
                           size={40}
                       />
                       <View>
                           <Text style={{color: 'black', fontWeight: '500'}}>Lochana Thiwanka</Text>
                           <Text>Hello</Text>
                       </View>
                   </View>
                   <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
                   <RBSheet
                       ref={refRBSheet}
                       closeOnDragDown={true}
                       closeOnPressMask={true}
                       customStyles={{
                           wrapper: {
                               backgroundColor: "transparent"
                           },
                           draggableIcon: {
                               backgroundColor: "#000"
                           }
                       }}
                   >
                       <View>
                           <Text>Hello</Text>
                       </View>
                   </RBSheet>
               </KeyboardAwareScrollView>
           </View>
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

