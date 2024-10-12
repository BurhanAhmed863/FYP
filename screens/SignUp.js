// src/screens/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import SignupStyle from '../styles/SignupStyle';
import Icon from 'react-native-vector-icons/AntDesign'; // Import FontAwesome icons
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const { colors } = useTheme(); // Get colors from theme context
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Determine the profile and lock icon based on the theme
  const profileIcon = colors.background === '#333' ? require('../assets/icons/profile_white.png') : require('../assets/icons/profile.png');
  const lockIcon = colors.background === '#333' ? require('../assets/icons/lock_white.png') : require('../assets/icons/lock.png');
  const mailIcon = colors.background === '#333' ? require('../assets/icons/mail_white.png') : require('../assets/icons/mail.png');

  const handleSignup = () => {
    // Handle Signup logic here
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <View style={[SignupStyle.container, { backgroundColor: colors.background }]}>
      <View style={[SignupStyle.iconContainer]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="caretleft" size={25} color='#EB001B' />
        </TouchableOpacity>
      </View>
      <View style={SignupStyle.centeredContent}>
        <Text style={[SignupStyle.title, { color: colors.text }]}>Create ID</Text>

        <View style={SignupStyle.inputContainer}>
          <Image source={profileIcon} style={SignupStyle.icon}></Image>
          <TextInput
            style={[SignupStyle.input, { borderColor: colors.text }]}
            placeholder="FULL NAME"
            placeholderTextColor={colors.text}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={SignupStyle.inputContainer}>
          <Image source={mailIcon} style={SignupStyle.icon}></Image>
          <TextInput
            style={[SignupStyle.input, { borderColor: colors.text }]}
            placeholder="EMAIL ADDRESS"
            placeholderTextColor={colors.text}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={SignupStyle.inputContainer}>
          <Image source={lockIcon} style={SignupStyle.icon}></Image>
          <TextInput
            style={[SignupStyle.input, { borderColor: colors.text }]}
            placeholder="PASSWORD"
            placeholderTextColor={colors.text}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={SignupStyle.inputContainer}>
          <Image source={lockIcon} style={SignupStyle.icon}></Image>
          <TextInput
            style={[SignupStyle.input, { borderColor: colors.text }]}
            placeholder="CONFIRM PASSWORD"
            placeholderTextColor={colors.text}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={SignupStyle.button} onPress={handleSignup}>
          <Text style={[SignupStyle.buttonText, { color: colors.text }]}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
