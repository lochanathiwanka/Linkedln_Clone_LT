import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from "react-native-paper";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Checkbox} from "native-base";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {useDispatch, useSelector} from "react-redux";
import {setIsError, signIn, signInWithGoogle} from "../redux/signInAction";
import {AlertComp} from "../../../../components/alert-comp/AlertComp";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        height: height - 24,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container1: {
        width: width,
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 80,
        height: 20,
        top: 20,
        left: 15
    },
    joinNow: {
        color: '#0e76a8',
        fontSize: 18,
        fontWeight: '500',
        top: 20,
        right: 15
    },
    container2: {
        width: width,
        flex: 0.6,
        justifyContent: 'center',
    },
    signIn: {
        color: 'black',
        left: 15,
        fontSize: 35,
        fontWeight: '700'
    },
    container3: {
        width: width,
        flex: 2.5
    },
    textInput: {
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'none'
    },
    continueButton: {
        backgroundColor: '#0e76a8',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    },
    container4: {
        flex: 2.5,
    },
    lineContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    line1: {
        borderColor: '#eaeaea',
        borderWidth: 0.2,
        width: 160
    },
    line2: {
        borderColor: '#eaeaea',
        borderWidth: 0.2,
        width: 160
    },
    signInButton: {
        backgroundColor: 'white',
        marginTop: 15,
        width: width - 35,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1
    },
    buttonIcon: {
        width: 30,
        height: 30,
        paddingLeft: 10
    },
    signInButtonText: {
        color: 'gray',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10
    },
});

const SignInScreen = ({navigation}) => {
    GoogleSignin.configure({
        webClientId: "692520736274-v94hpvgi3o29lm88nfop5u8gls1jc4vt.apps.googleusercontent.com"
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [textIcon, setTextIcon] = useState('eye');
    const [isShowPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);

    // dispatcher
    const dispatch = useDispatch();

    // selector
    const errorMessage = useSelector(state => state.signInReducer.errorMessage);
    const isError = useSelector(state => state.signInReducer.isError);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setIsError(false));
        }, 5000);
        return () => {
            clearTimeout(timeout);
        }
    }, [isError]);

    const emailHandler = (value) => {
        setEmail(value);
    }

    const passwordHandler = (value) => {
        setPassword(value);
    }

    const showPasswordHandler = () => {
        setTextIcon(isShowPassword ? 'eye' : 'eye-off');
        setShowPassword(!isShowPassword);
    }

    const continueHandler = () => {
        dispatch(signIn({email: email, password: password}));
    }

    async function onGoogleButtonPress() {
        dispatch(signInWithGoogle());
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <StatusBar animated={true} barStyle="dark-content" backgroundColor="white"/>
            <View style={styles.root}>
                <View style={styles.container1}>
                    <Image style={styles.logo} source={require('../../../../assets/images/linkedln-logo.png')}/>
                    <Text style={styles.joinNow} onPress={() => navigation.reset({index: 0, routes: [{name: 'SignUpScreen'}]})}>Join now</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.signIn}>Sign in</Text>
                </View>
                <View style={styles.container3}>
                    <TextInput value={email} onChangeText={(text) => emailHandler(text)} underlineColor="black"
                               activeUnderlineColor="#0e76a8" style={styles.textInput} label="Email or Phone"/>
                    <TextInput value={password} onChangeText={(text) => passwordHandler(text)} underlineColor="black"
                               activeUnderlineColor="#0e76a8" autoCapitalize='none' secureTextEntry={!isShowPassword}
                               style={styles.textInput} label="Password" ref={passwordRef}
                               right={<TextInput.Icon onPress={showPasswordHandler} forceTextInputFocus={false}
                                                      name={textIcon}/>}/>
                    <View style={{
                        width: 230,
                        height: 70,
                        marginLeft: 15,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <NativeBaseProvider>
                            <Checkbox value="true" defaultIsChecked accessibilityLabel="checkbox"/>
                        </NativeBaseProvider>
                        <Text style={{fontSize: 15, fontWeight: '500'}}>Remember me.</Text>
                        <Text style={{fontSize: 15, marginLeft: 5, fontWeight: '500', color: '#0e76a8'}}>Learn
                            more</Text>
                    </View>
                    <Text style={{marginLeft: 15, color: "#0e76a8", fontWeight: "500"}}>Forgot password?</Text>
                    <TouchableOpacity style={styles.continueButton} onPress={continueHandler}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container4}>
                    <View style={styles.lineContainer}>
                        <View style={styles.line1}/>
                        <Text style={{color: 'gray', fontSize: 16, fontWeight: '600'}}>or</Text>
                        <View style={styles.line2}/>
                    </View>
                    <TouchableOpacity style={styles.signInButton} onPress={onGoogleButtonPress}>
                        <Image style={styles.buttonIcon}
                               source={require('../../../../assets/images/google-button.png')}/>
                        <Text style={styles.signInButtonText}>Sign in with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signInButton}>
                        <Image style={styles.buttonIcon}
                               source={require('../../../../assets/images/apple-button.png')}/>
                        <Text style={styles.signInButtonText}>Sign in with Apple</Text>
                    </TouchableOpacity>
                </View>
                {isError && (
                    <View style={{position: 'absolute', flex: 1, justifyContent: 'center', width: width, height: height}}>
                        <NativeBaseProvider>
                            <AlertComp title="Sign in failed!" message={errorMessage} status="error"/>
                        </NativeBaseProvider>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
