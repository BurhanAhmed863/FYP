// src/screens/BallVision.js
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Modal, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation } from '@react-navigation/native';
import BallVisionStyle from '../styles/BallVisionStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';

const BallVision = () => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();
    const [videoUri, setVideoUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animation

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
    };

    const pickVideo = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.video],
            });
            if (result && result[0]) {
                const videoUri = result[0].uri;
                setVideoUri(videoUri);
                navigation.navigate('BallVisionPreview', { videoUri }); // Navigate to VideoPreviewScreen
            } else {
                Alert.alert('Error', 'Could not get the video URI');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Cancelled', 'You cancelled the video picker');
            } else {
                Alert.alert('Error', `Error picking video: ${err.message}`);
                console.error('Error picking video:', err);
            }
        }
    };

    // Determine the profile and lock icon based on the theme
    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    return (
        <ScrollView style={[BallVisionStyle.container, { backgroundColor: colors.background }]}>
            <View style={BallVisionStyle.header}>
                <View style={BallVisionStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[BallVisionStyle.title, { color: colors.text }]}>Ball Vision</Text>
                <Image source={userIcon} style={BallVisionStyle.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={BallVisionStyle.iconSearch} />
            </View>

            <View style={BallVisionStyle.middleText}>
                <Text style={[BallVisionStyle.welTxt, { color: colors.text }]}>Upload/Record Your Video</Text>
            </View>
            <View style={BallVisionStyle.centeredContent}>
                <View style={BallVisionStyle.cardContainer}>
                    <LinearGradient
                        colors={['#000000', '#434343']} // Define your gradient colors
                        start={{ x: 1, y: 0 }} // Optional: starting point of the gradient
                        end={{ x: 1, y: 1 }}   // Optional: ending point of the gradient
                        style={BallVisionStyle.card} // Apply the gradient to the button style
                    >
                        <View style={[BallVisionStyle.AvsBIcon]}>
                            <Image source={AvsB} style={BallVisionStyle.cardIcon}></Image>
                        </View>
                    </LinearGradient>
                </View>

                <View style={BallVisionStyle.middleText}>
                    <Text style={[BallVisionStyle.captionTxt, { color: colors.text }]}>Record and check your bowling speed</Text>
                </View>

                <View style={BallVisionStyle.addCardContainer}>
                    <TouchableOpacity
                        onPress={pickVideo}
                        style={BallVisionStyle.addCard} // Apply the gradient to the button style
                    >
                        <View style={[BallVisionStyle.addIconContainer]}>
                            <Ionicons name="videocam" size={80} color={"red"} style={[BallVisionStyle.videocam, { left: 5 }]} />
                            <Text style={[BallVisionStyle.addTxt, { color: colors.text }]}>Upload Media</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={BallVisionStyle.addCard} // Apply the gradient to the button style
                        onPress={() => navigation.navigate('SpeedHistory')}
                    >
                        <View style={[BallVisionStyle.addIconContainer]}>
                            <MaterialCommunityIcons name="speedometer" size={80} color={"#F7A01F"} style={BallVisionStyle.videocam} />
                            <Text style={[BallVisionStyle.addTxt, { color: colors.text }]}>Speed History</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={BallVisionStyle.button}
                    onPress={openModal} // Open modal on button press
                >
                    <Text style={[BallVisionStyle.buttonText, { color: 'white' }]}>
                        HOW TO USE
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
                transparent={true}
                animationType="none"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={BallVisionStyle.modalOverlay}>
                    <Animated.View style={[BallVisionStyle.modalContainer, { opacity: fadeAnim }]}>
                        <Text style={BallVisionStyle.modalTitle}>How To Check Speed</Text>
                        <Text style={BallVisionStyle.modalText}>1. Upload your video clicking on upload media.</Text>
                        <Text style={BallVisionStyle.modalText}>2. When ball release from bowler hand click on Release Point button.</Text>
                        <Text style={BallVisionStyle.modalText}>3. When ball reach to the batsmen click on Reach Point button.</Text>
                        <Text style={BallVisionStyle.modalText}>4. After this Calculate button will pop-up and click on that you will see your speed</Text>

                        <TouchableOpacity style={BallVisionStyle.closeButton} onPress={closeModal}>
                            <Text style={BallVisionStyle.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default BallVision;
