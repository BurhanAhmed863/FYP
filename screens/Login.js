// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation } from '@react-navigation/native';
import LoginStyle from '../styles/LoginStyle';
import Icon from 'react-native-vector-icons/AntDesign'; // Import FontAwesome icons
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const { colors } = useTheme(); // Get colors from theme context
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Determine the profile and lock icon based on the theme
  const profileIcon = colors.background === '#333' ? require('../assets/icons/profile_white.png') : require('../assets/icons/profile.png');
  const lockIcon = colors.background === '#333' ? require('../assets/icons/lock_white.png') : require('../assets/icons/lock.png');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    navigation.navigate('Dashboard'); // Navigate to the Home screen after successful login
  };

  return (
    <View style={[LoginStyle.container, { backgroundColor: colors.background }]}>
      <View style={[LoginStyle.iconContainer]}>
      <TouchableOpacity onPress={handleLogin}>
        <Icon name="caretleft" size={25} color='#EB001B' />
        </TouchableOpacity>
      </View>
      <View style={LoginStyle.centeredContent}>
        <Text style={[LoginStyle.title, { color: colors.text }]}>Login</Text>
        <View style={LoginStyle.inputContainer}>
          <Image source={profileIcon} style={LoginStyle.icon}></Image>
          <TextInput
            style={[LoginStyle.input, { borderColor: colors.text }]}
            placeholder="USERNAME"
            placeholderTextColor={colors.text}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Image source={lockIcon} style={LoginStyle.icon}></Image>
          <TextInput
            style={[LoginStyle.input, { borderColor: colors.text }]}
            placeholder="PASSWORD"
            placeholderTextColor={colors.text}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={LoginStyle.button} onPress={handleLogin}>
          <Text style={[LoginStyle.buttonText, { color: colors.text }]}>Login</Text>
        </TouchableOpacity>

        <View style={LoginStyle.linkContainer}>
          <Text style={[LoginStyle.linktext, { color: colors.text }]}>You don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[LoginStyle.linkbutton, { color: colors.text }]}>Sign up here</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Login;
