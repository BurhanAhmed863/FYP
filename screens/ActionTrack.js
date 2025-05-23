import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNPickerSelect from 'react-native-picker-select';

const ActionTrack = ({ navigation }) => {
  const [bowlerName, setBowlerName] = useState('');
  const [bowlerType, setBowlerType] = useState(null);

  const pickVideo = async () => {
    if (!bowlerName.trim()) {
      Alert.alert('Error', 'Please enter the bowler\'s name.');
      return;
    }
    if (!bowlerType) {
      Alert.alert('Error', 'Please select the bowler type.');
      return;
    }

    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
      });
      navigation.navigate('ActionPreview', {
        video: res,
        bowlerName,
        bowlerType,
      });
    } catch (err) {
      console.warn('User cancelled or error:', err);
      Alert.alert('Error', 'Failed to pick video. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bowling Action Analysis</Text>
      <Text style={styles.instructionText}>
        Record a side-view video of your bowling action in good lighting (720p or higher) for accurate analysis.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Bowler's Name"
        value={bowlerName}
        onChangeText={setBowlerName}
      />
      <RNPickerSelect
        onValueChange={(value) => setBowlerType(value)}
        items={[
          { label: 'Fast Bowler', value: 'fast' },
          { label: 'Spinner', value: 'spinner' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Bowler Type', value: null }}
      />
      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>Pick Video for Analysis</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionTrack;

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
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputAndroid: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#333',
  },
});