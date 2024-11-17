import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import LoginStyle from '../styles/LoginStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import apiConnection from './apiConnection';
import CustomPopup from '../Modal/CustomPopup'; // Import the CustomPopup component
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Pop-up state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { apiIp } = apiConnection;

  // Icons based on theme
  const profileIcon = colors.background === '#333' ? require('../assets/icons/profile_white.png') : require('../assets/icons/profile.png');
  const lockIcon = colors.background === '#333' ? require('../assets/icons/lock_white.png') : require('../assets/icons/lock.png');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateFields = () => {
    let valid = true;

    // Email validation
    if (!userEmail) {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailRegex.test(userEmail)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);
    setShowPopup(true);

    try {
      const response = await axios.post(`${apiIp}/login.php`, {
        user_email: userEmail,
        user_password: password,
      });

      const data = response.data;
      console.log(data);

      if (data.status === 'Error' || data.status === 'IncorrectCredentials') {
        setShowPopup(false);
        Alert.alert('Login Failed', data.msg);
      } else {
        setShowPopup(false);

        // Check if token exists in the response
        if (data.token) {
          await AsyncStorage.setItem('userToken', data.token); // Store the token in AsyncStorage
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('UserNotFound', data.msg);
        }
      }
    } catch (error) {
      setShowPopup(false);
      console.error('Error during login:', error);

      if (error.response && error.response.status === 401) {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <ScrollView style={[LoginStyle.scrollContainer, { backgroundColor: colors.background }]}>
      <View style={[LoginStyle.container, { backgroundColor: colors.background }]}>
        <View style={LoginStyle.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="caretleft" size={25} color='#EB001B' />
          </TouchableOpacity>
        </View>
        <View style={LoginStyle.centeredContent}>
          <Text style={[LoginStyle.title, { color: colors.text }]}>Login</Text>

          <View style={[LoginStyle.inputContainer, { borderColor: emailError ? 'red' : 'orange' }]}>
            <Image source={profileIcon} style={LoginStyle.icon} />
            <TextInput
              style={[LoginStyle.input, { color: colors.text }]}
              placeholder={"EMAIL"}
              placeholderTextColor={colors.text}
              value={userEmail}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(''); // Clear email error when user starts typing
                setPasswordError('');
              }}
            />
          </View>
          {emailError ? <Text style={LoginStyle.errorText}>{emailError}</Text> : null}

          <View style={[LoginStyle.inputContainer, { borderColor: passwordError ? 'red' : 'orange' }]}>
            <Image source={lockIcon} style={LoginStyle.icon} />
            <TextInput
              style={[LoginStyle.input, { color: colors.text }]}
              placeholder={"PASSWORD"}
              placeholderTextColor={colors.text}
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(''); // Clear password error when user starts typing
                setEmailError('');
              }}
            />
          </View>
          {passwordError ? <Text style={LoginStyle.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity style={LoginStyle.button} onPress={handleLogin} disabled={loading}>
            <Text style={[LoginStyle.buttonText, { color: colors.text }]}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={LoginStyle.linkContainer}>
            <Text style={[LoginStyle.linktext, { color: colors.text }]}>You don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={[LoginStyle.linkbutton, { color: colors.text }]}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Use CustomPopup Component */}
        <CustomPopup visible={showPopup} message="Logging in..." />
      </View>
    </ScrollView>
  );
};

export default Login;
