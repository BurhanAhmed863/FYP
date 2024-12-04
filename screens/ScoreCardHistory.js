import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import apiConnection from './apiConnection';

const ScoreCardHistory = ({ route, navigation }) => {
    const { match_id } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [inningsData, setInningsData] = useState({ firstInnings: null, secondInnings: null });

    useEffect(() => {
        fetchMatchSummary();
    }, []);

    const fetchMatchSummary = async () => {
        try {
            const firstInnings = await fetchInningsData(1);
            const secondInnings = await fetchInningsData(2);

            setInningsData({
                firstInnings,
                secondInnings,
            });
        } catch (error) {
            console.error('Error fetching match summary:', error);
            Alert.alert('Error', 'Unable to fetch match summary.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchInningsData = async (innings) => {
        try {
            const response = await fetch(`${apiConnection.apiIp}/fetchScoreboardHistory.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    match_id: match_id,
                    innings,
                }),
            });

            const resultText = await response.text();
            console.log(`Innings ${innings} Data:`, resultText);

            const data = JSON.parse(resultText);
            if (data.status === 'success') {
                const inningsData = data.data.filter(item => item.batsman_name && item.bowler_name);

                // Process the data into batsmen and bowlers stats
                const batsmen = {};
                const bowlers = {};

                inningsData.forEach(item => {
                    // Collect batsmen data
                    if (!batsmen[item.batsman_name]) {
                        batsmen[item.batsman_name] = {
                            name: item.batsman_name,
                            runs: 0,
                            balls: 0,
                            fours: 0,
                            sixes: 0,
                            strikeRate: 0,
                            wicketType: item.wicket_type,
                        };
                    }
                    batsmen[item.batsman_name].runs += item.runs_scored;
                    batsmen[item.batsman_name].balls = item.ball_number;
                    batsmen[item.batsman_name].fours = item.fours;
                    batsmen[item.batsman_name].sixes = item.sixes;
                    batsmen[item.batsman_name].strikeRate = item.strike_rate;

                    // Collect bowler data
                    if (!bowlers[item.bowler_name]) {
                        bowlers[item.bowler_name] = {
                            name: item.bowler_name,
                            runs: 0,
                            balls: 0,
                            overs: item.over_count,
                            wickets: item.total_wickets,
                            economy: item.economy_rate,
                        };
                    }
                    bowlers[item.bowler_name].runs = item.total_runs;
                    bowlers[item.bowler_name].balls = item.total_balls;
                });

                return { batsmen: Object.values(batsmen), bowlers: Object.values(bowlers) };
            } else {
                throw new Error(data.message || `Failed to load data for innings ${innings}.`);
            }
        } catch (error) {
            console.error(`Error fetching innings ${innings} data:`, error);
            throw error;
        }
    };

    const renderSection = (title, content) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>{title}</Text>
            {content}
        </View>
    );

    const renderStatsRow = (label, value) => (
        <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>{label}</Text>
            <Text style={styles.statsValue}>{value}</Text>
        </View>
    );

    const renderInningsData = (title, innings) => {
        if (!innings) {
            return <Text style={styles.errorText}>{title} data not available.</Text>;
        }

        return (
            <>
                {renderSection(
                    `${title} - Batsmen`,
                    <FlatList
                        data={innings.batsmen}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View style={styles.statsRow}>
                                <Text style={styles.statsLabel}>{item.name}</Text>
                                <Text style={styles.statsValue}>
                                    {item.runs}({item.balls}) • {item.fours}x4 • {item.sixes}x6 • SR: {item.strikeRate}
                                </Text>
                            </View>
                        )}
                    />
                )}
                {renderSection(
                    `${title} - Bowlers`,
                    <FlatList
                        data={innings.bowlers}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <View style={styles.statsRow}>
                                <Text style={styles.statsLabel}>{item.name}</Text>
                                <Text style={styles.statsValue}>
                                    {item.overs} Ov • {item.runs} R • {item.wickets} W • Eco: {item.economy}
                                </Text>
                            </View>
                        )}
                    />
                )}
            </>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loaderText}>Loading Match Summary...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Match Summary</Text>

            {renderInningsData('1st Innings', inningsData.firstInnings)}
            {renderInningsData('2nd Innings', inningsData.secondInnings)}

            <View style={styles.buttonContainer}>
                <Button title="Back to Match" color="#E79E1B" onPress={() => navigation.goBack()} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: wp('5%'),
    },
    header: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginVertical: hp('2%'),
    },
    sectionContainer: {
        backgroundColor: '#1C1C1E',
        borderRadius: wp('2%'),
        marginBottom: hp('2%'),
        padding: wp('4%'),
    },
    sectionHeader: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: hp('1%'),
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    statsLabel: {
        fontSize: wp('4%'),
        color: '#E79E1B',
        fontWeight: '500',
    },
    statsValue: {
        fontSize: wp('4%'),
        color: '#FFFFFF',
    },
    buttonContainer: {
        marginTop: hp('3%'),
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    loaderText: {
        color: '#FFD700',
        fontSize: wp('4.5%'),
        marginTop: hp('1%'),
    },
    errorText: {
        color: '#FFD700',
        fontSize: wp('5%'),
        textAlign: 'center',
    },
});

export default ScoreCardHistory;
