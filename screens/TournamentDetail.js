// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'; // Import FontAwesome icons
import AntDesign from 'react-native-vector-icons/AntDesign'; // Import FontAwesome icons
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import FontAwesome icons
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Circle from 'react-native-svg';
import { Svg, Defs, Stop } from 'react-native-svg';
import TournamentDetailStyles from '../styles/TournamentDetailStyles';

const TournamentDetail = () => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();


    // Determine the profile and lock icon based on the theme
    const wicketIcon = colors.background === '#333' ? require('../assets/icons/wicket_white.png') : require('../assets/icons/wicket.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');
    const wicketIconWhite = require('../assets/icons/WC.png');
    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');

    return (
        <ScrollView style={[TournamentDetailStyles.container, { backgroundColor: colors.background }]}>
            <View style={TournamentDetailStyles.header}>
                <Text style={[TournamentDetailStyles.title, { color: colors.text }]}>Dashboard</Text>
                <Image source={userIcon} style={TournamentDetailStyles.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={TournamentDetailStyles.iconSearch} />
            </View>
            <View style={TournamentDetailStyles.middleText}>
                <Text style={[TournamentDetailStyles.welTxt, { color: colors.text }]}>Name of Tournament</Text>
            </View>
            <View style={TournamentDetailStyles.cardContainer}>
                <LinearGradient
                    colors={['#000000', '#434343']} // Define your gradient colors
                    start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                    end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                    style={TournamentDetailStyles.cardTop} // Apply the gradient to the button style
                >
                    <View style={[TournamentDetailStyles.AvsBIcon]}>
                        <Image source={AvsB} style={TournamentDetailStyles.cardIconTop}></Image>
                    </View>
                </LinearGradient>
            </View>

            <View style={TournamentDetailStyles.centeredContent}>

                <View style={TournamentDetailStyles.speedCardContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailMatch')}>
                        <LinearGradient
                            colors={['#EB3F40', '#EC0820']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={TournamentDetailStyles.statsCard} // Apply the gradient to the button style
                        >
                            <Text style={[TournamentDetailStyles.statsCardTxt, { color: "white" }]}>
                                Start Match
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('PointsTable')}>
                        <LinearGradient
                            colors={['#FEC570', '#F7A01F']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={TournamentDetailStyles.statsCard} // Apply the gradient to the button style
                        >
                            <Text style={[TournamentDetailStyles.statsCardTxt, { color: "black" }]}>
                                Points Table
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={TournamentDetailStyles.speedCardContainerBottom}>
                    <TouchableOpacity onPress={() => navigation.navigate('EnterTeam')}>
                        <LinearGradient
                            colors={['#EB3F40', '#EC0820']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={TournamentDetailStyles.statsCard} // Apply the gradient to the button style
                        >
                            <Text style={[TournamentDetailStyles.statsCardTxt, { color: "white" }]}>
                                Squads
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('FixturesScreen')}>
                        <LinearGradient
                            colors={['#EB3F40', '#EC0820']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={TournamentDetailStyles.statsCard} // Apply the gradient to the button style
                        >
                            <Text style={[TournamentDetailStyles.statsCardTxt, { color: "white" }]}>
                                Fixtures
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={TournamentDetailStyles.cardContainer}>
                    <TouchableOpacity onPress={() => (navigation.navigate('TournamentResultsScreen'))}>
                        <LinearGradient
                            colors={['#EB3F40', '#EC0820']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={TournamentDetailStyles.card} // Apply the gradient to the button style
                        >
                            <Text style={[TournamentDetailStyles.cardTxt, { color: "white" }]}>
                                Results
                            </Text>
                            {/* <View style={[TournamentDetailStyles.wicketIcon]}>
                                <Image source={wicketIconWhite} style={TournamentDetailStyles.cardIcon2}></Image>
                            </View> */}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


            </View>
        </ScrollView>
    );
};

export default TournamentDetail;
