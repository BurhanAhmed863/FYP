import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';

const BowlingSpeedApp = () => {
    const [videoUri, setVideoUri] = useState(null);
    const [releaseTime, setReleaseTime] = useState(null);
    const [impactTime, setImpactTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(0); // Track current video time
    const [speed, setSpeed] = useState(null);
    const [speedMph, setSpeedMph] = useState(null);
    const [isPaused, setIsPaused] = useState(true); // Video pause state
    const videoPlayer = useRef(null); // Reference to the video player

    const frameDuration = 1 / 30; // Assume 30fps video, adjust this if necessary

    // Handle video selection with error handling
    const pickVideo = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.video],
            });
            console.log('Picked video result:', result); // Log the entire result object for debugging
            if (result && result[0]) {
                setVideoUri(result[0].uri); // Use setVideoUri from useState hook
                console.log('Picked video URI:', result[0].uri); // Log the video URI for debugging
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

    // Handle progress of video to track current time
    const onProgress = (data) => {
        setCurrentTime(data.currentTime); // Track current video time
    };

    // Calculate speed based on release and impact times
    const calculateSpeed = () => {
        if (releaseTime === null || impactTime === null) {
            Alert.alert('Error', 'Please select both release and impact times.');
            return;
        }

        const pitchDistance = 20.12; // meters (standard pitch length)
        const timeDifference = impactTime - releaseTime; // in seconds

        if (timeDifference <= 0) {
            Alert.alert('Error', 'Impact time must be greater than release time.');
            return;
        }

        const speedInMetersPerSecond = pitchDistance / timeDifference;
        const speedInKmH = speedInMetersPerSecond * 3.6; // Convert m/s to km/h
        setSpeed(speedInKmH.toFixed(2));
        const speedInMph = speedInKmH / 1.6093;
        setSpeedMph(speedInMph.toFixed(2));
    };

    // Set release time to current video time
    const setRelease = () => {
        setReleaseTime(currentTime);
        Alert.alert('Release Time Set', `Release time set to ${currentTime.toFixed(2)} seconds.`);
    };

    // Set impact time to current video time
    const setImpact = () => {
        setImpactTime(currentTime);
        Alert.alert('Impact Time Set', `Impact time set to ${currentTime.toFixed(2)} seconds.`);
    };

    // Seek forward by one frame
    const seekForward = () => {
        const newTime = currentTime + frameDuration;
        videoPlayer.current.seek(newTime);
        setCurrentTime(newTime);
    };

    // Seek backward by one frame
    const seekBackward = () => {
        const newTime = Math.max(currentTime - frameDuration, 0); // Ensure time doesn't go below 0
        videoPlayer.current.seek(newTime);
        setCurrentTime(newTime);
    };

    return (
        <View style={styles.container}>
            <Button title="Pick a Video" onPress={pickVideo} />
            {videoUri ? (
                <>
                    <Video
                        ref={videoPlayer}
                        source={{ uri: videoUri }}
                        style={styles.video}
                        controls={true}
                        paused={isPaused} // Pause state of the video
                        onProgress={onProgress} // Continuously track current time
                        onError={(e) => Alert.alert('Video Error', `Error loading video: ${e.error.message}`)} // Video load error handling
                    />
                    <Text style={styles.currentTime}>Current Time: {currentTime.toFixed(2)} seconds</Text>
                    <View style={styles.frameButtons}>
                        <Button title="<<" onPress={seekBackward} />
                        <Button title=">>" onPress={seekForward} />
                    </View>
                    <Button title={isPaused ? "Play" : "Pause"} onPress={() => setIsPaused(!isPaused)} />
                    <Button title="Set Release Time" onPress={setRelease} />
                    <Button title="Set Impact Time" onPress={setImpact} />
                    <Button title="Calculate Speed" onPress={calculateSpeed} />
                    {speed && (
                        <Text style={styles.speedText}>
                            Bowling Speed: {speed} km/h
                        </Text>
                    )}

                    {speedMph && (
                        <Text style={styles.speedText}>
                            Bowling Speed: {speedMph} mph
                        </Text>
                    )}
                </>
            ) : (
                <Text style={styles.errorText}>No video selected. Please pick a video.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 200,
        marginVertical: 20,
        backgroundColor: 'transparent'
    },
    currentTime: {
        marginVertical: 10,
        fontSize: 16,
        color: 'gray',
    },
    speedText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    errorText: {
        marginTop: 20,
        fontSize: 16,
        color: 'red',
    },
    frameButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginVertical: 10,
    },
});

export default BowlingSpeedApp;
