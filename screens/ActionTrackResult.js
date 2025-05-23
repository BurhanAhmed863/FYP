import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Video from 'react-native-video';
import apiConnection from './apiConnection';

const ActionTrackResult = ({ route }) => {
  const { result, video_url, max_extension, bowlerName, bowlerType } = route.params;
  const fullVideoUrl = video_url ? `${apiConnection.flaskBaseUrl}${video_url}` : null;
  console.log('📬 ActionTrackResult Video URL:', fullVideoUrl);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Analysis Result</Text>
      <Text style={styles.resultText}>Bowler: {bowlerName}</Text>
      <Text style={styles.resultText}>
        Type: {bowlerType === 'fast' ? 'Fast Bowler' : 'Spinner'}
      </Text>
      <Text style={styles.resultText}>
        Result: {result} {max_extension ? `(${max_extension.toFixed(2)} degrees)` : ''}
      </Text>
      {max_extension && (
        <Text style={styles.angleText}>
          Max Elbow Extension: {max_extension.toFixed(2)} degrees
        </Text>
      )}
      {fullVideoUrl ? (
        <Video
          source={{
            uri: fullVideoUrl,
            headers: { 'Accept': 'video/mp4' },
          }}
          style={styles.video}
          controls
          resizeMode="contain"
          onError={(e) => {
            console.error('🔥 Video Playback Error:', JSON.stringify(e, null, 2));
            Alert.alert('Video Playback Error', 'Could not play the processed video.');
          }}
          onLoad={() => console.log('📽️ Video Loaded:', fullVideoUrl)}
        />
      ) : (
        <Text style={styles.noVideoText}>
          No processed video available. Please try again with a side-view video.
        </Text>
      )}
    </View>
  );
};

export default ActionTrackResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  angleText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  noVideoText: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
});