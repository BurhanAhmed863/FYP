import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MatchesStyle from '../styles/MatchesStyle';
import { useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import apiConnection from './apiConnection';

const PlayerStats = ({ route, navigation }) => {
    const { playerId, imageUrl, selectedTeam } = route.params;

    const [view, setView] = useState('batting'); // Default view is batting

    // States for stats data
    const [battingStats, setBattingStats] = useState({});
    const [bowlingStats, setBowlingStats] = useState({});
    const [statsData, setStatsData] = useState({}); // Currently displayed stats

    const { colors } = useTheme();
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    // Fetch batting stats for player
    const fetchBattingStats = async (playerId) => {
        try {
            const response = await fetch(`${apiConnection.apiIp}/fetchPlayerStats.php?playerId=${playerId}`);
            const text = await response.text();
            console.log(text);
            const result = JSON.parse(text);

            if (result.status === 'success') {
                const data = result.data[0];
                const batting = {
                    name: data.player_name,
                    team: selectedTeam.name,
                    dismissed: data.total_dismissals ?? 0,  // Default to 0 if null or undefined
                    runs: parseInt(data.total_highest_runs, 10) || 0, // Default to 0 if null or NaN
                    innings: parseInt(data.total_matches, 10) || 0, // Default to 0 if null or NaN
                    average: parseFloat(data.batting_average) || 0.0, // Default to 0.0 if null or NaN
                    strikeRate: data.strike_rate ?? 0, // Default to 0 if null or undefined
                    best: parseInt(data.best_score, 10) || 0, // Default to 0 if null or NaN
                    thirties: parseInt(data.thirties, 10) || 0, // Default to 0 if null or NaN
                    fifties: parseInt(data.fifties, 10) || 0, // Default to 0 if null or NaN
                    hundreds: parseInt(data.hundreds, 10) || 0, // Default to 0 if null or NaN
                    notOuts: (parseInt(data.total_matches, 10) || 0) - (parseInt(data.total_dismissals, 10) || 0), // Default to 0 if null or NaN
                    fours: parseInt(data.total_fours, 10) || 0, // Default to 0 if null or NaN
                    sixes: parseInt(data.total_sixes, 10) || 0, // Default to 0 if null or NaN
                };
                setBattingStats(batting);
                setStatsData(batting); // Default to batting stats
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error fetching batting stats:", error);
        }
    };

    // Fetch bowling stats for player
    const fetchBowlingStats = async (playerId) => {
        try {
            const response = await fetch(`${apiConnection.apiIp}/fetchBowlerStats.php?playerId=${playerId}`);
            const text = await response.text();
            console.log(text);
            const result = JSON.parse(text);

            if (result.status === 'success') {
                const data = result.data[0];
                const bowling = {
                    name: data.player_name,
                    team: selectedTeam.name,
                    innings: parseInt(data.total_matches, 10) || 0, // Default to 0 if null or NaN
                    balls: parseFloat(data.total_balls) || 0, // Default to 0 if null or NaN
                    wickets: parseInt(data.total_wickets, 10) || 0, // Default to 0 if null or NaN
                    economy: parseFloat(data.economy_rate) || 0.0, // Default to 0.0 if null or NaN
                    best: data.best_bowling ?? 0, // Default to 0 if null or undefined
                    maidens: parseInt(data.maiden_overs, 10) || 0, // Default to 0 if null or NaN
                    runs: parseInt(data.total_runs_concede, 10) || 0, // Default to 0 if null or NaN
                    threeWickets: parseInt(data.three_wicket_hauls, 10) || 0, // Default to 0 if null or NaN
                    fiveWickets: parseInt(data.five_wicket_hauls, 10) || 0, // Default to 0 if null or NaN
                    Average: parseFloat(data.bowling_average) || 0.0, // Default to 0.0 if null or NaN
                };
                
                setBowlingStats(bowling);
                setStatsData(bowling); // Default to bowling stats if selected view is bowling
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("Error fetching bowling stats:", error);
        }
    };

    useEffect(() => {
        // Fetch player stats based on selected view
        if (view === 'batting') {
            fetchBattingStats(playerId);
        } else if (view === 'bowling') {
            fetchBowlingStats(playerId);
        }
    }, [playerId, view]);

    // Update displayed stats when the view changes
    useEffect(() => {
        setStatsData(view === 'batting' ? battingStats : bowlingStats);
    }, [view, battingStats, bowlingStats]);

    return (
        <ScrollView style={[MatchesStyle.container, { backgroundColor: colors.background }]}>
            <View style={MatchesStyle.header}>
                <View style={MatchesStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[MatchesStyle.title, { color: colors.text }]}>
                    {view === 'batting' ? 'BATTING STATS' : 'BOWLING STATS'}
                </Text>
                <Image source={userIcon} style={MatchesStyle.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={MatchesStyle.iconSearch} />
            </View>

            <View style={styles.playerInfoContainer}>
                <Image
                    source={imageUrl ? { uri: imageUrl } : userIcon} // Use userIcon if imageUrl is null
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.playerName}>{statsData.name}</Text>
                    <Text style={styles.playerTeam}>{statsData.team}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.shareIcon}>🔗</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, view === 'batting' && styles.activeButton]}
                    onPress={() => setView('batting')}
                >
                    <Text style={styles.buttonText}>Batting Stats</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, view === 'bowling' && styles.activeButton]}
                    onPress={() => setView('bowling')}
                >
                    <Text style={styles.buttonText}>Bowling Stats</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statsGrid}>
                {Object.entries(statsData).map(([label, value], index) => {
                    if (label === 'name' || label === 'team') return null; // Skip name and team
                    return (
                        <View style={styles.statCard} key={index}>
                            <Text style={styles.statLabel}>{label.toUpperCase()}</Text>
                            <Text style={styles.statValue}>{value}</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    heading: {
        fontSize: 22,
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#000',
    },
    playerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EEE',
    },
    playerName: {
        fontSize: 18,
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        color: '#EB001B',
    },
    playerTeam: {
        fontSize: 15,
        fontFamily: 'SignikaNegative-Regular',
        color: '#f79e1b',
    },
    shareIcon: {
        fontSize: 20,
        fontFamily: 'SignikaNegative-Regular',
        color: '#666',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 8,
        borderRadius: 8,
        borderWidth: 4,
        borderColor: '#EB001B',
        backgroundColor: '#EB001B',
    },
    activeButton: {
        backgroundColor: '#f79e1b',
        borderWidth: 4,
        borderColor: '#EB001B'
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    statCard: {
        width: '29%',
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        elevation: 2,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
        color: '#EB001B',
        textAlign: 'center',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
        color: '#333',
    },
});

export default PlayerStats;
