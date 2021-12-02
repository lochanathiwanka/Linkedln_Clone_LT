import React from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
   root: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'white'
   },
    imageContainer: {
        flex: 2,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        top: 100,
        width: 250,
        height: 65
    },
    progressContainer: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const LoaderScreen = () => {
    return (
        <View style={styles.root}>
            <StatusBar animated={true} barStyle="light-content" backgroundColor="#0e76a8"/>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../../../assets/images/linkedln-logo.png')}/>
            </View>
            <View style={styles.progressContainer}>
                <Image source={require('../../../../assets/images/divider.png')}/>
            </View>
        </View>
    );
};

export default LoaderScreen;
