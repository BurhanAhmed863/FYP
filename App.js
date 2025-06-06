  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import Toast from 'react-native-toast-message';

  
import Hello from './screens/Hello';
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
import EnterTournamentPlayers from './screens/EnterTournamentPlayers';
import SpeedDisplayScreen from './screens/SpeedDisplayScreen';
import BallVision from './screens/BallVision';
import BallVisionPreview from './screens/BallVisionPreview';
import SpeedHistory from './screens/SpeedHistory';
import TournamentDetail from './screens/TournamentDetail';
import PointsTable from './screens/PointsTable';
import FixturesScreen from './screens/FixturesScreen';
import TournamentResultsScreen from './screens/TournamentResultsScreen';
import EveryOverInningsSummary from './screens/EveryOverInningsSummary';
import MatchesHistory from './screens/MatchesHistory';
import ScoreCardHistory from './screens/ScoreCardHistory';
import PlayerStats from './screens/PlayerStats';
import ActionTrack from './screens/ActionTrack';
import ActionPreview from './screens/ActionPreview';
import ActionTrackResult from './screens/ActionTrackResult';


// Theme context
import { ThemeProvider } from './theme/ThemeContext';

  // impo
  const Stack = createStackNavigator();

  const App = () => {
    return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="PlayerStats" component={PlayerStats} options={{ headerShown: false }} />
            <Stack.Screen name="ScoreCardHistory" component={ScoreCardHistory} options={{ headerShown: false }} />
            <Stack.Screen name="MatchesHistory" component={MatchesHistory} options={{ headerShown: false }} />
            <Stack.Screen name="EveryOverInningsSummary" component={EveryOverInningsSummary} options={{ headerShown: false }} />
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
            <Stack.Screen name="EnterTournamentPlayers" component={EnterTournamentPlayers} options={{ headerShown: false }} />
            <Stack.Screen name="SpeedDisplayScreen" component={SpeedDisplayScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BallVision" component={BallVision} options={{ headerShown: false }} />
            <Stack.Screen name="BallVisionPreview" component={BallVisionPreview} options={{ headerShown: false }} />
            <Stack.Screen name="SpeedHistory" component={SpeedHistory} options={{ headerShown: false }} />
            <Stack.Screen name="ActionTrack" component={ActionTrack} options={{ headerShown: false }} />
            <Stack.Screen name="ActionPreview" component={ActionPreview} options={{ headerShown: false }} />
            <Stack.Screen name="ActionTrackResult" component={ActionTrackResult} options={{ headerShown: false }} />
            <Stack.Screen name="TournamentDetail" component={TournamentDetail} options={{ headerShown: false }} />
            <Stack.Screen name="PointsTable" component={PointsTable} options={{ headerShown: false }} />
            <Stack.Screen name="FixturesScreen" component={FixturesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TournamentResultsScreen" component={TournamentResultsScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    );
  };

  export default App;
