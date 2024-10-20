import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import MatchesStyle from '../styles/MatchesStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import apiConnection from './apiConnection';
import CustomPopup from '../Modal/CustomPopup';

const DetailMatch = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [overs, setOvers] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedOver, setSelectedOver] = useState(null);
    const [tossWinner, setTossWinner] = useState(null);
    const { teamName1, teamId1, teamName2, teamId2 } = useRoute().params;
    const [loading, setLoading] = useState(false); // State for loader
    const { apiIp } = apiConnection;

    const isValidCustomOvers = (value) => {
        const number = Number(value);
        return !isNaN(number) && number > 0 && number <= 90;
    };

    const arePredefinedOversDisabled = isValidCustomOvers(overs);
    const isButtonEnabled = (isValidCustomOvers(overs) || selectedOver) && selectedTeam && tossWinner;

    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    const handleSelectOver = (over) => {
        setSelectedOver(selectedOver === over ? null : over);
    };

    const handleSelectTeam = (team) => {
        setSelectedTeam(selectedTeam === team ? null : team);
    };
    
    const handleSelectTossWinner = (team) => {
        setTossWinner(tossWinner === team ? null : team);
    };

    const handleSubmit = async () => {
        const matchData = {
            teamId1,
            teamId2,
            totalOvers: selectedOver || overs,
            tossWon: tossWinner,
            battingFirst: selectedTeam,
        };
        console.log(matchData)
        setLoading(true);
        try {
            const response = await axios.post(`${apiIp}/insertMatchDetail.php`, matchData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 'success') {
                navigation.navigate('Scoreboard');
                setLoading(false);
            } else {
                console.error('Error saving match details:', response.data.message);
                alert(response.data.message); // Show an alert for better user feedback
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('An error occurred while saving match details. Please try again.'); // Show a user-friendly error message
        }
    };

    return (
        <ScrollView style={[MatchesStyle.container, { backgroundColor: colors.background }]}>
            <View style={MatchesStyle.header}>
                <View style={MatchesStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[MatchesStyle.title, { color: colors.text }]}>Matches</Text>
                <Image source={userIcon} style={MatchesStyle.icon} />
                <Icon name="search" size={23} color="#f79e1b" style={MatchesStyle.iconSearch} />
            </View>

            <View style={MatchesStyle.middleText}>
                <Text style={[MatchesStyle.welTxt, { color: colors.text }]}>Enter Match Details</Text>
            </View>
            <View style={MatchesStyle.centeredContent}>
                <View style={MatchesStyle.cardContainer}>
                    <LinearGradient
                        colors={['#000000', '#434343']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={MatchesStyle.card}
                    >
                        <View style={[MatchesStyle.AvsBIcon]}>
                            <Image source={AvsB} style={MatchesStyle.cardIcon}></Image>
                        </View>
                    </LinearGradient>
                </View>

                <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Select Overs</Text>

                <View style={MatchesStyle.overCardContainer}>
                    {[5, 10, 15, 20, 50].map((over) => (
                        <TouchableOpacity
                            key={over}
                            style={[MatchesStyle.oversCard, { borderColor: selectedOver === over ? 'orange' : '#E61717' }]}
                            onPress={() => {
                                if (!arePredefinedOversDisabled) {
                                    handleSelectOver(over);
                                }
                            }}
                            disabled={arePredefinedOversDisabled}
                        >
                            <View style={[MatchesStyle.addIconContainer]}>
                                <Text style={MatchesStyle.overText}>{over}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
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
                        keyboardType="numeric"
                    />
                </View>

                <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Who Won the Toss</Text>

                <View style={MatchesStyle.overCardContainer}>
                    <TouchableOpacity
                        style={[MatchesStyle.tossCard, { borderColor: tossWinner === teamName1 ? 'orange' : '#E61717' }]}
                        onPress={() => handleSelectTossWinner(teamName1)}
                    >
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.tossText}>{teamName1}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[MatchesStyle.tossCard, { borderColor: tossWinner === teamName2 ? 'orange' : '#E61717' }]}
                        onPress={() => handleSelectTossWinner(teamName2)}
                    >
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.tossText}>{teamName2}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Who's Batting First</Text>

                <View style={MatchesStyle.overCardContainer}>
                    <TouchableOpacity
                        style={[MatchesStyle.battingCard, { borderColor: selectedTeam === teamName1 ? 'orange' : '#E61717' }]}
                        onPress={() => handleSelectTeam(teamName1)}
                    >
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.tossText}>{teamName1}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[MatchesStyle.battingCard, { borderColor: selectedTeam === teamName2 ? 'orange' : '#E61717' }]}
                        onPress={() => handleSelectTeam(teamName2)}
                    >
                        <View style={[MatchesStyle.addIconContainer]}>
                            <Text style={MatchesStyle.tossText}>{teamName2}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[MatchesStyle.button, { backgroundColor: isButtonEnabled ? 'red' : 'gray' }]}
                    disabled={!isButtonEnabled}
                    onPress={handleSubmit}
                >
                    <Text style={[MatchesStyle.buttonText, { color: 'white' }]}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default DetailMatch;
