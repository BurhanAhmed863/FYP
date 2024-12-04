import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import PointsTableStyles from '../styles/PointsTableStyles';
import TournamentDetailStyles from '../styles/TournamentDetailStyles';
import Icon from 'react-native-vector-icons/Feather'; // Import FontAwesome icons

const PointsTable = () => {
    const { colors } = useTheme();

    // Example data for points tables of multiple groups
    const groupData = [
        {
            groupName: 'Group A',
            tableData: [
                { team: 'Team A', played: 5, won: 4, lost: 1, points: 8, nrr: '+1.23' },
                { team: 'Team B', played: 5, won: 3, lost: 2, points: 6, nrr: '+0.89' },
                { team: 'Team C', played: 5, won: 2, lost: 3, points: 4, nrr: '-0.45' },
                { team: 'Team D', played: 5, won: 1, lost: 4, points: 2, nrr: '-1.12' },
            ],
        },
        {
            groupName: 'Group B',
            tableData: [
                { team: 'Team E', played: 5, won: 5, lost: 0, points: 10, nrr: '+2.00' },
                { team: 'Team F', played: 5, won: 3, lost: 2, points: 6, nrr: '+0.75' },
                { team: 'Team G', played: 5, won: 2, lost: 3, points: 4, nrr: '-0.25' },
                { team: 'Team H', played: 5, won: 0, lost: 5, points: 0, nrr: '-1.75' },
            ],
        },
    ];

    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');
    const AvsB = require('../assets/icons/AvB.png');

    return (
        <ScrollView
            style={[PointsTableStyles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <View style={TournamentDetailStyles.header}>
                <Text style={[TournamentDetailStyles.title, { color: colors.text }]}>Dashboard</Text>
                <Image source={userIcon} style={TournamentDetailStyles.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={TournamentDetailStyles.iconSearch} />
            </View>
            <View style={TournamentDetailStyles.middleText}>
                <Text style={[TournamentDetailStyles.welTxt, { color: colors.text }]}>Name of Tournament</Text>
            </View>
            <View style={TournamentDetailStyles.cardContainer}>
                <LinearGradient
                    colors={['#000000', '#434343']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={TournamentDetailStyles.cardTop}
                >
                    <View style={[TournamentDetailStyles.AvsBIcon]}>
                        <Image source={AvsB} style={TournamentDetailStyles.cardIconTop}></Image>
                    </View>
                </LinearGradient>
            </View>

            {groupData.map((group, groupIndex) => (
                <View key={groupIndex} style={{ marginBottom: 20 }}>
                    <Text style={[PointsTableStyles.header, { color: colors.text, marginTop: 20 }]}>
                        {group.groupName}
                    </Text>

                    <View style={PointsTableStyles.tableHeader}>
                        <Text style={PointsTableStyles.headerCell}>Team</Text>
                        <Text style={PointsTableStyles.headerCell}>P</Text>
                        <Text style={PointsTableStyles.headerCell}>W</Text>
                        <Text style={PointsTableStyles.headerCell}>L</Text>
                        <Text style={PointsTableStyles.headerCell}>Pts</Text>
                        <Text style={PointsTableStyles.headerCell}>NRR</Text>
                    </View>

                    {group.tableData.map((row, index) => (
                        <LinearGradient
                            key={index}
                            colors={index % 2 === 0 ? ['#FEC570', '#F7A01F'] : ['#EB3F40', '#EC0820']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={PointsTableStyles.row}
                        >
                            <Text style={PointsTableStyles.cell}>{row.team}</Text>
                            <Text style={PointsTableStyles.cell}>{row.played}</Text>
                            <Text style={PointsTableStyles.cell}>{row.won}</Text>
                            <Text style={PointsTableStyles.cell}>{row.lost}</Text>
                            <Text style={PointsTableStyles.cell}>{row.points}</Text>
                            <Text style={PointsTableStyles.cell}>{row.nrr}</Text>
                        </LinearGradient>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

export default PointsTable;
