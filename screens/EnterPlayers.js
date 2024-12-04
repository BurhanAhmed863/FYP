import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, Image, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import EnterTeamStyle from '../styles/EnterTeamStyle';
import EnterPlayersStyle from '../styles/EnterPlayersStyle';
import apiConnection from './apiConnection';
import DocumentPicker, { types } from 'react-native-document-picker'; // Import Document Picker
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const EnterPlayers = ({ route, navigation }) => {
    const { colors } = useTheme();
    const { selectedTeam } = route.params;
    const teamName1 = selectedTeam.teamName1;
    const teamId1 = selectedTeam.id;
    const [players, setPlayers] = useState([]);
    const [logos, setLogos] = useState([]);
    // console.log(teamId1);
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null); // Store selected player
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [playerType, setPlayerType] = useState('');
    const [newPlayerName, setNewPlayerName] = useState('');
    const [playing11, setPlaying11] = useState('');
    const [newTeamLogo, setNewTeamLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Track if we're in edit mode

    useEffect(() => {
        // Fetch players when the selected team changes

        fetchPlayers();
        // const intervalId = setInterval(fetchPlayers, 1000);

        // // Cleanup the interval when the component unmounts or the effect is re-run
        // return () => clearInterval(intervalId);

    }, [teamId1]);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get(`${apiConnection.apiIp}/fetchPlayers.php?team_id=${teamId1}`);
            const result = response.data;

            console.log('playing', result);
            if (response.data.status === 'success') {

                // Process the player images and save them in state
                if (result.player_img && Array.isArray(result.player_img)) {
                    const logosWithUrl = result.player_img.map(logoObj => {
                        return `${apiConnection.apiIp}/PlayerImages/${logoObj.player_img}`;
                    });
                    setLogos(logosWithUrl);  // Set logos with full URLs
                    // console.log('Processed Logos:', logos);
                }
                setPlayers(response.data.players);
            } else {
                // Alert.alert('Error', response.data.message);
            }

        } catch (error) {
            console.error('Error fetching players:', error);
            Alert.alert('Error', 'Failed to fetch players');
        } finally {
            setLoading(false);
        }
    };
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

    // Handle player type change
    const handlePlayerTypeChange = (type) => {
        setPlayerType(type);
        setDropdownVisible(false); // Close dropdown after selection
    };

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);  // Set the selected player
        setOptionsModalVisible(true); // Show the options modal
    };

    // Add new player function
    const handleAddPlayer = async () => {
        if (!newPlayerName || !playerType) {
            Alert.alert('Error', 'Please provide a name and player type.');
            return;
        }

        setLoading(true);

        try {
            // Prepare FormData to send to backend
            const formData = new FormData();
            formData.append('team_id', teamId1);
            formData.append('player_name', newPlayerName);
            formData.append('role', playerType);

            // Check if player image (logo) is available
            if (newTeamLogo) {
                formData.append('player_img', {
                    uri: newTeamLogo, // The URI of the selected image
                    type: 'image/jpeg', // Adjust based on your image file type (e.g., 'image/png')
                    name: 'player_image.jpg', // You can change the filename as needed
                });
            }

            // Send data to backend
            const response = await axios.post(`${apiConnection.apiIp}/playerName.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data);
            if (response.data.status === 'success') {
                fetchPlayers();
                Alert.alert('Success', 'Player added successfully!');
                // Clear the fields after adding
                setNewPlayerName('');
                setPlayerType('');
                setNewTeamLogo(null); // Reset the image after adding the player
                setPopupVisible(false);
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.error('Error adding player:', error);
            Alert.alert('Error', 'Failed to add player. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const handleEditPlayer = (player) => {
        setSelectedPlayer(player); // Set the selected player
        setNewPlayerName(player.player_name); // Populate the name
        setPlayerType(player.role); // Populate the role
        setIsEditMode(true); // Set to edit mode
        setPopupVisible(true); // Show the modal
        setOptionsModalVisible(false);
        const imageUrl = player.player_img.startsWith('http://localhost/MatchMate')
            ? player.player_img.replace('http://localhost/MatchMate', `${apiConnection.apiIp}`)
            : player.player_img;

        setNewTeamLogo(imageUrl); // Populate the logo with the updated URL
        console.log('Sel', imageUrl); // This will now print the updated URL
        fetchPlayers();
        console.log('Sel', newTeamLogo);
    };

    const handleEditPlayerSubmit = async () => {
        if (!newPlayerName.trim() || !playerType.trim()) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        const formData = new FormData();
        formData.append('playerId', selectedPlayer.id); // Include player ID for updating
        formData.append('playerName', newPlayerName);

        // Check if a new player image is provided
        if (newTeamLogo) {
            formData.append('playerImg', {
                uri: newTeamLogo,
                name: 'player_image.jpg',
                type: 'image/jpeg',
            });
        }

        formData.append('role', playerType);

        setLoading(true);

        try {
            const response = await axios.post(`${apiConnection.apiIp}/editPlayers.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const result = response.data;

            console.log(result)
            if (result.status === 'success') {
                fetchPlayers();
                Alert.alert('Success', 'Player updated successfully!');

                // Update the players state with the updated player
                setPlayers(players.map(player =>
                    player.id === selectedPlayer.id
                        ? { ...player, name: newPlayerName, role: playerType, img: result.player.img }
                        : player
                ));

                setNewTeamLogo(null);
                setNewPlayerName('');
                setPlayerType('');
                setIsEditMode(false);
                setPopupVisible(false); // Close the popup/modal
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error updating player:', error);
            Alert.alert('Error', 'Failed to update player. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const handleDeletePlayer = async (player) => {
        console.log("delete", player.id)
        const playerId = player.id;
        try {
            const response = await fetch(`${apiConnection.apiIp}/deletePlayer.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    player_id: playerId,
                }),
            });

            const responseText = await response.text();  // Get the raw response as text
            console.log('Server response:', responseText);  // Log the response to check

            const result = JSON.parse(responseText);  // Manually parse the response text

            if (result.status === 'success') {
                fetchPlayers();
                alert("Player deleted successfully.");
                setOptionsModalVisible(false);
                // Optionally, update the state/UI
            } else {
                alert("Failed to delete player: " + result.message);
            }
        } catch (error) {
            console.error('Error deleting player:', error);
            alert("An error occurred while trying to delete the player.");
        }
    };

    const handleViewPlayerStats = (player) => {
        // Navigate to player stats screen or show stats
        console.log('Viewing stats for player:', player);
        // Example: Navigate to a player stats screen or display stats
    };

    const handleAddToPlayingXi = async (player) => {
        try {
            console.log('Adding player to Playing XI:', player.id);
    
            const payload = { playerId: player.id };
            console.log('Payload being sent:', payload);
    
            const response = await axios.post(`${apiConnection.apiIp}/addToPlayingXI.php`, payload);
            console.log('Response from server:', response.data);
    
            if (response.data.status === 'success') {
                const { message, currentPlayingCount } = response.data;
                console.log('Success:', message);
                console.log('Current Playing XI count:', currentPlayingCount);
                fetchPlayers();
                fetchPlayerStatus(player.id); // Refresh the status of the selected player
                Alert.alert('Success', 'Player added to Playing XI');
                setOptionsModalVisible(false);
            } else {
                const { message } = response.data;
                console.log('msg',message)
                Alert.alert('Alert', message);
            }
        } catch (error) {
            console.error('Error adding player to Playing XI:', error);
            Alert.alert('Error', 'Failed to add player to Playing XI');
        }
    };
    

    const fetchPlayerStatus = async (playerId) => {
        try {
            const response = await axios.get(`${apiConnection.apiIp}/getPlayerStatus.php`, {
                params: { playerId },
            });
            console.log(response.data);

            if (response.data.status === 'success') {
                const isPlaying = response.data.data.isPlaying;

                setPlaying11(isPlaying); // Update local state
                setSelectedPlayer((prev) => ({
                    ...prev,
                    playingXi: isPlaying === 1, // Update the playing status
                }));
            } else {
                console.error('Error fetching player status:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching player status:', error);
        }
    };

    useEffect(() => {
        // Fetch player status only if a player is selected and its ID changes
        if (selectedPlayer?.id) {
            fetchPlayerStatus(selectedPlayer.id);
        }
    }, [selectedPlayer?.id]); // Depend only on the player ID


    const handleRemoveFromPlayingXi = async (player) => {
        try {
            console.log('Removing player from Playing XI:', player.id);

            const response = await axios.post(`${apiConnection.apiIp}/removeFromPlayingXI.php`, {
                playerId: player.id,
            });

            console.log('Response from server:', response.data);

            if (response.data.status === 'success') {
                const { message } = response.data;
                console.log('Success:', message);
                fetchPlayers();
                fetchPlayerStatus(player.id);
                Alert.alert('Success', 'Player removed from Playing XI');
                // Update the player status locally
                setSelectedPlayer((prev) => ({
                    ...prev,
                    playingXi: false,
                }));

                setOptionsModalVisible(false);
            } else {
                const { message } = response.data;
                Alert.alert('Error', message);
            }
        } catch (error) {
            console.error('Error removing player from Playing XI:', error);
            Alert.alert('Error', 'Failed to remove player from Playing XI');
        }
    };

    const cancelButton = () => {
        setPopupVisible(false);
        setNewTeamLogo(null);
        setNewPlayerName('');
        setPlayerType('');
        setIsEditMode(false);
    };

    const cancelOptionsButton = () => {
        setOptionsModalVisible(false);
        // setNewTeamLogo(null);
    };

    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    return (
        <ScrollView style={[EnterPlayersStyle.container, { backgroundColor: colors.background }]}>
            <View style={EnterPlayersStyle.header}>
                <View style={EnterPlayersStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color="#EB001B" />
                    </TouchableOpacity>
                </View>
                <Text style={[EnterPlayersStyle.title, { color: colors.text }]}>Players</Text>
                <Image source={userIcon} style={EnterPlayersStyle.icon} />
                <Icon name="search" size={23} color="#f79e1b" style={EnterPlayersStyle.iconSearch} />
            </View>
            <Text style={[EnterPlayersStyle.welTxt, { color: colors.text }]}>Add New Player</Text>

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
            {players.map((player, index) => (
                <TouchableOpacity
                    key={index}
                    style={EnterTeamStyle.inputContainer}
                    onPress={() => handlePlayerClick(player)}
                >
                    {logos[index] && logos[index] !== `${apiConnection.apiIp}/PlayerImages/` ? (
                        <Image source={{ uri: logos[index] }} style={EnterTeamStyle.inputIcon} />
                    ) : (
                        <Image source={require('../assets/icons/user.png')} style={EnterTeamStyle.inputIcon} />
                    )}
                    <Text style={[EnterTeamStyle.input]}>{player.player_name}</Text>
                    <Text style={EnterTeamStyle.playerRole}>{player.role}</Text>
                    {player.isPlaying === 1 && (
                         <FontAwesome6 name="circle-check" size={23} color="#f79e1b" style={EnterPlayersStyle.inteamText} /> // Render "In" for players in Playing XI
                    )}
                </TouchableOpacity>
            ))}

            {/* Modal for Player Options */}
            <Modal visible={optionsModalVisible} transparent animationType="fade">
                <View style={EnterTeamStyle.modalContainer}>
                    <View style={EnterTeamStyle.modalContent}>
                        <View style={EnterTeamStyle.modalTitleContainer}>
                            <Text style={[EnterTeamStyle.modalTitle, { color: "white" }]}>
                                {selectedPlayer ? selectedPlayer.player_name : 'Player Options'}
                            </Text>
                        </View>

                        {/* Options Buttons */}
                        <View style={EnterTeamStyle.modalButtonContainerOptions}>
                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: 'blue' }]}
                                onPress={() => handleEditPlayer(selectedPlayer)} // Edit player
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: '#EC0820' }]}
                                onPress={() => handleDeletePlayer(selectedPlayer)} // Delete player
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>Delete</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: 'green' }]}
                                onPress={() => handleViewPlayerStats(selectedPlayer)} // View player stats
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>View Player Stats</Text>
                            </TouchableOpacity>

                            {/* Show option based on the player status (Added to Playing XI or not) */}
                            {selectedPlayer && playing11 == 1 ? (
                                <TouchableOpacity
                                    style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: '#FFD700' }]}
                                    onPress={() => handleRemoveFromPlayingXi(selectedPlayer)} // Remove from Playing XI
                                >
                                    <Text style={EnterTeamStyle.modalButtonText}>Remove from Playing XI</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: '#32CD32' }]}
                                    onPress={() => handleAddToPlayingXi(selectedPlayer)} // Add to Playing XI
                                >
                                    <Text style={EnterTeamStyle.modalButtonText}>Add to Playing XI</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButtonOptions, { backgroundColor: '#EC0820' }]}
                                onPress={() => setOptionsModalVisible(false)} // Close modal
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={[EnterPlayersStyle.bottomButtonContainer, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={[EnterPlayersStyle.button, { backgroundColor: 'blue' }]}
                    onPress={() => setPopupVisible(true)}
                >
                    <Text style={[EnterPlayersStyle.buttonText, { color: 'white' }]}>Add New Player</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={popupVisible} transparent animationType="slide">
                <View style={EnterTeamStyle.modalContainer}>
                    <View style={EnterTeamStyle.modalContent}>
                        <Text style={[EnterTeamStyle.modalTitle, { color: "white" }]}>
                            {isEditMode ? 'Edit Player' : 'Add New Player'}
                        </Text>

                        {/* Player Image */}
                        <Text style={[EnterTeamStyle.inputTitle, { color: colors.text }]}>Player Image</Text>
                        <TouchableOpacity style={EnterTeamStyle.modalCameraButton} onPress={() => handleImagePicker()}>
                            {!newTeamLogo && <Icon name="camera" size={50} color="black" />}
                        </TouchableOpacity>

                        {newTeamLogo && <Image source={{ uri: newTeamLogo }} style={EnterTeamStyle.modalImage} />}

                        {/* Player Name Input */}
                        <Text style={[EnterTeamStyle.inputTitle, { color: colors.text }]}>Player Name</Text>
                        <TextInput
                            style={[EnterTeamStyle.modalInput, { color: colors.text }]}
                            placeholder="Enter Player Name"
                            placeholderTextColor={colors.text}
                            value={newPlayerName}
                            onChangeText={setNewPlayerName}
                        />

                        {/* Player Type Picker */}
                        <Text style={[EnterTeamStyle.inputTitle, { color: colors.text }]}>Player Type</Text>
                        <TouchableOpacity
                            style={EnterTeamStyle.playerTypeButton}
                            onPress={() => setDropdownVisible(!dropdownVisible)}
                        >
                            <Text style={EnterTeamStyle.playerTypeText}>
                                {playerType ? playerType : 'Select Player Type'}
                            </Text>
                        </TouchableOpacity>

                        {dropdownVisible && (
                            <View style={EnterTeamStyle.dropdownContainer}>
                                {['Batsman', 'Bowler', 'Wicketkeeper', 'Allrounder'].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={EnterTeamStyle.dropdownOption}
                                        onPress={() => handlePlayerTypeChange(type)}
                                    >
                                        <Text style={EnterTeamStyle.dropdownText}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {/* Edit/Add Player Button */}
                        <View style={EnterTeamStyle.modalButtonContainer}>
                            <TouchableOpacity
                                style={[EnterTeamStyle.modalButton, { backgroundColor: 'blue' }]}
                                onPress={isEditMode ? handleEditPlayerSubmit : handleAddPlayer}
                            >
                                <Text style={EnterTeamStyle.modalButtonText}>{isEditMode ? 'Update Player' : 'Add Player'}</Text>
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

        </ScrollView>
    );
};

export default EnterPlayers;
