import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import SignupStyle from '../styles/SignupStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import apiConnection from './apiConnection';
import CustomPopup from '../Modal/CustomPopup'; // Importing the CustomPopup component

const Signup = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [user_name, setFullName] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for pop-up
  const [showPopup, setShowPopup] = useState(false); // Pop-up state
  const { apiIp } = apiConnection;
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const profileIcon = colors.background === '#333' ? require('../assets/icons/profile_white.png') : require('../assets/icons/profile.png');
  const lockIcon = colors.background === '#333' ? require('../assets/icons/lock_white.png') : require('../assets/icons/lock.png');
  const mailIcon = colors.background === '#333' ? require('../assets/icons/mail_white.png') : require('../assets/icons/mail.png');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

  const validateFields = () => {
    let valid = true;

    // Validation for required fields
    if (!user_name) {
      setNameError('UserName is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!user_email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(user_email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!user_password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Password is required');
      valid = false;
    }
    else if (user_password !== confirmPassword) {
      setConfirmPasswordError('Confirm password did not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }
    return valid;
  };

  const handleSignup = async () => {
    if (!validateFields()) return; // Check validation before proceeding

    setLoading(true); // Show loading popup
    setShowPopup(true);

    try {
      console.log('Sending signup request to:', `${apiIp}/signUp.php`);
      const response = await axios.post(`${apiIp}/signUp.php`, {
        user_name,
        user_email,
        user_password,
        save: true,
      });

      console.log(response.data); // Check the response
      const data = response.data;
      if (data.status === 'success') {
        await AsyncStorage.setItem('userToken', data.token);
        Alert.alert('Success', 'Signup successful!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Error', error.response ? error.response.data : 'Network Error');
    } finally {
      setLoading(false); // Hide loading popup
      setShowPopup(false);
    }
  };

  return (
    <ScrollView style={SignupStyle.scrollContainer}>
      <View style={[SignupStyle.container, { backgroundColor: colors.background }]}>
        <View style={SignupStyle.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="caretleft" size={25} color='#EB001B' />
          </TouchableOpacity>
        </View>
        <View style={SignupStyle.centeredContent}>
          <Text style={[SignupStyle.title, { color: colors.text }]}>Create ID</Text>

          <View style={[SignupStyle.inputContainer, { borderColor: nameError ? 'red' : 'orange' }]}>
            <Image source={profileIcon} style={SignupStyle.icon}></Image>
            <TextInput
              style={[SignupStyle.input, { color: colors.text }]}
              placeholder="FULL NAME"
              placeholderTextColor={colors.text}
              value={user_name}
              onChangeText={(text) => {
                setFullName(text);
                setConfirmPasswordError(''); // Clear password error when user starts typing
                setEmailError('');
                setPasswordError('');
                setNameError('');
              }}
            />
          </View>
          {nameError ? <Text style={SignupStyle.errorText}>{nameError}</Text> : null}

          <View style={[SignupStyle.inputContainer, { borderColor: emailError ? 'red' : 'orange' }]}>
            <Image source={mailIcon} style={SignupStyle.icon}></Image>
            <TextInput
              style={[SignupStyle.input, { color: colors.text }]}
              placeholder="EMAIL ADDRESS"
              placeholderTextColor={colors.text}
              value={user_email}
              onChangeText={(text) => {
                setEmail(text);
                setConfirmPasswordError(''); // Clear password error when user starts typing
                setEmailError('');
                setPasswordError('');
                setNameError('');
              }}
            />
          </View>
          {emailError ? <Text style={SignupStyle.errorText}>{emailError}</Text> : null}

          <View style={[SignupStyle.inputContainer, { borderColor: passwordError ? 'red' : 'orange' }]}>
            <Image source={lockIcon} style={SignupStyle.icon}></Image>
            <TextInput
              style={[SignupStyle.input, { color: colors.text }]}
              placeholder="PASSWORD"
              placeholderTextColor={colors.text}
              secureTextEntry
              value={user_password}
              onChangeText={(text) => {
                setPassword(text);
                setConfirmPasswordError(''); // Clear password error when user starts typing
                setEmailError('');
                setPasswordError('');
                setNameError('');
              }}
            />
          </View>
          {passwordError ? <Text style={SignupStyle.errorText}>{passwordError}</Text> : null}

          <View style={[SignupStyle.inputContainer, { borderColor: confirmPasswordError ? 'red' : 'orange' }]}>
            <Image source={lockIcon} style={SignupStyle.icon}></Image>
            <TextInput
              style={[SignupStyle.input, { color: colors.text }]}
              placeholder="CONFIRM PASSWORD"
              placeholderTextColor={colors.text}
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError(''); // Clear password error when user starts typing
                setEmailError('');
                setPasswordError('');
                setNameError('');
              }}
            />
          </View>
          {confirmPasswordError ? <Text style={SignupStyle.errorText}>{confirmPasswordError}</Text> : null}

          <TouchableOpacity style={SignupStyle.button} onPress={handleSignup}>
            <Text style={[SignupStyle.buttonText, { color: colors.text }]}>Signup</Text>
          </TouchableOpacity>
        </View>

        {/* Use CustomPopup Component */}
        <CustomPopup visible={showPopup} message={loading ? "Signing up..." : "Processing..."} />
      </View>
    </ScrollView>
  );
};

export default Signup;
