// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation } from '@react-navigation/native';
import DashboardStyles from '../styles/DashboardStyles';
import Icon from 'react-native-vector-icons/Feather'; // Import FontAwesome icons
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import FontAwesome icons
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import FontAwesome icons
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Circle from 'react-native-svg';
import { Svg, Defs, Stop } from 'react-native-svg';

const Dashboard = () => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const speed = 92;
    const Accuracy = 55;
    const maxSpeed = 100; // Define the maximum speed
    const fillValue = Math.min((speed / maxSpeed) * 100, 100); // Ensure it doesn't exceed 100


    // Determine the profile and lock icon based on the theme
    const wicketIcon = colors.background === '#333' ? require('../assets/icons/wicket_white.png') : require('../assets/icons/wicket.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');
    const wicketIconWhite = require('../assets/icons/WC.png');

    return (
        <ScrollView style={[DashboardStyles.container, { backgroundColor: colors.background }]}>
            <View style={DashboardStyles.header}>
                <Text style={[DashboardStyles.title, { color: colors.text }]}>Dashboard</Text>
                <Image source={userIcon} style={DashboardStyles.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={DashboardStyles.iconSearch} />
            </View>

            <View style={DashboardStyles.middleText}>
                <Text style={[DashboardStyles.helloTxt, { color: "red" }]}>Hello,</Text>
                <Text style={[DashboardStyles.welTxt, { color: colors.text }]}>Welcome to MatchMate</Text>
            </View>
            <View style={DashboardStyles.centeredContent}>
                <View style={DashboardStyles.cardContainer}>
                    <TouchableOpacity onPress={() => (navigation.navigate('Matches'))}>
                        <LinearGradient
                            colors={['#FEC570', '#F7A01F']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={DashboardStyles.card} // Apply the gradient to the button style
                        >
                            <Text style={[DashboardStyles.cardTxt, { color: colors.text }]}>
                                Matches
                            </Text>
                            <Text style={[DashboardStyles.cardTxt2, { color: colors.text }]}>
                                Record your matches history
                            </Text>
                            <View style={[DashboardStyles.iconContainer]}>
                                <AntDesign name="caretright" size={20} color={colors.text} />
                            </View>
                            <View style={[DashboardStyles.wicketIcon]}>
                                <Image source={wicketIcon} style={DashboardStyles.cardIcon}></Image>
                            </View>

                            <Text style={[DashboardStyles.cardTxt3, { color: colors.text }]}>
                                Last Activity
                            </Text>
                            <Text style={[DashboardStyles.cardTxt4, { color: colors.text }]}>
                                Friendly Match Score Card
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={DashboardStyles.speedCardContainer}>
                    <TouchableOpacity onPress={() => (navigation.navigate('BallVision'))}>
                        <LinearGradient
                            colors={['#434343', '#000000']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={DashboardStyles.speedCard} // Apply the gradient to the button style
                        >
                            <Text style={[DashboardStyles.speedCardTxt, { color: "white" }]}>
                                Ball Vision
                            </Text>
                            <Text style={[DashboardStyles.speedCardTxt2, { color: "white" }]}>
                                Record your bowling speed
                            </Text>
                            <View style={[DashboardStyles.speedIconContainer]}>
                                <AntDesign name="caretright" size={15} color={"white"} />
                            </View>
                            {/* <View style={[DashboardStyles.wicketIcon]}>
                                <Image source={wicketIcon} style={DashboardStyles.cardIcon}></Image>
                            </View> */}

                            <AnimatedCircularProgress
                                size={130} // Size of the circular progress
                                radius={120}
                                width={10} // Width of the progress bar
                                fill={fillValue} // Fill percentage based on speed (max 100)
                                tintColor="#F79E1B" // Progress color
                                style={DashboardStyles.progressbar}
                                rotation={0}
                                backgroundColor="#7F6C50" // Background color of the circle
                                strokeLinecap="round" // Set to round for smoother edges
                                renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
                            >
                                {
                                    (fill) => (
                                        <Text style={[DashboardStyles.speedCardTxt3, { color: "white" }]}>
                                            {speed}
                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <Text style={[DashboardStyles.speedCardTxt4, { color: "white" }]}>
                                Kph
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => (navigation.navigate('ActionTrack'))}>
                        <LinearGradient
                            colors={['#434343', '#000000']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={DashboardStyles.speedCard} // Apply the gradient to the button style
                        >
                            <Text style={[DashboardStyles.speedCardTxt, { color: "white" }]}>
                                Action Track
                            </Text>
                            <Text style={[DashboardStyles.speedCardTxt2, { color: "white" }]}>
                                Record your bowling action
                            </Text>
                            <View style={[DashboardStyles.speedIconContainer]}>
                                <AntDesign name="caretright" size={15} color={"white"} />
                            </View>
                            {/* <View style={[DashboardStyles.wicketIcon]}>
                                <Image source={wicketIcon} style={DashboardStyles.cardIcon}></Image>
                            </View> */}

                            <AnimatedCircularProgress
                                size={130} // Size of the circular progress
                                radius={120}
                                width={10} // Width of the progress bar
                                fill={Accuracy} // Fill percentage based on speed (max 100)
                                tintColor="#EB011B" // Progress color
                                style={DashboardStyles.progressbar}
                                rotation={0}
                                backgroundColor="#804A51" // Background color of the circle
                                strokeLinecap="round" // Set to round for smoother edges
                                renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
                            >
                                {
                                    (fill) => (
                                        <Text style={[DashboardStyles.speedCardTxt3, { color: "white"}]}>
                                            {Accuracy}
                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                            <Text style={[DashboardStyles.speedCardTxt4, { color: "white" }]}>
                                Accuracy
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={DashboardStyles.cardContainer}>
                    <TouchableOpacity onPress={() => (navigation.navigate('Tournaments'))}>
                        <LinearGradient
                            colors={['#EB3F40', '#EC0820']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={DashboardStyles.card} // Apply the gradient to the button style
                        >
                            <Text style={[DashboardStyles.cardTxt, { color: "white" }]}>
                                Tournaments
                            </Text>
                            <Text style={[DashboardStyles.cardTxt2, { color: "white" }]}>
                                Record your tournaments history
                            </Text>
                            <View style={[DashboardStyles.iconContainer]}>
                                <AntDesign name="caretright" size={20} color={"white"} />
                            </View>
                            <View style={[DashboardStyles.wicketIcon]}>
                                <Image source={wicketIconWhite} style={DashboardStyles.cardIcon2}></Image>
                            </View>

                            <Text style={[DashboardStyles.cardTxt3, { color: "white" }]}>
                                Last Activity
                            </Text>
                            <Text style={[DashboardStyles.cardTxt4, { color: "white" }]}>
                                Friendly Tournament
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={DashboardStyles.speedCardContainer}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#434343', '#000000']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={DashboardStyles.statsCard} // Apply the gradient to the button style
                        >
                            <Text style={[DashboardStyles.statsCardTxt, { color: "white" }]}>
                                Stats
                            </Text>
                            <View style={[DashboardStyles.speedIconContainer]}>
                                <AntDesign name="caretright" size={15} color={"white"} />
                            </View>
                            <View style={[DashboardStyles.settingIconContainer]}>
                                <Ionicons name="analytics-sharp" size={34} color={"orange"} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#434343', '#000000']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={DashboardStyles.statsCard} // Apply the gradient to the button style
                        >
                            <Text style={[DashboardStyles.statsCardTxt, { color: "white" }]}>
                                Setting
                            </Text>
                            <View style={[DashboardStyles.speedIconContainer]}>
                                <AntDesign name="caretright" size={15} color={"white"} />
                            </View>
                            <View style={[DashboardStyles.settingIconContainer]}>
                                <Ionicons name="settings" size={27} color={"red"} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

export default Dashboard;
