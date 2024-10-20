// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation } from '@react-navigation/native';
import MatchesStyle from '../styles/MatchesStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';

const Tournaments = () => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();


    // Determine the profile and lock icon based on the theme
    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    return (
        <ScrollView style={[MatchesStyle.container, { backgroundColor: colors.background }]}>
            <View style={MatchesStyle.header}>
                <View style={MatchesStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[MatchesStyle.title, { color: colors.text }]}>Tournaments</Text>
                <Image source={userIcon} style={MatchesStyle.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={MatchesStyle.iconSearch} />
            </View>

            <View style={MatchesStyle.middleText}>
                <Text style={[MatchesStyle.welTxt, { color: colors.text }]}>Start playing Tournaments</Text>
            </View>
            <View style={MatchesStyle.centeredContent}>
                <View style={MatchesStyle.cardContainer}>
                    <LinearGradient
                        colors={['#000000', '#434343']} // Define your gradient colors
                        start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                        end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                        style={MatchesStyle.card} // Apply the gradient to the button style
                    >
                        <View style={[MatchesStyle.AvsBIcon]}>
                            <Image source={AvsB} style={MatchesStyle.cardIcon}></Image>
                        </View>
                    </LinearGradient>
                </View>

                <View style={MatchesStyle.addCardContainer}>

                    <TouchableOpacity >
                        <LinearGradient
                            colors={['#FEC570', '#F7A01F']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={MatchesStyle.addCard} // Apply the gradient to the button style
                        >
                            <View style={[MatchesStyle.addIconContainer]}>
                                <FontAwesome6 name="arrows-spin" size={60} color={"black"} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={[MatchesStyle.addTxt, { color: colors.text }]}>Ongoing Tournament</Text>

                    <TouchableOpacity onPress={() => (navigation.navigate('EnterTournamentName'))}>
                        <LinearGradient
                            colors={['#FEC570', '#F7A01F']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={MatchesStyle.addCard} // Apply the gradient to the button style
                        >
                            <View style={[MatchesStyle.addIconContainer]}>
                                <FontAwesome name="plus" size={60} color={"black"} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={[MatchesStyle.ongoingTxt, { color: colors.text }]}>New Tournament</Text>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#FEC570', '#F7A01F']} // Define your gradient colors
                            start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                            end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                            style={MatchesStyle.addCard} // Apply the gradient to the button style
                        >
                            <View style={[MatchesStyle.addIconContainer]}>
                                <FontAwesome name="history" size={60} color={"black"} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={[MatchesStyle.historyTxt, { color: colors.text, marginLeft: -35 }]}>Tournaments History</Text>

                </View>
            </View>
        </ScrollView>
    );
};

export default Tournaments;
