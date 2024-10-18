import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Hello from './screens/Hello'; // Adjust the import path as necessary
import Login from './screens/Login';
import Signup from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Matches from './screens/Matches';
import EnterTeam from './screens/EnterTeam';
import EnterPlayers from './screens/EnterPlayers';
import DetailMatch from './screens/DetailMatch';
import Scoreboard from './screens/Scoreboard';
import { ThemeProvider } from './theme/ThemeContext'; // Ensure correct import path

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Hello" component={Hello} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="Matches" component={Matches} options={{ headerShown: false }} />
          <Stack.Screen name="EnterTeam" component={EnterTeam} options={{ headerShown: false }} />
          <Stack.Screen name="EnterPlayers" component={EnterPlayers} options={{ headerShown: false }} />
          <Stack.Screen name="DetailMatch" component={DetailMatch} options={{ headerShown: false }} />
          <Stack.Screen name="Scoreboard" component={Scoreboard} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
