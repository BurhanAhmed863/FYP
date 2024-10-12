import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For saving data locally

// Create the context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Detect system theme (light/dark)
  const [themePreference, setThemePreference] = useState('light'); // Default to light theme
  const [isDarkTheme, setIsDarkTheme] = useState(systemColorScheme === 'dark');

  // Load the saved theme preference from AsyncStorage
  useEffect(() => {
    const loadThemePreference = async () => {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      if (savedTheme) {
        setThemePreference(savedTheme);
        setIsDarkTheme(savedTheme === 'dark' || (savedTheme === 'system' && systemColorScheme === 'dark'));
      } else {
        setThemePreference('light'); // Default to light if no preference is stored
      }
    };
    loadThemePreference();
  }, [systemColorScheme]);

  // Toggle theme manually and save the preference to AsyncStorage
  const toggleTheme = async (newTheme) => {
    setThemePreference(newTheme);
    if (newTheme === 'dark') {
      setIsDarkTheme(true);
    } else if (newTheme === 'light') {
      setIsDarkTheme(false);
    } else if (newTheme === 'system') {
      setIsDarkTheme(systemColorScheme === 'dark');
    }
    await AsyncStorage.setItem('themePreference', newTheme); // Save the user's preference
  };

  const theme = {
    isDarkTheme,
    themePreference, // Expose the current preference (dark, light, system)
    colors: {
      background: isDarkTheme ? '#333' : '#f1f0f0',
      text: isDarkTheme ? '#fff' : '#000',
    },
    toggleTheme, // Method to change the theme
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
