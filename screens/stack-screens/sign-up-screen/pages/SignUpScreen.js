import React, {useRef, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from "react-native-paper";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import {useDispatch} from "react-redux";
import {signUp} from "../redux/signUpAction";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: height - 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    container1: {
        width: width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 80,
        height: 20,
        top: 20,
        left: 15
    },
    container2: {
        width: width,
        flex: 1,
        justifyContent: 'center',
    },
    joinIn: {
        color: 'black',
        left: 10,
        fontSize: 35,
        fontWeight: '700'
    },
    container3: {
        width: width,
        flex: 2,
    },
    textInput: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        backgroundColor: 'none'
    },
    continueButton: {
        backgroundColor: '#0e76a8',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
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
        flex: 4,
        width: width,
    },
    lineContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    line1: {
        borderColor: '#eaeaea',
        borderWidth: 0.2,
        width: 160,
    },
    line2: {
        borderColor: '#eaeaea',
        borderWidth: 0.2,
        width: 160
    },
    signInButton: {
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
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

const SignUpScreen = ({navigation}) => {
    GoogleSignin.configure({
        webClientId: "692520736274-v94hpvgi3o29lm88nfop5u8gls1jc4vt.apps.googleusercontent.com"
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState({
        firstName: '',
        lastName: ''
    });
    const [textIcon, setTextIcon] = useState('eye');
    const [isShowPasswordInput, setShowPasswordInput] = useState(false);
    const [isShowPassword, setShowPassword] = useState(false);
    const [isShowTextFields, setShowTextFields] = useState(false);
    const passwordRef = useRef(null);
    const [continueButtonTitle, setContinueButtonTitle] = useState('Continue');
    const [count, setCount] = useState(0);

    // dispatcher
    const dispatch = useDispatch();

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

    const userNameHandler = (value, position) => {
        const temp = {...userName};
        temp[position] = value;
        setUserName({...temp});
    }

    const continueHandler = () => {
        setCount(count + 1);
        if (!isShowPasswordInput) {
            setShowPasswordInput(true);
        } else {
            if (count === 1) {
                setShowTextFields(true);
                setContinueButtonTitle('Agree & Join');
            } else if (count > 1) {
                dispatch(signUp({email: email, password: password}, userName));
            }
        }
    }

    async function onGoogleButtonPress() {
        // Get the users ID token
        const {idToken} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential).then((user) => {
            console.log(user);
        });
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.root}>
                <View style={styles.container1}>
                    <Image style={styles.logo} source={require('../../../../assets/images/linkedln-logo.png')}/>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.joinIn}>Join LinkedIn</Text>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: 75,
                        marginLeft: 15
                    }}>
                        <Text style={{fontSize: 18, fontWeight: '600'}}>or</Text>
                        <Text onPress={() => navigation.reset({index: 0, routes: [{name: 'SignInScreen'}]})}
                              style={{fontSize: 18, fontWeight: '600', color: '#0e76a8'}}>sign in</Text>
                    </View>
                </View>
                <View style={styles.container3}>
                    {!isShowTextFields && (
                        <TextInput value={email}
                                   onChangeText={emailHandler}
                                   underlineColor="black"
                                   activeUnderlineColor="#0e76a8"
                                   style={styles.textInput}
                                   label="Email or Phone*"
                        />
                    )}
                    {isShowPasswordInput && !isShowTextFields && (
                        <TextInput value={password}
                                   onChangeText={(text) => passwordHandler(text)}
                                   underlineColor="black"
                                   activeUnderlineColor="#0e76a8"
                                   autoCapitalize='none'
                                   secureTextEntry={!isShowPassword}
                                   style={styles.textInput}
                                   label="Password*"
                                   ref={passwordRef}
                                   right={<TextInput.Icon onPress={showPasswordHandler} forceTextInputFocus={false} name={textIcon}/>}/>
                    )}
                    {isShowTextFields && (
                        <View>
                            <TextInput value={userName.firstName}
                                       onChangeText={(text) => userNameHandler(text, 'firstName')}
                                       underlineColor="black"
                                       activeUnderlineColor="#0e76a8"
                                       style={styles.textInput}
                                       label="First name*"
                            />
                            <TextInput value={userName.lastName}
                                       onChangeText={(text) => userNameHandler(text, 'lastName')}
                                       underlineColor="black"
                                       activeUnderlineColor="#0e76a8"
                                       style={styles.textInput}
                                       label="Last name*"
                            />
                        </View>
                    )}
                    <TouchableOpacity style={styles.continueButton} onPress={continueHandler}>
                        <Text style={styles.continueButtonText}>{continueButtonTitle}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container4}>
                    {!isShowPasswordInput && (
                        <View>
                            <View style={styles.lineContainer}>
                                <View style={styles.line1}/>
                                <Text style={{color: 'gray', fontSize: 16, fontWeight: '600'}}>or</Text>
                                <View style={styles.line2}/>
                            </View>
                            <TouchableOpacity style={styles.signInButton} onPress={onGoogleButtonPress}>
                                <Image style={styles.buttonIcon}
                                       source={require('../../../../assets/images/google-button.png')}/>
                                <Text style={styles.signInButtonText}>Continue with Google</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;
