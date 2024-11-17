import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Hello from './screens/Hello'; // Adjust the import path as necessary
import Login from './screens/Login';
import Signup from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import Matches from './screens/Matches';
import EnterTeam from './screens/EnterTeam';
import EnterPlayers from './screens/EnterPlayers';
import DetailMatch from './screens/DetailMatch';
import Scoreboard from './screens/Scoreboard';
import Tournaments from './screens/Tournaments';
import EnterTournamentName from './screens/EnterTournamentName';
import EnterTournamentTeamName from './screens/EnterTournamentTeamName';
import { ThemeProvider } from './theme/ThemeContext'; // Ensure correct import path
import BowlingSpeed from './screens/BowlingSpeed';
import BallVision from './screens/BallVision';
import BallVisionPreview from './screens/BallVisionPreview';
import SpeedDisplayScreen from './screens/SpeedDisplayScreen';
import SpeedHistory from './screens/SpeedHistory';

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
          <Stack.Screen name="Tournaments" component={Tournaments} options={{ headerShown: false }} />
          <Stack.Screen name="EnterTournamentName" component={EnterTournamentName} options={{ headerShown: false }} />
          <Stack.Screen name="EnterTournamentTeamName" component={EnterTournamentTeamName} options={{ headerShown: false }} />
          <Stack.Screen name="SpeedDisplayScreen" component={SpeedDisplayScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BallVision" component={BallVision} options={{ headerShown: false }} />
          <Stack.Screen name="BallVisionPreview" component={BallVisionPreview} options={{ headerShown: false }} />
          <Stack.Screen name="SpeedHistory" component={SpeedHistory} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </ThemeProvider>
  );
};

export default App;
