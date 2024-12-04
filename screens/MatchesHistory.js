import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import ResultsStyles from '../styles/ResultsStyles';
import TournamentDetailStyles from '../styles/TournamentDetailStyles';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import apiConnection from './apiConnection';

const MatchesHistory = ({navigation}) => {
    const [resultsData, setResultsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchResultsData = async () => {
        try {
            const response = await fetch(`${apiConnection.apiIp}/resultOfMatches.php`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch results from the server.');
            }

            const resultText = await response.text();
            console.log('Data', resultText);
            // console.log('BATSMEN DATA:: ', batsmenData)
            const data = JSON.parse(resultText);
            if (data.status === 'success' && Array.isArray(data.results)) {
                setResultsData(data.results);
            } else {
                Alert.alert('Error', 'Failed to load results data.');
            }
        } catch (error) {
            console.error('API Error:', error);
            Alert.alert('Error', 'Failed to fetch results.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResultsData();
    }, []);

    const renderResultCard = ({ item }) => (
        <TouchableOpacity onPress={()=> (navigation.navigate('ScoreCardHistory',{match_id: item.m_id}))}>
            <LinearGradient
                colors={['#EB3F40', '#EC0820']}
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
                            <Text style={ResultsStyles.matchNumberText}>No: {item.m_id}</Text>
                            <Text style={ResultsStyles.timeText}>{item.date}</Text>
                        </View>
                        {/* <Text style={ResultsStyles.finishedText}>{item.finished ? 'Finished' : 'Upcoming'}</Text> */}
                    </View>

                    <View style={ResultsStyles.separator} />

                    <View style={ResultsStyles.matchRow}>
                        <View style={ResultsStyles.teamSection}>
                            <Image source={item.teamAIcon} style={ResultsStyles.matchIcon} />
                            <Text style={ResultsStyles.teamText}>{item.team_loss_name}</Text>
                        </View>
                        <View style={ResultsStyles.teamSection}>
                            <Text style={ResultsStyles.statsText}>{item.total_runs_first_innings}-{item.total_wickets_first_innings}</Text>
                            <Text style={ResultsStyles.overText}>{item.current_over_and_ball_first_innings}</Text>
                        </View>
                        <Text style={ResultsStyles.vsText}>vs</Text>

                        <View style={ResultsStyles.teamSection}>
                            <Text style={ResultsStyles.statsText}>{item.total_runs_second_innings}-{item.total_wickets_second_innings}</Text>
                            <Text style={ResultsStyles.overText}>{item.current_over_and_ball_second_innings}</Text>
                        </View>

                        <View style={ResultsStyles.teamSection}>
                            <Image source={item.teamBIcon} style={ResultsStyles.matchIcon} />
                            <Text style={ResultsStyles.teamText}>{item.team_won_name}</Text>
                        </View>
                    </View>

                    <View style={ResultsStyles.separator} />

                    <Text style={ResultsStyles.resultText}>{item.result}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    const { colors } = useTheme();

    if (loading) {
        return (
            <View style={ResultsStyles.loadingContainer}>
                <Text style={ResultsStyles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={ResultsStyles.container}>
            <View style={TournamentDetailStyles.header}>
                <Text style={[TournamentDetailStyles.title, { color: colors.text }]}>Match Results</Text>
                <Icon name="search" size={23} color="#f79e1b" style={TournamentDetailStyles.iconSearch} />
            </View>
            <FlatList
                data={resultsData}
                renderItem={renderResultCard}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default MatchesHistory;
