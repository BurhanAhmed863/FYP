import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EveryOverInningsSummary = ({ route, navigation }) => {
    const { battingSummary, bowlingSummary, totalScore, totalOvers, currentOver, setInnings, matchId, innings } = route.params;

    // Group data by teams for batting and bowling
    const groupByTeam = (summary, teamKey) => {
        const groupedData = {};
        summary.forEach((item) => {
            const teamName = item[teamKey];
            if (!groupedData[teamName]) {
                groupedData[teamName] = [];
            }
            groupedData[teamName].push(item);
        });
        return groupedData;
    };

    const battingByTeam = groupByTeam(battingSummary, 'battingFirst_name');
    const bowlingByTeam = groupByTeam(bowlingSummary, 'bowlingFirst_name');

    // Render summary for a specific team
    const renderTeamSummary = (teamName, summary, isBatting) => (
        <View style={styles.card} key={teamName}>
            <Text style={styles.teamHeader}>{teamName} - {isBatting ? 'Batting' : 'Bowling'}</Text>
            <FlatList
                data={summary}
                keyExtractor={(item, index) => `${teamName}_${index}`}
                renderItem={({ item }) => (
                    <View style={styles.statsRow}>
                        <Text style={styles.cell}>{isBatting ? item.batsman_name : item.bowler_name}</Text>
                        {isBatting ? (
                            <>
                                <Text style={styles.cell}>{item.runs_scored}</Text>
                                <Text style={styles.cell}>{item.ball_number}</Text>
                                <Text style={styles.cell}>{item.fours}</Text>
                                <Text style={styles.cell}>{item.sixes}</Text>
                                <Text style={styles.cell}>{item.strike_rate}</Text>
                            </>
                        ) : (
                            <>
                                {/* <Text style={styles.cell}>
                                    {(item.total_balls / 6).toFixed(1)}
                                </Text> */}
                                <Text style={styles.cell}>{item.total_balls}</Text>
                                <Text style={styles.cell}>{item.total_runs}</Text>
                                <Text style={styles.cell}>{item.total_wickets}</Text>
                                <Text style={styles.cell}>{item.economy_rate}</Text>
                            </>
                        )}
                    </View>
                )}
                ListHeaderComponent={
                    <View style={styles.headerRow}>
                        <Text style={styles.headerCell}>{isBatting ? 'Batsman' : 'Bowler'}</Text>
                        {isBatting ? (
                            <>
                                <Text style={styles.headerCell}>R</Text>
                                <Text style={styles.headerCell}>B</Text>
                                <Text style={styles.headerCell}>4s</Text>
                                <Text style={styles.headerCell}>6s</Text>
                                <Text style={styles.headerCell}>SR</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.headerCell}>O</Text>
                                <Text style={styles.headerCell}>R</Text>
                                <Text style={styles.headerCell}>W</Text>
                                <Text style={styles.headerCell}>Eco</Text>
                            </>
                        )}
                    </View>
                }
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{innings} Innings Summary</Text>
            <Text style={styles.score}>
                Total Score: {totalScore.runs}/{totalScore.wickets} ({totalOvers} Overs)
            </Text>

            <Text style={styles.sectionHeader}>Batting Summary</Text>
            {Object.entries(battingByTeam).map(([teamName, summary]) =>
                renderTeamSummary(teamName, summary, true)
            )}

            <Text style={styles.sectionHeader}>Bowling Summary</Text>
            {Object.entries(bowlingByTeam).map(([teamName, summary]) =>
                renderTeamSummary(teamName, summary, false)
            )}

            {/* <Button title="Back to Match" onPress={() => navigation.goBack()} /> */}
            {innings === 1 && (
                <Button
                    title="Start Next Innings"
                    onPress={() => {
                        if (setInnings) {
                            setInnings(2); // Update innings to 2
                        } else {
                            console.warn('setInnings is not defined');
                        }
                        navigation.navigate('Scoreboard', { matchId });
                    }}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: 'black',
    },
    header: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        color: '#FFD700',
    },
    score: {
        fontSize: wp('4.5%'),
        marginBottom: hp('2%'),
        color: '#FFFFFF',
    },
    sectionHeader: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginBottom: hp('1%'),
        color: '#FFD700',
    },
    card: {
        backgroundColor: '#1C1C1E',
        padding: wp('4%'),
        borderRadius: wp('2%'),
        marginBottom: hp('2%'),
    },
    teamHeader: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        color: '#E79E1B',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('0.5%'),
    },
    cell: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: wp('3.5%'),
    },
});

export default EveryOverInningsSummary;
