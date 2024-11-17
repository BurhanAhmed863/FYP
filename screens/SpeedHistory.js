import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import SpeedHistoryStyle from '../styles/SpeedHistoryStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import apiConnection from './apiConnection';
import DashboardStyles from '../styles/DashboardStyles';

const SpeedHistory = () => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();
    const [speedRecords, setSpeedRecords] = useState([]);
    const { apiIp } = apiConnection;
    // Fetch speed records when the component mounts
    useEffect(() => {
        const fetchSpeedRecords = async () => {
            try {
                const response = await fetch(`${apiIp}/fetch_speed.php`, { // Replace with your API URL
                    method: 'GET',
                    credentials: 'include', // Include cookies for session management
                });
                // const data = await response.json();
                const textResponse = await response.text(); // Get the response as text

                // If you want to parse it to JSON later, you can uncomment the next line
                // const data = JSON.parse(textResponse);

                const data = JSON.parse(textResponse); // Assuming the response is valid JSON
                if (data.status === 'Success' && Array.isArray(data.data)) {

                    const filteredRecords = data.data.filter(record => record.speedMPH !== "0");
                    console.log('Speed MPH Values:', filteredRecords);
                    setSpeedRecords(filteredRecords);
                } else {
                    console.error(data.msg);
                }
            } catch (error) {
                console.error('Error fetching speed records:', error);
            }
        };

        fetchSpeedRecords();
    }, []);

    const wicketIcon= require('../assets/icons/ball.png');

    return (
        <ScrollView style={[SpeedHistoryStyle.container, { backgroundColor: colors.background }]}>
            <View style={SpeedHistoryStyle.header}>
                <View style={SpeedHistoryStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[SpeedHistoryStyle.title, { color: colors.text }]}>Speed History</Text>
                <Image source={require('../assets/icons/user.png')} style={SpeedHistoryStyle.icon} />
                <Icon name="search" size={23} color="#f79e1b" style={SpeedHistoryStyle.iconSearch} />
            </View>

            <View style={SpeedHistoryStyle.middleText}>
                <Text style={[SpeedHistoryStyle.welTxt, { color: colors.text }]}>See Your Speed</Text>
            </View>

            {speedRecords.length > 0 ? (
                speedRecords.map((record, index) => (
                    <View key={index} style={SpeedHistoryStyle.cardContainer}>
                        <LinearGradient
                            colors={['#EB3F40', '#EC0820']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={SpeedHistoryStyle.card}
                        >
                            <Text style={SpeedHistoryStyle.speedText}>Speed: {record.speedKPH} km/h</Text>
                            <Text style={SpeedHistoryStyle.speedText}>Speed: {record.speedMPH} mph</Text>
                            <View style={[SpeedHistoryStyle.wicketIcon]}>
                                <Image source={wicketIcon} style={SpeedHistoryStyle.cardIcon}></Image>
                            </View>
                        </LinearGradient>
                    </View>
                ))
            ) : (
                <Text style={[SpeedHistoryStyle.welTxt, { color: colors.text }]}>No speed records found.</Text>
            )}
        </ScrollView>
    );
};

export default SpeedHistory;
