import React, { useState, useEffect } from 'react';
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
import RNPickerSelect from 'react-native-picker-select';

const DetailMatch = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [overs, setOvers] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedOver, setSelectedOver] = useState(null);
    const [tossWinner, setTossWinner] = useState(null);
    const [team1, setTeam1] = useState(null);  // Store team1
    const [team2, setTeam2] = useState(null);  // Store team2
    const [matchId, setMacthId] = useState(null);  // Store team2
    const [team1Id, setTeam1Id] = useState(null);  // Store team 1 ID
    const [team2Id, setTeam2Id] = useState(null);  // Store team 2 ID
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false); // State for loader
    const { apiIp } = apiConnection;

    useEffect(() => {
        // Fetch team data when the component mounts
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${apiIp}/fetchTeams.php`);
                if (response.data.status === 'success') {
                    setTeams(response.data.teams);
                } else {
                    console.error('Error fetching teams:', response.data.message);
                    alert('Failed to load teams');
                }
            } catch (error) {
                console.error('Error occurred:', error);
                alert('An error occurred while loading teams. Please try again.');
            }
        };

        fetchTeams();
    }, []);

    const isValidCustomOvers = (value) => {
        const number = Number(value);
        return !isNaN(number) && number > 0 && number <= 90;
    };

    const handleSelectOver = (over) => {
        setSelectedOver(selectedOver === over ? null : over);
        setOvers('');
    };

    const handleCustomOversChange = (value) => {
        setOvers(value);
        if (isValidCustomOvers(value)) setSelectedOver(null);
    };

    const isButtonEnabled =
    (isValidCustomOvers(overs) || selectedOver) && 
    selectedTeam && 
    tossWinner && 
    team1 && 
    team2;


    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');


    const handleSelectTeam = (team) => {
        setSelectedTeam(selectedTeam === team ? null : team);
    };

    const handleSelectTossWinner = (team) => {
        setTossWinner(tossWinner === team ? null : team);
    };

    const handleSelectTeam1 = (team) => {
        if (team) {
            setTeam1(team);
            setTeam1Id(team.id); 
        }
    };
    
    const handleSelectTeam2 = (team) => {
        if (team) {
            setTeam2(team);
            setTeam2Id(team.id); 
        } 
    };
    
    const handleSubmit = async () => {
        const matchData = {
            team1Id: team1Id,
            team2Id: team2Id,
            totalOvers: selectedOver || overs,
            tossWon: tossWinner.name,
            battingFirst: selectedTeam.id,
            bowlingFirst: selectedTeam.id === team1.id ? team2.id : team1.id,
        };
        console.log('mATCH dATA',matchData);
        setLoading(true);
        try {
            const response = await axios.post(`${apiIp}/insertMatchDetail.php`, matchData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMacthId(response.data.matchId);
            console.log(response.data);
            console.log(response.data.matchId);

            if (response.data.status === 'success') {
                navigation.navigate('Scoreboard', {matchId: response.data.matchId});
                setLoading(false);
            } else {
                console.error('Error saving match details:', response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('An error occurred while saving match details. Please try again.');
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
                            onPress={() => handleSelectOver(over)}
                            disabled={Boolean(overs)}
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
                        onChangeText={handleCustomOversChange}
                        keyboardType="numeric"
                        editable={!selectedOver}
                    />
                </View>

                {/* Dropdowns for Team Selection */}
                <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Select Team 1</Text>
                <RNPickerSelect
                    placeholder={{ label: 'Select Team 1', value: null }}
                    items={[
                        { label: 'None', value: null }, // Adding the "None" option for unselecting
                        ...teams
                            .filter((team) => team !== team2) // Exclude the selected Team 2
                            .map((team) => ({ label: team.name, value: team })),
                    ]}
                    onValueChange={handleSelectTeam1}
                    style={{
                        inputAndroid: {
                            borderColor: '#E61717',
                            color: colors.text,
                            padding: 10,
                            borderRadius: 5,
                        },
                        inputIOS: {
                            borderColor: '#E61717',
                            color: colors.text,
                            padding: 10,
                            borderRadius: 5,
                        }
                    }}
                />

                <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Select Team 2</Text>
                <RNPickerSelect
                    placeholder={{ label: 'Select Team 2', value: null }}
                    items={[
                        { label: 'None', value: null }, // Adding the "None" option for unselecting
                        ...teams
                            .filter((team) => team !== team1) // Exclude the selected Team 1
                            .map((team) => ({ label: team.name, value: team })),
                    ]}
                    onValueChange={handleSelectTeam2}
                    style={{
                        inputAndroid: {
                            borderColor: '#E61717',
                            color: colors.text,
                            padding: 10,
                            borderRadius: 5,
                        },
                        inputIOS: {
                            borderColor: '#E61717',
                            color: colors.text,
                            padding: 10,
                            borderRadius: 5,
                        }
                    }}
                />

                {/* Toss Winner and Batting First Cards */}
                {team1 && team2 && (
                    <>
                        <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Who Won the Toss</Text>
                        <View style={MatchesStyle.overCardContainer}>
                            <TouchableOpacity
                                style={[MatchesStyle.tossCard, { borderColor: tossWinner === team1 ? 'orange' : '#E61717' }]}
                                onPress={() => handleSelectTossWinner(team1)}
                            >
                                <View style={[MatchesStyle.addIconContainer]}>
                                    <Text style={MatchesStyle.tossText}>{team1.name}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[MatchesStyle.tossCard, { borderColor: tossWinner === team2 ? 'orange' : '#E61717' }]}
                                onPress={() => handleSelectTossWinner(team2)}
                            >
                                <View style={[MatchesStyle.addIconContainer]}>
                                    <Text style={MatchesStyle.tossText}>{team2.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={[MatchesStyle.overHeader, { color: "orange" }]}>Who's Batting First</Text>
                        <View style={MatchesStyle.overCardContainer}>
                            <TouchableOpacity
                                style={[MatchesStyle.battingCard, { borderColor: selectedTeam === team1 ? 'orange' : '#E61717' }]}
                                onPress={() => handleSelectTeam(team1)}
                            >
                                <View style={[MatchesStyle.addIconContainer]}>
                                    <Text style={MatchesStyle.tossText}>{team1.name}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[MatchesStyle.battingCard, { borderColor: selectedTeam === team2 ? 'orange' : '#E61717' }]}
                                onPress={() => handleSelectTeam(team2)}
                            >
                                <View style={[MatchesStyle.addIconContainer]}>
                                    <Text style={MatchesStyle.tossText}>{team2.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

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
