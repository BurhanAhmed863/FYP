import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Video from 'react-native-video';
import apiConnection from './apiConnection';

const ActionPreview = ({ route, navigation }) => {
  const { video, bowlerName, bowlerType } = route.params;
  const [loading, setLoading] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);
  const [showProcessedVideo, setShowProcessedVideo] = useState(false);

  const uploadVideo = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('video', {
      uri: video.uri,
      name: video.name || 'video.mp4',
      type: video.type || 'video/mp4',
    });
    formData.append('bowler_type', bowlerType);

    try {
      const response = await fetch(apiConnection.getFlaskUrl('analyze'), {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      const videoUrl = result.video_url ? `${apiConnection.flaskBaseUrl}${result.video_url}` : null;
      console.log('📬 Processed Video URL:', videoUrl);
      if (!videoUrl) {
        Alert.alert('Warning', 'No processed video received from server.');
      }
      setProcessedVideoUrl(videoUrl);
      setShowProcessedVideo(!!videoUrl);
      navigation.navigate('ActionTrackResult', {
        result: result.result,
        video_url: result.video_url || null,
        max_extension: result.max_extension || null,
        bowlerName,
        bowlerType,
      });
    } catch (error) {
      console.error('🔥 Upload Error:', error);
      let errorMessage = 'Please try again.';
      if (error.message.includes('Network')) {
        errorMessage = 'Network error. Check your server connection and try again.';
      } else if (error.message.includes('Invalid response')) {
        errorMessage = 'Invalid response from server. Please try again later.';
      }
      Alert.alert('Upload Failed', error.message || errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {showProcessedVideo && processedVideoUrl ? 'Processed Video (Landmarks)' : 'Original Video'}
      </Text>
      <Video
        source={{
          uri: showProcessedVideo && processedVideoUrl ? processedVideoUrl : video.uri,
          headers: { 'Accept': 'video/mp4' },
        }}
        style={styles.video}
        controls
        resizeMode="contain"
        onError={(e) => {
          console.error('🔥 Video Playback Error:', JSON.stringify(e, null, 2));
          Alert.alert('Video Playback Error', 'Could not play the video.');
        }}
        onLoad={() => console.log('📽️ Video Loaded:', showProcessedVideo ? processedVideoUrl : video.uri)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={uploadVideo}>
            <Text style={styles.buttonText}>Start Analysis</Text>
          </TouchableOpacity>
          {processedVideoUrl && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => {
                console.log('🔄 Toggling video, showProcessedVideo:', !showProcessedVideo);
                setShowProcessedVideo(!showProcessedVideo);
              }}
            >
              <Text style={styles.buttonText}>
                {showProcessedVideo ? 'Show Original Video' : 'Show Processed Video'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default ActionPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  toggleButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});