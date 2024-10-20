// src/screens/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation, useRoute } from '@react-navigation/native';
import ScoreboardStyle from '../styles/ScoreboardStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const Scoreboard = () => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();
    const [overs, setOvers] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(null); // Track selected team for batting first
    const route = useRoute(); // Use the route prop
    // const [players, setplayers] = useState(Array(2).fill('')); // Initialize 11 empty player names

    const players = [
        { name: 'Mateen', runs: 36, balls: 6, fours: 0, sixes: 6 },
        { name: 'Hamza', runs: 0, balls: 0, fours: 0, sixes: 0 },
        // Add more players as needed
    ];

    const bowlers = [
        { name: 'Adil', overs: 1, maiden: 0, runs: 36, wicket: 0, extras: 0 },
        // Add more players as needed
    ];

    // const { teamName1, teamName2, players } = route.params; // Destructure team names and players

    // const isButtonDisabled = !selectedTeam;
    // // Now you can use teamName1, teamName2, and players in your component
    // console.log('Team 1:', teamName1);
    // console.log('Team 2:', teamName2);
    // console.log('Players:', players);

    // Determine the profile and lock icon based on the theme
    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    return (
        <ScrollView style={[ScoreboardStyle.container, { backgroundColor: colors.background }]}>
            <View style={ScoreboardStyle.header}>
                <View style={ScoreboardStyle.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                        <AntDesign name="caretleft" size={25} color='#EB001B' />
                    </TouchableOpacity>
                </View>
                <Text style={[ScoreboardStyle.title, { color: colors.text }]}>Matches</Text>
                <Image source={userIcon} style={ScoreboardStyle.icon}></Image>
                <Icon name="search" size={23} color="#f79e1b" style={ScoreboardStyle.iconSearch} />
            </View>

            <View style={ScoreboardStyle.middleText}>
                <Text style={[ScoreboardStyle.welTxt, { color: colors.text }]}>Score Card</Text>
            </View>
            <View style={ScoreboardStyle.cardContainer}>
                <View style={ScoreboardStyle.card}>
                    <View style={[ScoreboardStyle.helmetIconContainer, { backgroundColor: 'orange' }]}>
                        <Image
                            source={require('../assets/icons/helmet.png')}
                            style={ScoreboardStyle.helmetIcon}
                            resizeMode="contain" // Ensure the image fits within the container
                        />
                    </View>
                    <Text style={[ScoreboardStyle.teamText, { color: 'black' }]}>Mateen X1</Text>
                    <Text style={ScoreboardStyle.scoreText}>0/36</Text>
                </View>
            </View>

            <View style={ScoreboardStyle.cardContainer}>
                <View style={ScoreboardStyle.card}>
                    <View style={ScoreboardStyle.helmetIconContainer}>
                        <Image
                            source={require('../assets/icons/helmet.png')}
                            style={ScoreboardStyle.helmetIcon}
                            resizeMode="contain" // Ensure the image fits within the container
                        />
                    </View>
                    <Text style={[ScoreboardStyle.teamText, { color: 'black' }]}>Adil XI</Text>
                    <Text style={ScoreboardStyle.scoreText}>0/0</Text>
                </View>
            </View>

            <View style={ScoreboardStyle.centeredContent}>
                <View style={ScoreboardStyle.RRtextContainer}>
                    <View style={ScoreboardStyle.crrContainer}>
                        <Text style={[ScoreboardStyle.crrText, { color: "black" }]}>Current Run rate:</Text>
                        <Text style={ScoreboardStyle.crrNumber}>36.00</Text>
                    </View>

                    <View style={ScoreboardStyle.crrContainer}>
                        <Text style={[ScoreboardStyle.crrText, { color: "black" }]}>Projected Score:</Text>
                        <Text style={ScoreboardStyle.crrNumber}>100</Text>
                    </View>
                </View>

                <View style={ScoreboardStyle.line}></View>

                <View style={ScoreboardStyle.batterText}>
                    <Text style={[ScoreboardStyle.batTxtH, { color: colors.text, flex: 1, textAlign: 'left' }]}>Batters</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={ScoreboardStyle.runsH}>R</Text>
                        <Text style={ScoreboardStyle.runsH}>B</Text>
                        <Text style={ScoreboardStyle.runsH}>4s</Text>
                        <Text style={ScoreboardStyle.runsH}>6s</Text>
                    </View>
                </View>

                {players.map((player, index) => (
                    <View style={ScoreboardStyle.batterText} key={index}>
                        <View style={ScoreboardStyle.plyCon}>
                            <Text style={[ScoreboardStyle.batTxt, { color: colors.text, flex: 1, textAlign: 'left' }]}>{player.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 3 }}>
                            <Text style={ScoreboardStyle.runs}>{player.runs}</Text>
                            <Text style={ScoreboardStyle.runs}>{player.balls}</Text>
                            <Text style={ScoreboardStyle.runs}>{player.fours}</Text>
                            <Text style={ScoreboardStyle.runs}>{player.sixes}</Text>
                        </View>
                    </View>
                ))}


                <View style={ScoreboardStyle.batterText}>
                    <Text style={[ScoreboardStyle.batTxtH, { color: colors.text, flex: 1, textAlign: 'left' }]}>Bowlers</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={ScoreboardStyle.runsH}>O</Text>
                        <Text style={ScoreboardStyle.runsH}>M</Text>
                        <Text style={ScoreboardStyle.runsH}>R</Text>
                        <Text style={ScoreboardStyle.runsH}>W</Text>
                        <Text style={ScoreboardStyle.runsH}>E</Text>
                    </View>
                </View>

                {bowlers.map((bowler, index) => (
                    <View style={ScoreboardStyle.batterText} key={index}>
                        <View style={ScoreboardStyle.bowlCon}>
                            <Text style={[ScoreboardStyle.batTxt, { color: 'white', flex: 1, textAlign: 'left' }]}>{bowler.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 3 }}>
                            <Text style={ScoreboardStyle.runs}>{bowler.overs}</Text>
                            <Text style={ScoreboardStyle.runs}>{bowler.maiden}</Text>
                            <Text style={ScoreboardStyle.runs}>{bowler.runs}</Text>
                            <Text style={ScoreboardStyle.runs}>{bowler.wicket}</Text>
                            <Text style={ScoreboardStyle.runs}>{bowler.extras}</Text>
                        </View>
                    </View>
                ))}
                <View style={ScoreboardStyle.backgroundContainer}>
                <View style={ScoreboardStyle.overCardContainer}>
                    <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                        <Entypo name="dot-single" size={25} color='black' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={ScoreboardStyle.overText}>1</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={ScoreboardStyle.overText}>2</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={ScoreboardStyle.overText}>3</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: 'grey'}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                        <MaterialCommunityIcons name="rotate-3d-variant" size={25} color='black' />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={ScoreboardStyle.overCardContainer}>
                    <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={ScoreboardStyle.overText}>4</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={ScoreboardStyle.overText}>5+</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={ScoreboardStyle.overText}>6</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: '#D3D3D3', borderColor: 'red', borderWidth: 1}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={[ScoreboardStyle.overText]}>ENDOVER</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: '#D3D3D3', borderColor: 'red', borderWidth: 1}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={ScoreboardStyle.overText}>DLS</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={ScoreboardStyle.overCardContainer}>
                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: 'black'}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={[ScoreboardStyle.overText,{color:'white'}]}>WIDE</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: 'black'}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={[ScoreboardStyle.overText,{color:'white'}]}>NOBALL</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: 'black'}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={[ScoreboardStyle.overText,{color:'white'}]}>BYES</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: 'black'}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={[ScoreboardStyle.overText,{color:'white'}]}>LEGBYES</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[ScoreboardStyle.oversCard,{backgroundColor: 'red'}]} onPress={() => (navigation.navigate('EnterTeam'))}>
                        <View style={[ScoreboardStyle.addIconContainer]}>
                            <Text style={[ScoreboardStyle.overText,{color:'white'}]}>WICKET</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>

                <TouchableOpacity
                    style={[ScoreboardStyle.button]}
                >
                    <Text style={[ScoreboardStyle.buttonText, { color: 'white' }]}>
                        End Match
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default Scoreboard;
