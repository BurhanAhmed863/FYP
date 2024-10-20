import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation } from '@react-navigation/native';
import EnterTeamStyle from '../styles/EnterTeamStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import CustomPopup from '../Modal/CustomPopup'; // Import your loader
import axios from 'axios'; // Import axios
import apiConnection from './apiConnection';
import EnterTournamentsStyle from '../styles/EnterTournamentsStyle';

const EnterTournamentName = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [tournamentName, setTournamentName] = useState('');
    const [noOfTeam, setNoOfTeam] = useState('');
    const [loading, setLoading] = useState(false); // State for loader
    const [selectedTournamentType, setSelectedTournamentType] = useState(null);
    const { apiIp } = apiConnection;

    const isTypeDisable = !(tournamentName && noOfTeam); // Check if both fields are filled
    const isButtonDisabled = !(tournamentName && noOfTeam && selectedTournamentType); // Check if both fields are filled
    // Determine the profile and lock icon based on the theme
    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');
    const teamIcon = colors.background === '#333' ? require('../assets/icons/teamIcon.png') : require('../assets/icons/teamIcon.png');
    // Function to handle team submission

    const handleTournamentType = (type) => {
        setSelectedTournamentType(prevType => (prevType === type ? null : type));
    };
    const handleTeam = async () => {
        navigation.navigate('EnterTournamentTeamName',{tournamentName, noOfTeam});
        // if (isButtonDisabled) return;

        // setLoading(true); // Show loader

        // try {
        //     const response = await axios.post(`${apiIp}/teamName.php`, {
        //         teamName1,
        //         teamName2
        //     });

        //     const result = response.data;

        //     if (result.status === 'success') {
        //         navigation.navigate('EnterPlayers', { teamName1, teamName2 });
        //         console.log(result.message);
        //         setTeam1('');
        //         setTeam2('');
        //     } else {
        //         console.log(result.message);
        //         Alert.alert('Error', result.message); // Show error message if any
        //     }
        // } catch (error) {
        //     Alert.alert('Error', 'Something went wrong. Please try again later.');
        // }
        //  finally {
        //     setLoading(false); // Hide loader
        // }
    };

    return (
        <ScrollView style={[EnterTeamStyle.container, { backgroundColor: colors.background }]}>
            <View style={EnterTeamStyle.header}>
                <View style={EnterTeamStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[EnterTeamStyle.title, { color: colors.text }]}>Tournaments</Text>
                <Image source={userIcon} style={EnterTeamStyle.icon} />
                <Icon name="search" size={23} color="#f79e1b" style={EnterTeamStyle.iconSearch} />
            </View>

            <View style={EnterTeamStyle.middleText}>
                <Text style={[EnterTeamStyle.welTxt, { color: colors.text }]}>Enter Tournament Name</Text>
            </View>
            <View style={EnterTeamStyle.centeredContent}>
                <View style={EnterTeamStyle.cardContainer}>
                    <LinearGradient
                        colors={['#000000', '#434343']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={EnterTeamStyle.card}
                    >
                        <View style={[EnterTeamStyle.AvsBIcon]}>
                            <Image source={AvsB} style={EnterTeamStyle.cardIcon}></Image>
                        </View>
                    </LinearGradient>

                    <View style={EnterTeamStyle.inputContainer}>
                        <Image source={teamIcon} style={EnterTeamStyle.inputIcon} />
                        <TextInput
                            style={[EnterTeamStyle.input, { color: colors.text }]}
                            placeholder="Enter name here"
                            placeholderTextColor={colors.text}
                            value={tournamentName}
                            onChangeText={setTournamentName}
                        />
                    </View>

                    <View style={EnterTeamStyle.inputContainer}>
                        <Image source={teamIcon} style={EnterTeamStyle.inputIcon} />
                        <TextInput
                            style={[EnterTeamStyle.input, { color: colors.text }]}
                            placeholder="No of Teams"
                            placeholderTextColor={colors.text}
                            value={noOfTeam}
                            onChangeText={setNoOfTeam}
                            keyboardType="numeric"
                        />
                    </View>

                    {!isTypeDisable && (
                        <>
                            <Text style={EnterTournamentsStyle.tText}>Type of Tournament</Text>
                            <View style={EnterTournamentsStyle.speedCardContainer}>
                                <TouchableOpacity style={[EnterTournamentsStyle.statsCard, { backgroundColor: selectedTournamentType === 'League' ? 'red' : '#000000' }]}
                                    onPress={() => handleTournamentType('League')}>
                                    <Text style={[EnterTournamentsStyle.statsCardTxt, { color: "white" }]}>
                                        League Based
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[EnterTournamentsStyle.statsCard, { backgroundColor: selectedTournamentType === 'Knocked-Out' ? 'red' : '#000000' }]}
                                    onPress={() => handleTournamentType('Knocked-Out')}>
                                    <Text style={[EnterTournamentsStyle.statsCardTxt, { color: "white" }]}>
                                        Knocked-Out Based
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    <TouchableOpacity
                        style={[EnterTeamStyle.button, { backgroundColor: isButtonDisabled ? 'gray' : 'red' }]}
                        onPress={handleTeam}
                        // disabled={isButtonDisabled} // Disable button if fields are not filled
                    >
                        <Text style={[EnterTeamStyle.buttonText, { color: 'white' }]}>
                            NEXT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Loader popup */}
            <CustomPopup visible={loading} message="Loading..." />
        </ScrollView>
    );
};

export default EnterTournamentName;
