import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import EnterTeamStyle from '../styles/EnterTeamStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker, { types } from 'react-native-document-picker'; // Import Document Picker
import CustomPopup from '../Modal/CustomPopup';
import axios from 'axios';
import apiConnection from './apiConnection';

const EnterTeam = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState('');
    const [logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false); // Popup state
    const [newTeamName, setNewTeamName] = useState(''); // New team name
    const [newTeamLogo, setNewTeamLogo] = useState(null); // New team logo
    const [selectedTeam, setSelectedTeam] = useState(null);  // To store selected team
    const [selectedTeamLogo, setSelectedTeamLogo] = useState(null);  // To store selected team
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);  // Modal state
    const [editPopUpVisible, setEditPopupVisible] = useState(false); // Popup state
    const [editTeamName, setEditTeamName] = useState(''); // For editing team name
    const [editTeamLogo, setEditTeamLogo] = useState(null); // For editing team logo

    const { apiIp } = apiConnection;

    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');
    const teamIcon = colors.background === '#333' ? require('../assets/icons/teamIcon.png') : require('../assets/icons/teamIcon.png');

    useEffect(() => {
        // Function to fetch teams
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${apiIp}/fetchTeams.php`);
                const result = response.data;
                // console.log('Result Logos:', result.logos);

                if (result.status === 'success') {
                    if (result.logos && Array.isArray(result.logos)) {
                        const logosWithUrl = result.logos.map(logoObj => {
                            return `${apiIp}/TeamLogo/${logoObj.logo}`;
                        });
                        setLogos(logosWithUrl);  // Set logos with full URLs
                        // console.log('Processed Logos:', logosWithUrl);
                    }
                    setTeams(result.teams);
                } else {
                    // Alert.alert('Error', result.message);
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch teams. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        // Fetch teams initially
        fetchTeams();

        // Set up an interval to fetch teams every 1 second
        const intervalId = setInterval(fetchTeams, 1000);

        // Cleanup the interval when the component unmounts or the effect is re-run
        return () => clearInterval(intervalId);

    }, []); // Empty dependency array to run the effect once on mount


    // Function to handle image picking
    const handleImagePicker = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [types.images], // Restrict to image files
            });

            if (result && result.length > 0) {
                setNewTeamLogo(result[0].uri); // Set the URI of the selected image
            } else {
                Alert.alert('Error', 'No image selected. Please try again.');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled the document picker');
            } else {
                console.error(err);
                Alert.alert('Error', 'Failed to pick an image. Please try again.');
            }
        }
    };

    const cancelButton = () => {
        setPopupVisible(false);
        setEditPopupVisible(false);
        setNewTeamLogo('');
    }

    const handleAddTeam = async () => {
        if (!newTeamName.trim()) {
            Alert.alert('Error', 'Please enter a team name.');
            return;
        }

        const newTeam = {
            name: newTeamName,
            logo: newTeamLogo, // Use the selected logo URI
        };
        setLoading(true);

        try {
            // if (!newTeamLogo) {
            //     // If no logo is selected, proceed without logo
            //     throw new Error('Please select a logo for the team');
            // }

            // Initialize FormData
            const formData = new FormData();
            formData.append('teamName', newTeamName);

            // Check if newTeamLogo is valid
            if (newTeamLogo) {
                formData.append('logo', {
                    uri: newTeamLogo,
                    type: 'image/jpeg', // Adjust based on file type
                    name: 'team_logo.jpg', // Adjust file name
                });
            }

            // Indicate loading before the API call
            setLoading(true);

            // Send the POST request with the form data
            const response = await axios.post(`${apiIp}/teamName.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const result = response.data;
            console.log(response.data);

            // Check if the response is successful
            if (result.status === 'success') {
                Alert.alert('Success', 'Team added successfully!');

                // If the team is added successfully, update the state
                setTeams([...teams, result.team]); // Add the new team to the state
            } else {
                Alert.alert('Error', result.message); // Display error from the server
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }

        setTeams([...teams, newTeam]);
        setNewTeamName(''); // Reset the team name input
        setNewTeamLogo(null); // Reset the logo input
        setPopupVisible(false); // Close the popup
    };

    const handleTeamSubmission = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${apiIp}/teamName.php`, { teams });
            const result = response.data;

            if (result.status === 'success') {
                navigation.navigate('EnterPlayers', { teams: result.teams });
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditTeam = (team, logouri, teamId) => {
        // Set the selected team's details into state for editing
        setEditTeamName(team.name);
        setEditTeamLogo(logouri); // Set the selected team's logo
        setEditPopupVisible(true); // Open the popup for editing
        setSelectedTeam(team);  // Store the selected team for further use if needed
        setTeamId(selectedTeam.id);
        console.log(teamId);
        setOptionsModalVisible(false);
    };

    const handleUpdateTeam = async () => {
        if (!editTeamName.trim()) {
            Alert.alert('Error', 'Please enter a team name.');
            return;
        }

        const updatedTeam = {
            id: selectedTeam.id, // Assuming each team has a unique ID
            name: editTeamName,
            logo: editTeamLogo, // Use the updated logo URI
        };

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('teamId', selectedTeam.id); // Send team ID for update
            formData.append('teamName', editTeamName);

            // Check if newTeamLogo is valid and add it to FormData
            if (editTeamLogo) {
                formData.append('logo', {
                    uri: editTeamLogo,
                    type: 'image/jpeg',
                    name: 'team_logo.jpg',
                });
            }

            const response = await axios.post(`${apiIp}/editTeamName.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const result = response.data;
            console.log(result);

            if (result.status === 'success') {
                Alert.alert('Success', 'Team updated successfully!');

                // Update the teams state with the updated team
                setTeams(teams.map(team => team.id === selectedTeam.id ? updatedTeam : team));
                setEditPopupVisible(false); // Close the modal
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update team. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTeam = async (teamID) => {
        // setTeamId(teamID);
        const team_id = teamID.id;
        console.log(team_id)
        try {
            const response = await fetch(`${apiIp}/deleteTeam.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    team_id: team_id,
                }),
            });
    
            const responseText = await response.text();  // Get the raw response as text
            console.log('Server response:', responseText);  // Log the response to check
    
            const result = JSON.parse(responseText);  // Manually parse the response text
    
            if (result.status === 'success') {
                alert("Team deleted successfully.");
                setOptionsModalVisible(false);
                // Optionally, update the state/UI
            } else {
                alert("Failed to delete team: " + result.message);
            }
        } catch (error) {
            console.error('Error deleting team:', error);
            alert("An error occurred while trying to delete the team.");
        }
    };
    


    const handleViewTeam = (team) => {
        // Implement view team functionality here
        console.log('View team:', team);
        // For example, navigate to a team details page
        setOptionsModalVisible(false);  // Close modal after action
    };

    const handleAddPlayer = (team) => {
        // Implement add player functionality here
        console.log('Add player to team:', team);
        // For example, navigate to a page where the user can add players
        setOptionsModalVisible(false);  // Close modal after action
    };

    const navigateToPlayer = () => {
        navigation.navigate('EnterPlayers', {selectedTeam});
        setOptionsModalVisible(false);
    }
    return (
        <ScrollView style={[EnterTeamStyle.container, { backgroundColor: colors.background }]}>
            <View style={EnterTeamStyle.header}>
                <View style={EnterTeamStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color="#EB001B" />
                    </TouchableOpacity>
                </View>
                <Text style={[EnterTeamStyle.title, { color: colors.text }]}>Matches</Text>
                <Image source={userIcon} style={EnterTeamStyle.icon} />
                <Icon name="search" size={23} color="#f79e1b" style={EnterTeamStyle.iconSearch} />
            </View>

            <View style={EnterTeamStyle.middleText}>
                <Text style={[EnterTeamStyle.welTxt, { color: colors.text }]}>Enter Teams</Text>
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
                    <Modal visible={optionsModalVisible} transparent animationType="fade">
                        <View style={EnterTeamStyle.modalContainer}>
                            <View style={EnterTeamStyle.modalContent}>
                                <View style={EnterTeamStyle.modalTitleContainer}>
                                    <Text style={[EnterTeamStyle.modalTitle, { color: "white" }]}>
                                        {selectedTeam ? selectedTeam.name : 'Team Options'}
                                    </Text>
                                </View>

                                {/* Options Buttons */}
                                <View style={EnterTeamStyle.modalButtonContainerOptions}>
                                    <TouchableOpacity
                                        style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: 'blue' }]}
                                        onPress={() => handleEditTeam(selectedTeam, selectedTeamLogo, teamId)}
                                    >
                                        <Text style={EnterTeamStyle.modalButtonText}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: '#EC0820' }]}
                                        onPress={() => handleDeleteTeam(selectedTeam)}
                                    >
                                        <Text style={EnterTeamStyle.modalButtonText}>Delete</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: 'orange' }]}
                                        onPress={navigateToPlayer}
                                    >
                                        <Text style={EnterTeamStyle.modalButtonText}>View & Add Player</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: '#EC0820' }]}
                                        onPress={() => setOptionsModalVisible(false)}
                                    >
                                        <Text style={EnterTeamStyle.modalButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>


                    {teams.map((team, index) => (
                        <TouchableOpacity
                            key={index}
                            style={EnterTeamStyle.inputContainer}
                            onPress={() => {
                                setSelectedTeam(team);  // Set selected team
                                setEditTeamLogo(logos[index]);
                                setOptionsModalVisible(true);  // Show the options modal
                            }}
                        >
                            {logos[index] !== null ? (
                                <TouchableOpacity onPress={() => handleEditTeam(logos[index], teamName, teamId)}>
                                    <Image
                                        source={{ uri: logos[index] }}  // Use the corresponding logo URL
                                        style={EnterTeamStyle.inputIcon} // Style the image
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => handleEditTeam(require('../assets/icons/user.png'), teamName, teamId)}>
                                    <Image
                                        source={{ uri: require('../assets/icons/user.png') }}  // Use the default logo
                                        style={EnterTeamStyle.inputIcon} // Style the image
                                    />
                                </TouchableOpacity>
                            )}

                            <Text style={[EnterTeamStyle.input, { color: colors.text }]}>
                                {team.name}
                            </Text>
                        </TouchableOpacity>
                    ))}

                </View>
            </View>

            {/* Add Team Popup */}
            <Modal visible={popupVisible} transparent animationType="slide">
                <View style={EnterTeamStyle.modalContainer}>
                    <View style={EnterTeamStyle.modalContent}>
                        <View style={EnterTeamStyle.modalTitleContainer}>
                            <Text style={[EnterTeamStyle.modalTitle, { color: "white" }]}>
                                ADD A NEW TEAM
                            </Text>
                        </View>
                        <Text style={[EnterTeamStyle.inputTitle, { color: colors.text }]}>
                            Team Logo
                        </Text>

                        {/* Camera Icon to Pick Image */}
                        <TouchableOpacity
                            style={[EnterTeamStyle.modalCameraButton]}
                            onPress={handleImagePicker} // Trigger image picker on press
                        >
                            {!newTeamLogo && (
                                <Icon name="camera" size={50} color="black" />
                            )}
                        </TouchableOpacity>

                        {/* Show picked image */}
                        {newTeamLogo && (
                            <Image
                                source={{ uri: newTeamLogo }}
                                style={EnterTeamStyle.modalImage} // Add a style for image
                            />
                        )}

                        <Text style={[EnterTeamStyle.inputTitle, { color: colors.text }]}>
                            Team Name
                        </Text>

                        <TextInput
                            style={[EnterTeamStyle.modalInput, { color: colors.text }]}
                            placeholder="Enter Team Name"
                            placeholderTextColor={colors.text}
                            value={newTeamName}
                            onChangeText={setNewTeamName}
                        />

                        <View style={EnterTeamStyle.modalButtonContainer}>
                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButton, { backgroundColor: 'blue' }]}
                                onPress={handleAddTeam}
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>Add Team</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButton, { backgroundColor: '#EC0820' }]}
                                onPress={cancelButton}
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={editPopUpVisible} transparent animationType="slide">
                <View style={EnterTeamStyle.modalContainer}>
                    <View style={EnterTeamStyle.modalContent}>
                        <View style={EnterTeamStyle.modalTitleContainer}>
                            <Text style={[EnterTeamStyle.modalTitle, { color: "white" }]}>
                                EDIT TEAM
                            </Text>
                        </View>

                        <Text style={[EnterTeamStyle.inputTitle, { color: colors.text }]}>
                            Team Logo
                        </Text>

                        {/* Camera Icon to Pick Image */}
                        <TouchableOpacity
                            style={[EnterTeamStyle.modalCameraButton]}
                            onPress={handleImagePicker} // Trigger image picker on press
                        >
                            {!editTeamLogo ? (
                                <Icon name="camera" size={50} color="black" />
                            ) : (
                                <Image
                                    source={{ uri: editTeamLogo }}
                                    style={EnterTeamStyle.modalImage} // Add a style for image
                                />
                            )}
                        </TouchableOpacity>

                        <Text style={[EnterTeamStyle.inputTitle, { color: colors.text }]}>
                            Team Name
                        </Text>

                        <TextInput
                            style={[EnterTeamStyle.modalInput, { color: colors.text }]}
                            placeholder="Enter Team Name"
                            placeholderTextColor={colors.text}
                            value={editTeamName}
                            onChangeText={setEditTeamName} // Allow editing of team name
                        />

                        <View style={EnterTeamStyle.modalButtonContainer}>
                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButton, { backgroundColor: 'blue' }]}
                                onPress={handleUpdateTeam} // Call the update function on press
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>Update Team</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButton, { backgroundColor: '#EC0820' }]}
                                onPress={cancelButton}
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



            <View style={[EnterTeamStyle.bottomButtonContainer, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={[EnterTeamStyle.button, { backgroundColor: 'blue' }]}
                    onPress={() => setPopupVisible(true)}
                >
                    <Text style={[EnterTeamStyle.buttonText, { color: 'white' }]}>ADD YOUR TEAM</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[EnterTeamStyle.button, { backgroundColor: '#EC0820' }]}
                    onPress={() => setPopupVisible(true)}
                >
                    <Text style={[EnterTeamStyle.buttonText, { color: 'white' }]}>ADD TEAM</Text>
                </TouchableOpacity>
            </View>

            {/* Loader */}
            <CustomPopup visible={loading} message="Loading..." />
        </ScrollView>
    );
};

export default EnterTeam;
