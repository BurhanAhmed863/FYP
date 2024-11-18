import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import EnterPlayersStyle from '../styles/EnterPlayersStyle';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import CustomPopup from '../Modal/CustomPopup';
import apiConnection from './apiConnection';

const EnterTournamentPlayers = ({ route }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { noOfTeam, teamNames, selectedTournamentType } = route.params; // Get number of teams and their names
    const { apiIp } = apiConnection;

    const initialPlayersState = Array.from({ length: noOfTeam }, () => Array(11).fill(''));
    const [teamsPlayers, setTeamsPlayers] = useState(initialPlayersState);
    const [currentTeam, setCurrentTeam] = useState(0); // Track which team's players are being entered
    const [loading, setLoading] = useState(false); // Loader state

    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    // Handle player name input
    const handlePlayerChange = (teamIndex, playerIndex, value) => {
        const updatedTeams = [...teamsPlayers];
        updatedTeams[teamIndex][playerIndex] = value;
        setTeamsPlayers(updatedTeams);
    };

    // Determine if "Next" or "Finish" button should be enabled
    const isButtonDisabled = teamsPlayers[currentTeam].some((name) => name.trim() === '');

    // Handle "Next Team" button click
    const handleNextTeam = () => {
        if (isButtonDisabled) {
            Alert.alert('Error', `Please fill all 11 player names for ${teamNames[currentTeam]}`);
        } else {
            setCurrentTeam((prev) => prev + 1);
        }
    };

    // Handle "Finish" button click
    const handleFinish = async () => {
        if (isButtonDisabled) {
            Alert.alert('Error', `Please fill all 11 player names for ${teamNames[currentTeam]}`);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${apiIp}/tournamenPlayerName.php`, {
                teamsPlayers,
                teamNames,
            });
            console.log(response.data);
            if (response.data.status === 'success') {
                Alert.alert('Success', 'All players submitted successfully!');
                navigation.navigate('DetailMatch', { teamsPlayers, teamNames });
                setTeamsPlayers(initialPlayersState); // Reset after submission
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to submit players. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={[EnterPlayersStyle.container, { backgroundColor: colors.background }]}>
            <View style={EnterPlayersStyle.header}>
                <View style={EnterPlayersStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <AntDesign name="caretleft" size={25} color="#EB001B" />
                    </TouchableOpacity>
                </View>
                <Text style={[EnterPlayersStyle.title, { color: colors.text }]}>Matches</Text>
                <Image source={userIcon} style={EnterPlayersStyle.icon} />
                <Icon name="search" size={23} color="#f79e1b" style={EnterPlayersStyle.iconSearch} />
            </View>

            <View style={EnterPlayersStyle.middleText}>
                <Text style={[EnterPlayersStyle.welTxt, { color: colors.text }]}>
                    Enter player names for {teamNames[currentTeam]}
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

                    {teamsPlayers[currentTeam].map((playerName, index) => (
                        <View key={index} style={EnterPlayersStyle.inputContainer}>
                            <MaterialCommunityIcons name="cricket" size={25} style={EnterPlayersStyle.inputIcon} color={colors.text} />
                            <TextInput
                                style={[EnterPlayersStyle.input, { color: colors.text }]}
                                placeholder={`Player ${index + 1}`}
                                placeholderTextColor={colors.text}
                                value={playerName}
                                onChangeText={(value) => handlePlayerChange(currentTeam, index, value)}
                            />
                        </View>
                    ))}

                    <TouchableOpacity
                        style={[EnterPlayersStyle.button, { backgroundColor: isButtonDisabled ? 'gray' : 'red' }]}
                        onPress={currentTeam < noOfTeam - 1 ? handleNextTeam : handleFinish}
                    >
                        <Text style={[EnterPlayersStyle.buttonText, { color: 'white' }]}>
                            {currentTeam < noOfTeam - 1 ? `Next Team (${teamNames[currentTeam + 1]})` : 'Finish'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomPopup visible={loading} message="Submitting players..." />
        </ScrollView>
    );
};

export default EnterTournamentPlayers;
