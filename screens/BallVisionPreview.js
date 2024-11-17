import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, Animated, Modal, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Orientation from 'react-native-orientation-locker';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import VideoScreenStyle from '../styles/VideoScreenStyle';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';

const pitchDistances = [
    { label: '20.12 m', value: '20.12' },
    { label: '22.00 m', value: '22.00' },
    { label: '25.00 m', value: '25.00' },
    { label: '30.00 m', value: '30.00' },
];

const VideoPreviewScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { videoUri } = route.params;

    const [releaseTime, setReleaseTime] = useState(null);
    const [impactTime, setImpactTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0); // Total duration of the video
    const [speed, setSpeed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [pitchDistance, setPitchDistance] = useState(pitchDistances[0].value); // Default to the first distance
    const [showControls, setShowControls] = useState(true);
    const [modalVisible, setModalVisible] = useState(false); // State for the modal
    const videoPlayer = useRef(null);
    const frameDuration = 1 / 30;

    // New state for speed calculation modal
    const [calcModalVisible, setCalcModalVisible] = useState(false);

    const scale = useRef(new Animated.Value(1)).current; // Default scale set to 1

    useEffect(() => {
        Orientation.lockToLandscape();
        return () => Orientation.unlockAllOrientations();
    }, []);

    const onProgress = (data) => {
        setCurrentTime(data.currentTime);
    };

    const onLoad = (data) => {
        setDuration(data.duration); // Set the total duration when the video loads
    };

    const calculateSpeed = () => {
        if (releaseTime === null || impactTime === null) {
            Alert.alert('Error', 'Please select both release and impact times.');
            return;
        }

        const timeDifference = impactTime - releaseTime;
        if (timeDifference <= 0) {
            Alert.alert('Error', 'Impact time must be greater than release time.');
            setCalcModalVisible(false);
            return;

        }

        const distance = parseFloat(pitchDistance) || 20.12;
        const speedInMetersPerSecond = distance / timeDifference;
        const speedInKmH = speedInMetersPerSecond * 3.6;
        setSpeed(speedInKmH.toFixed(2));

        // Navigate to speed display screen with the calculated speed
        navigation.navigate('SpeedDisplayScreen', { speed: speedInKmH.toFixed(2) });
        setCalcModalVisible(false);
    };


    const setRelease = () => {
        setReleaseTime(currentTime);
        Toast.show({
            text1: 'Release Time Set',
            type: 'success',
        });
    };

    const setImpact = () => {
        // Check if releaseTime is set before allowing impactTime to be set
        if (releaseTime === null) {
            Alert.alert(
                'Error',
                'Please select the Release Point first before selecting the Reach Point.',
                [{ text: 'OK', style: 'cancel' }]
            );
            return; // Exit the function if the release point is not set
        }
        setImpactTime(currentTime);
        if(releaseTime === currentTime){
            Toast.show({
                text1: 'Impact Time & Realease Time cannot be same',
                type: 'error',
            });    
        }
        if(releaseTime !== currentTime){
        Toast.show({
            text1: 'Impact Time Set',
            type: 'success',
        });
        // Alert.alert('Impact Time Set', `Impact time set to ${currentTime.toFixed(2)} seconds.`);
        setCalcModalVisible(true);
    }
    };

    const closeCalcModal = () => {
        setCalcModalVisible(false);
    };

    const seekForward = () => {
        const newTime = currentTime + frameDuration;
        videoPlayer.current.seek(newTime);
        setCurrentTime(newTime);
    };

    const seekBackward = () => {
        const newTime = Math.max(currentTime - frameDuration, 0);
        videoPlayer.current.seek(newTime);
        setCurrentTime(newTime);
    };

    const toggleControls = () => setShowControls(!showControls);

    const handlePinch = Animated.event(
        [{ nativeEvent: { scale } }],
        { useNativeDriver: true }
    );

    const handlePinchStateChange = (event) => {
        if (event.nativeEvent.state === State.END) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const selectDistance = (value) => {
        setPitchDistance(value);
        closeModal(); // Close the modal after selection
    };

    const onSeek = (value) => {
        const newTime = (value / 100) * duration; // Assuming value is a percentage of duration
        videoPlayer.current.seek(newTime);
        setCurrentTime(newTime);
    };

    const getCurrentTimeString = () => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const getDurationString = () => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <TouchableOpacity style={VideoScreenStyle.container} onPress={toggleControls} activeOpacity={1}>
            {/* Pinch-to-Zoom Video */}
            <PinchGestureHandler
                onGestureEvent={handlePinch}
                onHandlerStateChange={handlePinchStateChange}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Video
                        ref={videoPlayer}
                        source={{ uri: videoUri }}
                        style={VideoScreenStyle.video}
                        resizeMode="contain"
                        paused={isPaused}
                        onProgress={onProgress}
                        onLoad={onLoad} // Set total duration on load
                        onError={(e) => Alert.alert('Video Error', `Error loading video: ${e.error.message}`)}
                    />
                </Animated.View>
            </PinchGestureHandler>

            {/* Header and Controls */}
            {showControls && (
                <View style={VideoScreenStyle.controlsContainer}>
                    <View style={VideoScreenStyle.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>

                        {/* Label and Selected Pitch Distance */}
                        <View style={VideoScreenStyle.distanceContainer}>
                            <Text style={VideoScreenStyle.distanceLabel}>Pitch Distance: </Text>
                            <Text style={VideoScreenStyle.distanceInput}>
                                {pitchDistance} m
                            </Text>
                            <TouchableOpacity onPress={openModal} style={VideoScreenStyle.button}>
                                <Text style={VideoScreenStyle.buttonText}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={setRelease} style={[VideoScreenStyle.button, { left: 60, backgroundColor: 'red' }]}>
                            <Text style={VideoScreenStyle.buttonText}>Release Point</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={setImpact} style={VideoScreenStyle.button}>
                            <Text style={VideoScreenStyle.buttonText}>Reach Point</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Video Controls */}
                    <View style={VideoScreenStyle.controls}>
                        <View style={VideoScreenStyle.controlButtons}>
                            <TouchableOpacity onPress={seekBackward}>
                                <Icon name="play-back" size={32} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={seekBackward}>
                                <FontAwesome5 name="step-backward" size={32} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
                                <Icon name={isPaused ? "play" : "pause"} size={32} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={seekForward}>
                                <FontAwesome5 name="step-forward" size={32} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={seekForward}>
                                <Icon name="play-forward" size={32} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.progressContainer}>
                            <Text style={styles.timerText}>{getCurrentTimeString()} / {getDurationString()}</Text>
                            <Slider
                                style={styles.progressBar}
                                minimumValue={0}
                                maximumValue={duration}
                                value={currentTime}
                                onValueChange={(value) => setCurrentTime(value)}
                                onSlidingComplete={(value) => onSeek((value / duration) * 100)} // Seek based on percentage
                                thumbTintColor="blue" // Customize thumb color
                                minimumTrackTintColor="blue" // Customize minimum track color
                                maximumTrackTintColor="lightgray" // Customize maximum track color
                            />
                        </View>
                    </View>

                    {/* Timer and Progress Bar */}

                    <Modal
                        transparent={true}
                        visible={calcModalVisible}
                        animationType="slide"
                    >
                        <View style={VideoScreenStyle.modalContainer}>
                            <View style={VideoScreenStyle.modalContent}>
                                <TouchableOpacity onPress={calculateSpeed} style={VideoScreenStyle.Calbutton}>
                                    <Text style={VideoScreenStyle.buttonText}>Calculate Speed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>


                    {/* Modal for Pitch Distance Selection */}
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        animationType="slide"
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                                <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Pitch Distance</Text>
                                {pitchDistances.map((item) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        onPress={() => selectDistance(item.value)}
                                        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                                    >
                                        <Text style={{ fontFamily: 'SignikaNegative-Regular', fontSize: 16, color: 'black' }}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity onPress={closeModal} style={[VideoScreenStyle.button, { marginTop: 20 }]}>
                                    <Text style={VideoScreenStyle.buttonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </TouchableOpacity>
    );
};

// Styles for the progress bar
const styles = StyleSheet.create({
    progressContainer: {
        flexDirection: 'row', // Arrange progress bar and text in a row
        alignItems: 'center', // Align items vertically centered
        width: '100%', // Ensure full width for the slider
    },
    timerText: {
        color: 'white',
        marginRight: 10, // Space between timer text and progress bar
    },
    progressBar: {
        flex: 1, // Allow the progress bar to take available space
        height: 40, // Customize height if needed
        borderRadius: 5,
    },
});

export default VideoPreviewScreen;
