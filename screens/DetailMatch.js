// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation, useRoute } from '@react-navigation/native';
import MatchesStyle from '../styles/MatchesStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const DetailMatch = () => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();
    const [overs, setOvers] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(null); // Track selected team for batting first\
    const [selectedOver, setSelectedOver] = useState(null); // Track selected team for batting first
    const route = useRoute(); // Use the route prop
    const { teamName1, teamName2, players } = route.params; // Destructure team names and players

    const isButtonDisabled = !selectedTeam || !selectedOver ;
    // Now you can use teamName1, teamName2, and players in your component
    console.log('Team 1:', teamName1);
    console.log('Team 2:', teamName2);
    console.log('Players:', players);

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
                <Text style={[MatchesStyle.title, { color: colors.text }]}>Matches</Text>
                <Image source={userIcon} style={MatchesStyle.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={MatchesStyle.iconSearch} />
            </View>

            <View style={MatchesStyle.middleText}>
                <Text style={[MatchesStyle.welTxt, { color: colors.text }]}>Enter Match Details</Text>
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

                <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Select Overs</Text>

                <View style={MatchesStyle.overCardContainer}>
                <TouchableOpacity style={[MatchesStyle.oversCard, { borderColor: selectedOver == 5 ? 'orange' : '#E61717' }]}
                        onPress={() => setSelectedOver(5)}>
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.overText}>05</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[MatchesStyle.oversCard, { borderColor: selectedOver == 10 ? 'orange' : '#E61717' }]}
                        onPress={() => setSelectedOver(10)}>
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.overText}>10</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[MatchesStyle.oversCard, { borderColor: selectedOver == 15 ? 'orange' : '#E61717' }]}
                        onPress={() => setSelectedOver(15)}>
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.overText}>15</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[MatchesStyle.oversCard, { borderColor: selectedOver == 20 ? 'orange' : '#E61717' }]}
                        onPress={() => setSelectedOver(20)}>
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.overText}>20</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[MatchesStyle.oversCard, { borderColor: selectedOver == 50 ? 'orange' : '#E61717' }]}
                        onPress={() => setSelectedOver(50)}>
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.overText}>50</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={MatchesStyle.line}></View>

                <View style={MatchesStyle.inputContainer}>
                    <MaterialIcons name="sports-baseball" size={30} color="black" style={MatchesStyle.inputIcon} />
                    <TextInput
                        style={[MatchesStyle.input, { color: colors.text }]}
                        placeholder="Enter Custom Overs Here"
                        placeholderTextColor={colors.text}
                        value={overs}
                        onChangeText={setOvers}
                    />
                </View>

                <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Who's Batting First</Text>

                <View style={MatchesStyle.overCardContainer}>
                    <TouchableOpacity style={[MatchesStyle.tossCard, { borderColor: selectedTeam == teamName1 ? 'orange' : '#E61717' }]}
                        onPress={() => setSelectedTeam(teamName1)}>
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.tossText}>{teamName1}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[MatchesStyle.tossCard, { borderColor: selectedTeam == teamName2 ? 'orange' : '#E61717' }]}
                        onPress={() => setSelectedTeam(teamName2)}>
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.tossText}>{teamName2}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[MatchesStyle.button, { backgroundColor: isButtonDisabled ? 'gray' : 'red' }]}
                    disabled={isButtonDisabled} // Disable button if fields are not filled
                    onPress={() => (navigation.navigate('Scoreboard'))}
                >
                    <Text style={[MatchesStyle.buttonText, { color: 'white' }]}>
                        NEXT
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default DetailMatch;
