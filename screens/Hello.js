// Hello.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const Hello = () => {
  const { colors, toggleTheme, themePreference } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Hello World!</Text>
      
      <Text style={{ color: colors.text }}>Current Theme: {themePreference}</Text>

      <Button title="Light Theme" onPress={() => toggleTheme('light')} />
      <Button title="Dark Theme" onPress={() => toggleTheme('dark')} />
      <Button title="System Default" onPress={() => toggleTheme('system')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Hello;
