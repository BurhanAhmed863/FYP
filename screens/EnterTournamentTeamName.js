import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation } from '@react-navigation/native';
import EnterPlayersStyle from '../styles/EnterPlayersStyle';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import CustomPopup from '../Modal/CustomPopup'; // Import your loader
import apiConnection from './apiConnection';

const EnterTournamentTeamName = ({ route }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { tournamentName, noOfTeam } = route.params; // Get team names from params
    const { apiIp } = apiConnection;
    const team = parseInt(noOfTeam, 10);
    const [teamNames, setTeamNames] = useState(Array(team).fill(''));
    console.log(team, tournamentName, teamNames);
    const [currentTeam, setCurrentTeam] = useState(1); // 1 for team 1, 2 for team 2
    const [team1Players, setTeam1Players] = useState([]); // To store team 1's players
    const [loading, setLoading] = useState(false); // State for loader

    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    // Determine if the button should be disabled
    const isButtonDisabled = teamNames.some((name) => name.trim() === '');
    // Save team 1 data and move to team 2
    const handleChange = (index, value) => {
        const newTeamNames = [...teamNames];
        newTeamNames[index] = value;
        setTeamNames(newTeamNames);
    };

    // Submit both teams' data
    const handleFinish = async () => {

    };


    return (
        <ScrollView style={[EnterPlayersStyle.container, { backgroundColor: colors.background }]}>
            <View style={EnterPlayersStyle.header}>
                <View style={EnterPlayersStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[EnterPlayersStyle.title, { color: colors.text }]}>Tournaments</Text>
                <Image source={userIcon} style={EnterPlayersStyle.icon} />
                <Icon name="search" size={23} color="#f79e1b" style={EnterPlayersStyle.iconSearch} />
            </View>

            <View style={EnterPlayersStyle.middleText}>
                <Text style={[EnterPlayersStyle.welTxt, { color: colors.text }]}>
                    Enter team names
                </Text>
            </View>

            <View style={EnterPlayersStyle.centeredContent}>
                <View style={EnterPlayersStyle.cardContainer}>
                    <LinearGradient
                        colors={['#000000', '#434343']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={EnterPlayersStyle.card}
                    >
                        <View style={[EnterPlayersStyle.AvsBIcon]}>
                            <Image source={AvsB} style={EnterPlayersStyle.cardIcon}></Image>
                        </View>
                    </LinearGradient>

                    {teamNames.map((name, index) => (
                        <View key={index} style={EnterPlayersStyle.inputContainer}>
                            <MaterialCommunityIcons name="cricket" size={25} style={EnterPlayersStyle.inputIcon} color={colors.text} />
                            <TextInput
                                style={[EnterPlayersStyle.input, { color: colors.text }]}
                                placeholder={`Team ${index + 1} name`}
                                placeholderTextColor={colors.text}
                                value={name}
                                onChangeText={(value) => handleChange(index, value)}
                            />
                        </View>
                    ))}

                    <TouchableOpacity
                        style={[EnterPlayersStyle.button, { backgroundColor: isButtonDisabled ? 'grey' : 'red' }]}
                        onPress={handleFinish}
                        disabled={isButtonDisabled}
                    >
                        <Text style={[EnterPlayersStyle.buttonText, { color: 'white' }]}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default EnterTournamentTeamName;
