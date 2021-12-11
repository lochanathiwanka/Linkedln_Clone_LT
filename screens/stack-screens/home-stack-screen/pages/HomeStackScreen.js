import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {Context} from "../../../../components/context/Context";
import firestore from "@react-native-firebase/firestore";
import HeaderComp from "../../../../components/header-comp/HeaderComp";
import {ActivityIndicator, Avatar} from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Video from 'react-native-video';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    // selector
    const user = useSelector(state => state.signInReducer.user);

    const setIsShowTabMenu = useContext(Context);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsShowTabMenu('flex');
        });
        return () => unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getData().then(data => {
            setPosts(data);
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        getData().then((data) => setPosts(data));
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const fetchAllPosts = async () => {
        return await firestore()
            .collection('posts')
            .orderBy('created', 'desc')
            .get()
            .then((querySnapshot) => {
                setIsLoading(false);
                return querySnapshot.docs.map((doc) => doc.data());
            });
    }

    const getData = async () => {
        setIsLoading(true);
        return await fetchAllPosts();
    }

    return (
        <View style={{flex: 1}}>
            <HeaderComp imageURL={user.photoURL ? user.photoURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png'} navigation={navigation}/>
            <FlatList
                style={{backgroundColor: '#f6f3ea'}}
                data={posts}
                renderItem={({item}) => (
                    <View style={{maxHeight: 480, flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10, backgroundColor: 'white'}}>
                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginLeft: 10, alignSelf: 'flex-start'}}>
                            <TouchableOpacity>
                                <Avatar.Image
                                    style={{zIndex: 5}}
                                    source={{uri: item.userImage}}
                                    size={50}
                                />
                            </TouchableOpacity>
                            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10,}}>
                                <Text style={{color: 'black', width: 320, paddingBottom: 2}}>{item.userName}</Text>
                                <Text style={{color: 'gray', fontSize: 12, width: 320}}>{item.userDesc}</Text>
                            </View>
                        </View>
                        <Text style={{color: 'black', fontSize: 15, alignSelf: 'flex-start', marginTop: 15, marginLeft: 10}}>{item.content}</Text>
                        <TouchableOpacity>
                            {item.photoURL && !item.videoURL && (
                                <Image
                                    style={{width: width, height: 250, marginTop: 10}}
                                    source={{
                                        uri: item.photoURL,
                                    }}
                                />
                            )}
                            {item.videoURL && !item.photoURL && (
                                <Video
                                    style={{width: width, height: 250, marginTop: 10}}
                                    controls={true}
                                    fullscreen={true}
                                    resizeMode="cover"
                                    hideShutterView={true}
                                    paused={true}
                                    poster="https://wallpaperaccess.com/full/38130.jpg"
                                    source={{uri: item.videoURL}}
                                />
                            )}
                        </TouchableOpacity>
                        <View style={{width: width - 20, display: 'flex',  flexDirection: 'row', paddingTop: 15, paddingBottom: 15, borderBottomColor: '#d7d7d7', borderBottomWidth: 1}}>
                            <Image
                                style={{width: 15, height: 15, transform: [{scaleX: -1}]}}
                                source={require('../../../../assets/images/like.png')}
                            />
                            <Image
                                style={{width: 15, height: 15, marginLeft: 3, transform: [{scaleX: -1}]}}
                                source={require('../../../../assets/images/clapping.png')}
                            />
                            <Image
                                style={{width: 15, height: 15, marginLeft: 3, transform: [{scaleX: -1}]}}
                                source={require('../../../../assets/images/heart.png')}
                            />
                        </View>
                        <View style={{width: width - 40, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, paddingBottom: 8}}>
                            <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <AntDesign name="like2" size={20} style={{color: 'gray', transform: [{scaleX: -1}]}}/>
                                <Text style={{color: 'gray', fontWeight: '500', marginTop: 3}}>Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name="chatbox-ellipses-outline" size={20} style={{color: 'gray', transform: [{scaleX: -1}]}}/>
                                <Text style={{color: 'gray', fontWeight: '500', marginTop: 3}}>Comment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons name="share-outline" size={22} style={{color: 'gray'}}/>
                                <Text style={{color: 'gray', fontWeight: '500', marginTop: 3}}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <FontAwesome name="send" size={20} style={{color: 'gray'}}/>
                                <Text style={{color: 'gray', fontWeight: '500', marginTop: 3}}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            {isLoading && (
                <View style={{position: 'absolute', backgroundColor: '#363535', width: width, height: height, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.6}}>
                    <ActivityIndicator animating={true} color={'white'} size={50}/>
                </View>
            )}
        </View>
    );
};

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <HomeStack.Screen name='HomeStack' component={HomeScreen}/>
    </HomeStack.Navigator>
);

export default HomeStackScreen;
