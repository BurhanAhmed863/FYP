import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import FixturesStyles from '../styles/FixturesStyles'; // Style file for the fixtures screen
import Icon from 'react-native-vector-icons/Feather';
import TournamentDetailStyles from '../styles/TournamentDetailStyles';

const FixturesScreen = () => {
    const { colors } = useTheme();

    // Example IPL-style data structure for fixtures
    const fixturesData = [
        {
            stage: 'Group A',
            matches: [
                {
                    teamA: 'Team A',
                    teamB: 'Team B',
                    time: '3:00 PM',
                    date: '2024-11-20',
                    venue: 'Stadium 1',
                },
                {
                    teamA: 'Team C',
                    teamB: 'Team D',
                    time: '7:00 PM',
                    date: '2024-11-21',
                    venue: 'Stadium 2',
                },
            ],
        },
        {
            stage: 'Group B',
            matches: [
                {
                    teamA: 'Team E',
                    teamB: 'Team F',
                    time: '4:00 PM',
                    date: '2024-11-22',
                    venue: 'Stadium 3',
                },
                {
                    teamA: 'Team G',
                    teamB: 'Team H',
                    time: '8:00 PM',
                    date: '2024-11-23',
                    venue: 'Stadium 4',
                },
            ],
        },
        {
            stage: 'Semi-Finals',
            matches: [
                {
                    teamA: 'Winner Group A',
                    teamB: 'Runner-Up Group B',
                    time: '6:00 PM',
                    date: '2024-11-25',
                    venue: 'Stadium 5',
                },
                {
                    teamA: 'Winner Group B',
                    teamB: 'Runner-Up Group A',
                    time: '7:30 PM',
                    date: '2024-11-26',
                    venue: 'Stadium 6',
                },
            ],
        },
        {
            stage: 'Final',
            matches: [
                {
                    teamA: 'Winner SF 1',
                    teamB: 'Winner SF 2',
                    time: '8:00 PM',
                    date: '2024-11-28',
                    venue: 'Main Stadium',
                },
            ],
        },
    ];

    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');
    const matchIcon = require('../assets/icons/AvB.png'); // Example match icon

    return (
        <ScrollView
            style={[FixturesStyles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <View style={TournamentDetailStyles.header}>
                <Text style={[TournamentDetailStyles.title, { color: colors.text }]}>Fixtures</Text>
                <Image source={userIcon} style={TournamentDetailStyles.icon}></Image>
                <Icon name="calendar" size={23} color="#f79e1b" style={TournamentDetailStyles.iconSearch} />
            </View>

            {fixturesData.map((stage, stageIndex) => (
                <View key={stageIndex} style={FixturesStyles.pointsTableContainer}>
                    <Text style={[FixturesStyles.stageHeader, { color: colors.text }]}>
                        {stage.stage}
                    </Text>

                    {stage.matches.map((match, matchIndex) => (
                        <LinearGradient
                            key={matchIndex}
                            colors={matchIndex % 2 === 0 ? ['#FEC570', '#F7A01F'] : ['#EB3F40', '#EC0820']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={FixturesStyles.matchCard}
                        >
                            <View style={FixturesStyles.matchRow}>
                                <Image source={matchIcon} style={FixturesStyles.matchIcon} />
                                <View>
                                    <Text style={[FixturesStyles.teamText, { color: colors.text }]}>
                                        {match.teamA} vs {match.teamB}
                                    </Text>
                                    <Text style={[FixturesStyles.matchDetails, { color: colors.text }]}>
                                        Date: {match.date} | Time: {match.time}
                                    </Text>
                                    <Text style={[FixturesStyles.matchDetails, { color: colors.text }]}>
                                        Venue: {match.venue}
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

export default FixturesScreen;
