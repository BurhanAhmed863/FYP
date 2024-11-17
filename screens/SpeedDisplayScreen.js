import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image, TouchableOpacity } from 'react-native';
import Speedometer from 'react-native-speedometer';
import Orientation from 'react-native-orientation-locker';
import { useTheme } from '../theme/ThemeContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import apiConnection from './apiConnection';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import BallVisionStyle from '../styles/BallVisionStyle';

const SpeedDisplayScreen = ({ route }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { speed } = route.params;
    const speedValue = parseFloat(speed);
    const mph = parseFloat((speed * 0.6213711922).toFixed(2));
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [animatedNumber, setAnimatedNumber] = useState(0);
    const { apiIp } = apiConnection;
    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');


    useEffect(() => {
        Orientation.lockToPortrait();

        Animated.timing(animatedValue, {
            toValue: speedValue,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        const listenerId = animatedValue.addListener(({ value }) => {
            setAnimatedNumber(value);
        });

        return () => {
            animatedValue.removeListener(listenerId);
            Orientation.unlockAllOrientations();
        };
    }, [speedValue]);

    const logSpeed = async () => {
        try {
            const response = await fetch(`${apiIp}/speed.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    speed_kph: speedValue,
                    speed_mph: mph,
                }),
            });
            const data = await response.json();
            console.log(data); // Handle response as needed
            navigation.navigate('Dashboard');
        } catch (error) {
            console.error(error); // Handle error as needed
        }
    };

    return (
        <ScrollView style={[BallVisionStyle.container, { backgroundColor: "#ffffff" }]}>
            <View style={BallVisionStyle.header}>
                <View style={BallVisionStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[BallVisionStyle.title, { color: colors.text }]}>Ball Speed</Text>
                <Image source={userIcon} style={BallVisionStyle.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={BallVisionStyle.iconSearch} />
            </View>

            <View style={BallVisionStyle.middleText}>
                <Text style={[BallVisionStyle.welTxt, { color: colors.text }]}>Speed at Kmh & Mph</Text>
            </View>
            <View style={[BallVisionStyle.centeredContent, {top: hp('6%')}]}>
                <Speedometer
                    value={animatedNumber}
                    totalValue={170}
                    internalColor="green"
                    outerColor="lightgray"
                    style={styles.speedometer}
                    showLabels={false}
                />
                <Text style={[styles.speedText, { marginTop: 70 }]}>Speed: {speed} kph</Text>
                <Text style={[styles.speedText, { marginTop: 10 }]}>Speed: {mph} mph</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={logSpeed}
                >
                    <Text style={[BallVisionStyle.buttonText, { color: 'white' }]}>
                        Finish
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scontainer: {
        flex: 1, // Allow the container to grow
    },
    container: {
        // flex: 1, // Allow the container to grow
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        // paddingBottom: hp('5%'), // Add padding to the bottom for the button
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        fontFamily: 'SignikaNegative-Bold',
    },
    speedText: {
        fontSize: 32,
        fontFamily: 'SignikaNegative-Medium',
        color: '#f79e1b',
    },
    speedometer: {
        width: 200, // Adjust the size as needed
        height: 200,
        marginBottom: 20, // Add space below speedometer
        top: hp('20%'),
    },
    button: {
        // position: 'absolute', // Fix the button's position
        top: hp('5%'), // Position the button at the bottom of the container
        backgroundColor: 'red', // Orange color for the button
        borderRadius: 18,
        padding: hp('2.5%'), // Responsive padding
        width: wp('90%'), // Responsive width
        alignItems: 'center',
        // alignSelf: 'center', // Center the button horizontally
    },
    buttonText: {
        fontSize: wp('7%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: 1,
    },
});

export default SpeedDisplayScreen;
