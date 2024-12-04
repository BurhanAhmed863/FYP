import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import ResultsStyles from '../styles/ResultsStyles';
import TournamentDetailStyles from '../styles/TournamentDetailStyles';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather'; // Import FontAwesome icons
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import moment from 'moment'; // For formatting date and time

const mockResultsData = [
    {
        id: '1',
        teamA: 'Team Alpha',
        teamB: 'Team Beta',
        teamAIcon: require('../assets/icons/AvB.png'),
        teamBIcon: require('../assets/icons/AvB.png'),
        result: 'Team Alpha won by 20 runs',
        date: '2024-11-15',
        matchNumber: 'Match 1',
        teamAruns: 160,
        teamBruns: 120,
        teamAovers: 15.5,
        teamBovers: 12.5,
        time: '10:00 AM',
        // finished: true,
        teamAWickets: 5,
        teamBWickets: 6,
    },
    {
        id: '2',
        teamA: 'Team Gamma',
        teamB: 'Team Delta',
        teamAruns: 150,
        teamBruns: 110,
        teamAovers: 15.5,
        teamBovers: 12.5,
        teamAIcon: require('../assets/icons/AvB.png'),
        teamBIcon: require('../assets/icons/AvB.png'),
        result: 'Match Drawn',
        date: '2024-11-14',
        matchNumber: 'Match 2',
        time: '3:00 PM',
        // finished: false,
        teamAWickets: 4,
        teamBWickets: 7,
    },
    {
        id: '3',
        teamA: 'Team Alpha',
        teamB: 'Team Beta',
        teamAIcon: require('../assets/icons/AvB.png'),
        teamBIcon: require('../assets/icons/AvB.png'),
        result: 'Team Alpha won by 20 runs',
        date: '2024-11-15',
        matchNumber: 'Match 1',
        teamAruns: 160,
        teamBruns: 120,
        teamAovers: 15.5,
        teamBovers: 12.5,
        time: '10:00 AM',
        // finished: true,
        teamAWickets: 5,
        teamBWickets: 6,
    },
    {
        id: '4',
        teamA: 'Team Gamma',
        teamB: 'Team Delta',
        teamAruns: 150,
        teamBruns: 110,
        teamAovers: 15.5,
        teamBovers: 12.5,
        teamAIcon: require('../assets/icons/AvB.png'),
        teamBIcon: require('../assets/icons/AvB.png'),
        result: 'Match Drawn',
        date: '2024-11-14',
        matchNumber: 'Match 2',
        time: '3:00 PM',
        // finished: false,
        teamAWickets: 4,
        teamBWickets: 7,
    },
    {
        id: '5',
        teamA: 'Team Alpha',
        teamB: 'Team Beta',
        teamAIcon: require('../assets/icons/AvB.png'),
        teamBIcon: require('../assets/icons/AvB.png'),
        result: 'Team Alpha won by 20 runs',
        date: '2024-11-15',
        matchNumber: 'Match 1',
        teamAruns: 160,
        teamBruns: 120,
        teamAovers: 15.5,
        teamBovers: 12.5,
        time: '10:00 AM',
        // finished: true,
        teamAWickets: 5,
        teamBWickets: 6,
    },
    {
        id: '6',
        teamA: 'Team Gamma',
        teamB: 'Team Delta',
        teamAruns: 150,
        teamBruns: 110,
        teamAovers: 15.5,
        teamBovers: 12.5,
        teamAIcon: require('../assets/icons/AvB.png'),
        teamBIcon: require('../assets/icons/AvB.png'),
        result: 'Match Drawn',
        date: '2024-11-14',
        matchNumber: 'Match 2',
        time: '3:00 PM',
        // finished: false,
        teamAWickets: 4,
        teamBWickets: 7,
    },
    // Add more mock results here
];

const TournamentResultsScreen = () => {
    const renderResultCard = ({ item }) => (
        <LinearGradient
            colors={['#EB3F40', '#EC0820']} // Red and yellow gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={ResultsStyles.resultCard}
        >
            <View style={ResultsStyles.matchBox}>
                <View style={ResultsStyles.upperBox}>
                    <View style={ResultsStyles.dateSection}>
                        <Text style={ResultsStyles.dateText}>{moment(item.date).format('MMM D, YYYY')}</Text>
                        <Text style={ResultsStyles.dayText}>{moment(item.date).format('dddd')}</Text>
                    </View>
                    <View style={ResultsStyles.matchInfo}>
                        <Text style={ResultsStyles.matchNumberText}>{item.matchNumber}</Text>
                        <Text style={ResultsStyles.timeText}>{item.time}</Text>
                    </View>
                    {/* <Text style={ResultsStyles.finishedText}>{item.finished ? 'Finished' : 'Upcoming'}</Text> */}
                </View>

                <View style={ResultsStyles.separator} />

                <View style={ResultsStyles.matchRow}>
                    <View style={ResultsStyles.teamSection}>
                        <Image source={item.teamAIcon} style={ResultsStyles.matchIcon} />
                        <Text style={ResultsStyles.teamText}>{item.teamA}</Text>
                    </View>
                    <View style={ResultsStyles.teamSection}>
                        <Text style={ResultsStyles.statsText}>{item.teamAruns}-{item.teamAWickets}</Text>
                        <Text style={ResultsStyles.overText}>{item.teamBovers}</Text>
                    </View>
                    <Text style={ResultsStyles.vsText}>vs</Text>

                    <View style={ResultsStyles.teamSection}>
                        <Text style={ResultsStyles.statsText}>{item.teamBruns}-{item.teamBWickets}</Text>
                        <Text style={ResultsStyles.overText}>{item.teamAovers}</Text>
                    </View>

                    <View style={ResultsStyles.teamSection}>
                        <Image source={item.teamBIcon} style={ResultsStyles.matchIcon} />
                        <Text style={ResultsStyles.teamText}>{item.teamB}</Text>
                    </View>
                </View>

                <View style={ResultsStyles.separator} />

                <Text style={ResultsStyles.resultText}>{item.result}</Text>
            </View>
        </LinearGradient>
    );

    const { colors } = useTheme();
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    return (
        <View style={ResultsStyles.container}>
            <View style={TournamentDetailStyles.header}>
                <Text style={[TournamentDetailStyles.title, { color: colors.text }]}>Match Results</Text>
                <Image source={userIcon} style={TournamentDetailStyles.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={TournamentDetailStyles.iconSearch} />
            </View>
            <FlatList
                data={mockResultsData}
                renderItem={renderResultCard}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default TournamentResultsScreen;
