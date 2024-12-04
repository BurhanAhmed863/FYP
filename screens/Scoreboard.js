// src/screens/Login.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Modal, Alert, Button } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Assuming you have the theme context set up
import { useNavigation, useRoute } from '@react-navigation/native';
import ScoreboardStyle from '../styles/ScoreboardStyle';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import apiConnection from './apiConnection';

const Scoreboard = ({ route }) => {
    const { colors } = useTheme(); // Get colors from theme context
    const navigation = useNavigation();
    const { matchId } = route.params;
    const [innings, setInnings] = useState(1);
    const [totalRunsFirstInnings, setTotalRunsFirstInnings] = useState(0);
    const [totalRunsSecondInnings, setTotalRunsSecondInnings] = useState(0);
    const [currentOverAndBallForFirstInnings, setCurrentOverAndBallForFirstInnings] = useState(0);
    const [currentOverAndBallForSecondInnings, setCurrentOverAndBallForSecondInnings] = useState(0);
    const [prevBatsman, setPrevBatsman] = useState(null); // Store the recently out batsman
    const [totalOvers, setTotalOvers] = useState('');
    const [totalWicketsInFirstInnings, setTotalWicketsInFirstInnings] = useState(0);
    const [totalWicketsInSecondInnings, setTotalWicketsInSecondInnings] = useState(0);
    const [modalVisible, setModalVisible] = useState(true); // Modal is initially shown
    const [selectedBatsman1, setSelectedBatsman1] = useState(null);
    const [selectedBatsman2, setSelectedBatsman2] = useState(null);
    const [players, setPlayers] = useState([]);
    const [bowlers, setBowlers] = useState([]);
    const [selectedBowler, setSelectedBowler] = useState(null);
    const [isSelectionComplete, setIsSelectionComplete] = useState(false);
    const [selectedBatsman, setSelectedBatsman] = useState(null); // Track the selected batsman
    const [isNoBallModalVisible, setIsNoBallModalVisible] = useState(false);
    const [selectedNoBallRuns, setSelectedNoBallRuns] = useState(0); // Selected runs on no-ball
    const [isWideModalVisible, setIsWideModalVisible] = useState(false);
    const [isExtrasModalVisible, setIsExtrasModalVisible] = useState(false);
    const [isByesLegByesModalVisible, setIsByesLegByesModalVisible] = useState(false);
    const [selectedByesLegByes, setSelectedByesLegByes] = useState(0); // Selected runs on no-ball
    const [selectedWideRuns, setSelectedWideRuns] = useState(0); // Selected runs on no-ball
    const [selectedExtraType, setSelectedExtraType] = useState(null); // "Byes", "Legbyes", or "None"
    const [battingTeamName, setBattingTeamName] = useState('');
    const [bowlingTeamName, setBowlingTeamName] = useState('');
    const [isOverComplete, setIsOverComplete] = useState(false);
    const [currentOver, setCurrentOver] = useState(0);
    const [currentOver2ndInnings, setCurrentOver2ndInnings] = useState(0);
    const [previousBowler, setPreviousBowler] = useState(null);
    const [isWicketModalVisible, setIsWicketModalVisible] = useState(false);
    const [batsmanOut, setBatsmanOut] = useState([]); // Batsman who got out
    const [newBatsman, setNewBatsman] = useState(null); // New batsman to replace the one out
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false); // To control confirmation modal
    const [wicketType, setWicketType] = useState(null); // To control confirmation modal
    const [overDetail, setOverDetail] = useState([]); // e.g. [0.1, 0.2, 0.3, ...]
    const [overNumber, setOverNumber] = useState(); // e.g. [0.1, 0.2, 0.3, ...]
    const [runsInOver, setRunsInOver] = useState([]); // e.g. [1, 2, 6, 4, ...]
    const [countRunsInOver, setCountRunsInOver] = useState(); // e.g. [1, 2, 6, 4, ...]
    const [bowlingTeamId, setBowlingTeamId] = useState(null); // e.g. [1, 2, 6, 4, ...]
    const [battingTeamId, setBattingTeamId] = useState(null); // e.g. [1, 2, 6, 4, ...]
    const [dismissedBatsmen1, setDismissedBatsmen1] = useState(0); // e.g. [1, 2, 6, 4, ...]
    const [dismissedBatsmen2, setDismissedBatsmen2] = useState(0); // e.g. [1, 2, 6, 4, ...]
    const dismissedBatsmen1Ref = useRef(0);  // Ref for dismissed batsman 1
    const dismissedBatsmen2Ref = useRef(0);  // Ref for dismissed batsman 2
    const dismissedBatsmenIds = useRef([]);
    const [isBowlerStateUpdated, setIsBowlerStateUpdated] = useState(false);

    useEffect(() => {
        if (isBowlerStateUpdated) {
            handleOverComplete(); // Run only after the state is updated
            setIsBowlerStateUpdated(false); // Reset the flag
        }
    }, [isBowlerStateUpdated]); // Dependency array ensures this runs only when the flag changes

    // console.log('Selected Batsmen 1', selectedBatsman1)
    // console.log('Selected Batsmen 2', selectedBatsman2)
    useEffect(() => {
        totalRunsFirstInnings, totalWicketsInFirstInnings
    }, [totalRunsFirstInnings, totalWicketsInFirstInnings])

    useEffect(() => {
        totalRunsFirstInnings
    }, [totalRunsFirstInnings])
    const handleOverComplete = async () => {
        try {
            // Prepare the data to send to the API
            const requestData = {
                match_id: matchId,
                innings: innings,
            };

            // Call the API to get the match summary data
            const response = await fetch(`${apiConnection.apiIp}/inningsScoreboardData.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            // Read the raw response text for logging
            const resultText = await response.text();
            // console.log("Raw response:", resultText); // Check the raw response

            // Parse the response as JSON (only once)
            const data = JSON.parse(resultText);

            if (response.ok) {
                // Success - print the full response
                console.log('API Response:', data); // Print the data to the console

                // Extract the match data from the response
                const matchData = data.data;

                // Process the batting data: Keep only highest runs for each batsman
                const processBattingData = (matchData) => {
                    const batsmanMap = {};
                    matchData.forEach(item => {
                        if (!batsmanMap[item.batsman_name]) {
                            batsmanMap[item.batsman_name] = item;
                        } else {
                            if (item.runs_scored > batsmanMap[item.batsman_name].runs_scored) {
                                batsmanMap[item.batsman_name] = item;
                            }
                        }
                    });
                    return Object.values(batsmanMap);
                };

                // Process the bowling data: Keep only one entry per bowler
                const processBowlingData = (matchData) => {
                    const bowlerMap = {};
                    matchData.forEach(item => {
                        if (!bowlerMap[item.bowler_name]) {
                            bowlerMap[item.bowler_name] = item;
                        }
                    });
                    return Object.values(bowlerMap);
                };

                const battingSummary = processBattingData(matchData);
                const bowlingSummary = processBowlingData(matchData);

                // Construct the summary data object for innings 1 or 2
                if (innings == 1) {
                    const summaryData = {
                        battingSummary: battingSummary,  // Processed batting data
                        bowlingSummary: bowlingSummary,  // Processed bowling data
                        totalScore: {
                            runs: totalRunsFirstInnings,
                            wickets: totalWicketsInFirstInnings
                        },
                        totalOvers: totalOvers,
                        currentOver: currentOver,  // Increase current over by 1
                        setInnings: setInnings,
                        innings: innings,
                        matchId: matchId
                    };
                    console.log('EveryOverInningsSummary (Innings 1)', summaryData);
                    navigation.navigate('EveryOverInningsSummary', summaryData);
                    setPreviousBowler(null);
                    setSelectedBowler(null);
                    setPrevBatsman(null);
                }

                if (innings == 2) {
                    const summaryData = {
                        battingSummary: battingSummary,  // Processed batting data
                        bowlingSummary: bowlingSummary,  // Processed bowling data
                        totalScore: {
                            runs: totalRunsSecondInnings, // Use second innings data
                            wickets: totalWicketsInSecondInnings
                        },
                        totalOvers: totalOvers,
                        innings: innings,
                        currentOver: currentOverAndBallForSecondInnings,  // Keep the same current over value
                    };
                    console.log('EveryOverInningsSummary (Innings 2)', summaryData);
                    navigation.navigate('EveryOverInningsSummary', summaryData);
                }

            } else {
                // Handle error (e.g., display an alert)
                console.error('Error fetching match data:', data.message);
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error in API call:', error);
        }
    };


    const sendBatsmenDataToBackend = async (overNumber) => {
        const batsmenData = [
            {
                batsman_name: selectedBatsman1.name,
                runs_scored: Array.isArray(selectedBatsman1.ballRuns) ? selectedBatsman1.ballRuns.reduce((sum, ballRun) => sum + ballRun, 0) : 0,
                balls_faced: selectedBatsman1.ballRuns.length,
                strike_rate: selectedBatsman1.strikeRate,
                fours: selectedBatsman1.fours,
                sixes: selectedBatsman1.sixes,
                ones: selectedBatsman1.ones,
                twos: selectedBatsman1.twos,
                threes: selectedBatsman1.threes,
                dots: selectedBatsman1.dots,
                ball_runs: selectedBatsman1.ballRuns, // Add ball-by-ball data
                over_number: overNumber,
                dismissed: dismissedBatsmen1Ref.current
            },
            {
                batsman_name: selectedBatsman2.name,
                runs_scored: Array.isArray(selectedBatsman2.ballRuns) ? selectedBatsman2.ballRuns.reduce((sum, ballRun) => sum + ballRun, 0) : 0,
                balls_faced: selectedBatsman2.ballRuns.length,
                strike_rate: selectedBatsman2.strikeRate,
                fours: selectedBatsman2.fours,
                sixes: selectedBatsman2.sixes,
                ones: selectedBatsman2.ones,
                twos: selectedBatsman2.twos,
                threes: selectedBatsman2.threes,
                dots: selectedBatsman2.dots,
                ball_runs: selectedBatsman2.ballRuns, // Add ball-by-ball data
                over_number: overNumber,
                dismissed: dismissedBatsmen2Ref.current
            },
        ];

        try {
            const response = await fetch(`${apiConnection.apiIp}/batsmenBallData.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    match_id: matchId,
                    team_id: battingTeamId,
                    batsmen: batsmenData,
                    innings: innings,
                }),
            });
            const resultText = await response.text();
            console.log('BATSMEN DATA:: ', batsmenData)
            // console.log("Raw response:", resultText);
            const result = JSON.parse(resultText);
            if (result.status === "success") {
                console.log("Batsmen data saved successfully");
            } else {
                console.error("Error saving batsmen data:", result.message);
            }
        } catch (error) {
            console.error("Network error while saving batsmen data:", error);
        }
    };

    const updateScore = (runs, isWicket = false, isExtra = false) => {
        if (innings == 1) {
            setTotalRunsFirstInnings((prevRuns) => prevRuns + runs);
        }
        try {
            // Step 1: Update batsman stats based on whether it's a wicket or normal runs
            if (isWicket) {
                if (selectedBatsman.name === selectedBatsman1.name) {
                    // Handle dismissal for batsman 1
                    setSelectedBatsman1((prevBatsman) => {
                        const updatedBatsman = { ...prevBatsman };
                        updatedBatsman.balls += 1; // Add a ball
                        updatedBatsman.ballRuns.push(0); // Add 0 for wicket
                        updatedBatsman.runs += runs; // Add the runs (even if it's 0 for wicket)
                        updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                        updatedBatsman.wicket_type = wicketType;
                        dismissedBatsmen1Ref.current = 1;
                        dismissedBatsmenIds.current.push(selectedBatsman1.id);
                        return updatedBatsman;
                    });
                    setSelectedBatsman(selectedBatsman1); // Update selected batsman
                } else if (selectedBatsman.name === selectedBatsman2.name) {
                    console.log('mayeeeeeeeeen')
                    // Handle dismissal for batsman 2
                    setSelectedBatsman2((prevBatsman) => {
                        const updatedBatsman = { ...prevBatsman };
                        updatedBatsman.balls += 1; // Add a ball
                        updatedBatsman.ballRuns.push(0); // Add 0 for wicket
                        updatedBatsman.runs += runs; // Add the runs (even if it's 0 for wicket)
                        updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                        updatedBatsman.wicket_type = wicketType;
                        dismissedBatsmen2Ref.current = 1;
                        dismissedBatsmenIds.current.push(selectedBatsman2.id);
                        return updatedBatsman;
                    });
                    setSelectedBatsman(selectedBatsman2); // Update selected batsman
                }
            } else {
                // Step 2: Update batsman stats when no wicket (normal runs)
                if (selectedBatsman.name) {
                    if (runs % 2 !== 0) {
                        // Switch batsman if odd runs
                        setSelectedBatsman(
                            selectedBatsman.name === selectedBatsman1.name
                                ? selectedBatsman2
                                : selectedBatsman1
                        );
                    }

                    if (selectedBatsman.name === selectedBatsman1.name) {
                        console.log('mayeeeeeeeeen222222222')
                        setSelectedBatsman1((prevBatsman) => {
                            const updatedBatsman = { ...prevBatsman };
                            updatedBatsman.runs += runs;
                            updatedBatsman.balls += 1;
                            updatedBatsman.ballRuns.push(runs); // Add the current ball's runs
                            updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                            // Update additional stats
                            if (runs === 6) updatedBatsman.sixes += 1;
                            if (runs === 4) updatedBatsman.fours += 1;
                            if (runs === 1) updatedBatsman.ones += 1;
                            if (runs === 2) updatedBatsman.twos += 1;
                            if (runs === 3) updatedBatsman.threes += 1;
                            if (runs === 0) updatedBatsman.dots += 1;
                            return updatedBatsman;
                        });
                        if (innings == 1) {
                            updateBowlerStats(runs, isWicket, isExtra);
                        }
                        if (innings == 2) {
                            updateBowlerStatsForSeconInnings(runs, isWicket, isExtra);

                        }
                    } else if (selectedBatsman.name === selectedBatsman2.name) {
                        setSelectedBatsman2((prevBatsman) => {
                            const updatedBatsman = { ...prevBatsman };
                            updatedBatsman.runs += runs;
                            updatedBatsman.balls += 1;
                            updatedBatsman.ballRuns.push(runs); // Add the current ball's runs
                            updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                            // Update additional stats
                            if (runs === 6) updatedBatsman.sixes += 1;
                            if (runs === 4) updatedBatsman.fours += 1;
                            if (runs === 1) updatedBatsman.ones += 1;
                            if (runs === 2) updatedBatsman.twos += 1;
                            if (runs === 3) updatedBatsman.threes += 1;
                            if (runs === 0) updatedBatsman.dots += 1;
                            return updatedBatsman;
                        });
                        if (innings == 1) {
                            updateBowlerStats(runs, isWicket, isExtra);
                        }
                        if (innings == 2) {
                            updateBowlerStatsForSeconInnings(runs, isWicket, isExtra);
                        }
                    }
                }
            }

            // Step 3: Update bowler stats (after batsman stats are updated)

            // Step 4: After batsman stats and bowler stats are updated, send data to the backend
            // sendBatsmenDataToBackend();
        } catch (error) {
            Alert.alert("Error updating score: " + error.message);
        }
    };
    const updateScoreSecondInnings = (runs, isWicket = false, isExtra = false) => {
        if (innings == 2) {
            setTotalRunsSecondInnings((prevRuns) => prevRuns + runs);
        }
        try {
            // Step 1: Update batsman stats based on whether it's a wicket or normal runs
            if (isWicket) {
                if (selectedBatsman.name === selectedBatsman1.name) {
                    // Handle dismissal for batsman 1
                    setSelectedBatsman1((prevBatsman2ndInnings) => {
                        if (innings == 2 && (!prevBatsman2ndInnings || !prevBatsman2ndInnings.hasReset)) {
                            return {
                                hasReset: true,
                            }
                        }
                        const updatedBatsman = { ...prevBatsman2ndInnings };
                        updatedBatsman.balls += 1; // Add a ball
                        updatedBatsman.ballRuns.push(0); // Add 0 for wicket
                        updatedBatsman.runs += runs; // Add the runs (even if it's 0 for wicket)
                        updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                        updatedBatsman.wicket_type = wicketType;
                        dismissedBatsmen1Ref.current = 1;
                        dismissedBatsmenIds.current.push(selectedBatsman1.id);
                        return updatedBatsman;
                    });
                    setSelectedBatsman(selectedBatsman1); // Update selected batsman
                } else if (selectedBatsman.name === selectedBatsman2.name) {
                    console.log('mayeeeeeeeeen')
                    // Handle dismissal for batsman 2
                    setSelectedBatsman2((prevBatsman2ndInnings) => {
                        const updatedBatsman = { ...prevBatsman2ndInnings };
                        updatedBatsman.balls += 1; // Add a ball
                        updatedBatsman.ballRuns.push(0); // Add 0 for wicket
                        updatedBatsman.runs += runs; // Add the runs (even if it's 0 for wicket)
                        updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                        updatedBatsman.wicket_type = wicketType;
                        dismissedBatsmen2Ref.current = 1;
                        dismissedBatsmenIds.current.push(selectedBatsman2.id);
                        return updatedBatsman;
                    });
                    setSelectedBatsman(selectedBatsman2); // Update selected batsman
                }
            } else {
                // Step 2: Update batsman stats when no wicket (normal runs)
                if (selectedBatsman.name) {
                    if (runs % 2 !== 0) {
                        // Switch batsman if odd runs
                        setSelectedBatsman(
                            selectedBatsman.name === selectedBatsman1.name
                                ? selectedBatsman2
                                : selectedBatsman1
                        );
                    }

                    if (selectedBatsman.name === selectedBatsman1.name) {
                        console.log('mayeeeeeeeeen222222222')
                        setSelectedBatsman1((prevBatsman2ndInnings) => {
                            const updatedBatsman = { ...prevBatsman2ndInnings };
                            updatedBatsman.runs += runs;
                            updatedBatsman.balls += 1;
                            updatedBatsman.ballRuns.push(runs); // Add the current ball's runs
                            updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                            // Update additional stats
                            if (runs === 6) updatedBatsman.sixes += 1;
                            if (runs === 4) updatedBatsman.fours += 1;
                            if (runs === 1) updatedBatsman.ones += 1;
                            if (runs === 2) updatedBatsman.twos += 1;
                            if (runs === 3) updatedBatsman.threes += 1;
                            if (runs === 0) updatedBatsman.dots += 1;
                            return updatedBatsman;
                        });
                        if (innings == 1) {
                            updateBowlerStats(runs, isWicket, isExtra);
                        }
                        if (innings == 2) {
                            updateBowlerStatsForSeconInnings(runs, isWicket, isExtra);
                        }
                    } else if (selectedBatsman.name === selectedBatsman2.name) {
                        setSelectedBatsman2((prevBatsman2ndInnings) => {
                            const updatedBatsman = { ...prevBatsman2ndInnings };
                            updatedBatsman.runs += runs;
                            updatedBatsman.balls += 1;
                            updatedBatsman.ballRuns.push(runs); // Add the current ball's runs
                            updatedBatsman.strikeRate = (updatedBatsman.runs / updatedBatsman.balls) * 100;
                            // Update additional stats
                            if (runs === 6) updatedBatsman.sixes += 1;
                            if (runs === 4) updatedBatsman.fours += 1;
                            if (runs === 1) updatedBatsman.ones += 1;
                            if (runs === 2) updatedBatsman.twos += 1;
                            if (runs === 3) updatedBatsman.threes += 1;
                            if (runs === 0) updatedBatsman.dots += 1;
                            return updatedBatsman;
                        });
                        if (innings == 1) {
                            updateBowlerStats(runs, isWicket, isExtra);
                        }
                        if (innings == 2) {
                            updateBowlerStatsForSeconInnings(runs, isWicket, isExtra);
                        }
                    }
                }
            }

            // Step 3: Update bowler stats (after batsman stats are updated)

            // Step 4: After batsman stats and bowler stats are updated, send data to the backend
            // sendBatsmenDataToBackend();
        } catch (error) {
            Alert.alert("Error updating score: " + error.message);
        }
    };

    const updateBowlerStats = (runs, isWicket = false, isExtra = false, isExtraType = null, extraRuns = null) => {
        setSelectedBowler((prevBowler) => {
            if (innings === 1) {
                console.log('test', selectedBowler)
                // Ensure balls are initialized to 0 if undefined
                let currentBalls = prevBowler.balls ?? 0;
                let ballsInOver = prevBowler.ballsInOver ?? []; // Array to store balls
                let runsInOver = prevBowler.runsInOver ?? []; // Array to store runs for each ball
                let legalBallsInOver = prevBowler.legalBallsInOver ?? 0; // Track only legal balls
                let wicket = prevBowler.wicket ?? 0;

                if (isExtraType === 'LegByes' || isExtra === 'Byes') {
                    let newBalls = isExtra ? currentBalls + 1 : currentBalls;
                    let newOvers = Math.floor(newBalls / 6) + currentOver;
                    const isOverComplete = newBalls === 6;
                    let ballsInCurrentOver = newBalls % 6;

                    // Handling extra types like Wide or NoBall
                    if (isExtra || isWicket) {
                        if (legalBallsInOver <= 4) {
                            if (innings == 1) {
                                // console.log('Extra Type', isExtraType)
                                // console.log('Over No', currentOver)
                                ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                runsInOver.push(runs); // Store the runs for the legal ball
                                legalBallsInOver++; // Increment only for legal balls
                                // console.log('ball No', legalBallsInOver)
                                setCurrentOverAndBallForFirstInnings(newOvers + '.' + legalBallsInOver);
                            }
                        }
                        if (legalBallsInOver === 5 || isWicket) {
                            if (innings == 1) {
                                ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                runsInOver.push(runs); // Store the runs for the legal ball
                                legalBallsInOver++; // Increment only for legal balls
                                // console.log('ball No', legalBallsInOver)
                                setCurrentOverAndBallForFirstInnings(newOvers + '.' + legalBallsInOver);
                                // console.log('ball by ball', (newOvers - 1) + '.' + (legalBallsInOver + 1))
                            }
                        }
                    }

                    if (isOverComplete || (isOverComplete && isWicket)) {
                        let runsInCurrentOver = prevBowler.runs + runs; // Update runs in the over
                        const totalBalls = ballsInOver.length;
                        handleOverCompletion(prevBowler);
                        const overNumber = newOvers + (ballsInCurrentOver / 10); // Over number in decimal form (e.g., 1.3)
                        // console.log('overNumber', overNumber)
                        // Switch batsman after over completion
                        setSelectedBatsman(
                            selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1
                        );

                        addOverDetails(ballsInOver, runsInCurrentOver, overNumber);
                        saveMatchDataToBackend(overNumber, ballsInOver, totalBalls, runsInOver);
                        newBalls = 0;
                        legalBallsInOver = 0; // Reset after over completion
                        // newOvers += 1;
                        setCurrentOver(newOvers);
                        // setCurrentOver(newOvers);
                    }

                    let oversInDecimal = newOvers + ballsInCurrentOver / 10;
                    oversInDecimal = Math.round(oversInDecimal * 10) / 10;

                    // Update bowler stats
                    const updatedBowler = {
                        ...prevBowler,
                        balls: newBalls,
                        overs: oversInDecimal,
                        runs: prevBowler.runs + runs, // Add runs to bowler's total only if valid runs
                        ballsInOver: ballsInOver, // Store balls in the over array
                        runsInOver: runsInOver, // Store runs for each ball
                        legalBallsInOver: legalBallsInOver, // Track the legal balls in the over
                    };

                    // Extras are recorded separately
                    if (isExtra) {
                        updatedBowler.extras += extraRuns;
                    }

                    // Update wickets if applicable
                    // if (isWicket) {
                    //     updatedBowler.wicket += 1;
                    // }

                    let economyRate = 0;
                    if (updatedBowler.overs > 0) {
                        economyRate = updatedBowler.runs / updatedBowler.overs;
                    }

                    updatedBowler.economy = economyRate; // Store the economy rate in the bowler stats
                    // console.log('ER', economyRate);

                    return updatedBowler;
                }
                if (innings == 1) {
                    if (isExtraType !== 'LegByes' || isExtra !== 'Byes' || isWicket) {
                        let newBalls = isExtra ? currentBalls : currentBalls + 1;
                        let newOvers = Math.floor(newBalls / 6) + currentOver;
                        const isOverComplete = newBalls === 6;
                        let ballsInCurrentOver = newBalls % 6;

                        // Handling extra types like Wide or NoBall
                        if (isExtra) {
                            if (isExtraType === 'Wide') {
                                if (innings == 1) {
                                    // For a wide ball, keep the same decimal for the ball number (e.g., 0.3, 1.3, etc.)
                                    ballsInOver.push(newOvers + '.' + (ballsInCurrentOver + 1)); // Example: 0.3
                                    runsInOver.push(extraRuns); // Store the runs for wide (e.g., +2 for wide)
                                    prevBowler.wides += 1;
                                    setCurrentOverAndBallForFirstInnings(newOvers + '.' + legalBallsInOver);
                                }
                            } else if (isExtraType === 'NoBall') {
                                if (innings == 1) {
                                    // For a no-ball, keep the same decimal for the ball number (e.g., 0.3, 1.3, etc.)
                                    ballsInOver.push(newOvers + '.' + (ballsInCurrentOver + 1)); // Example: 0.3
                                    runsInOver.push(extraRuns); // Store the runs for no-ball (e.g., +1 for no-ball)
                                    prevBowler.noball += 1;
                                    setCurrentOverAndBallForFirstInnings(newOvers + '.' + legalBallsInOver);
                                }
                            }
                        } else {
                            // Record the legal ball (increment legal balls)'
                            if (legalBallsInOver <= 4) {
                                if (isWicket) {
                                    if (selectedBatsman.name === selectedBatsman1.name) {
                                        dismissedBatsmen1Ref.current = 1;  // Mark batsman 1 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman1.id);
                                        setPrevBatsman(selectedBatsman1);
                                        // console.log(' batsman 1 id (immediate): ', selectedBatsman1.id);
                                        // console.log('dismissed batsman 1 (immediate): ', dismissedBatsmen1Ref.current);
                                    } else if (selectedBatsman.name === selectedBatsman2.name) {
                                        dismissedBatsmen2Ref.current = 1;  // Mark batsman 2 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman2.id);
                                        setPrevBatsman(selectedBatsman2);
                                        // console.log(' batsman 1 id (immediate): ', selectedBatsman2.id);
                                        // console.log('dismissed batsman 2 (immediate): ', dismissedBatsmen2Ref.current);
                                    }
                                    if (innings == 1) {
                                        // console.log('Over No', currentOver)
                                        ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                        // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                        runsInOver.push(runs); // Store the runs for the legal ball
                                        legalBallsInOver++; // Increment only for legal balls
                                        // console.log('ball No', legalBallsInOver)
                                        setCurrentOverAndBallForFirstInnings(newOvers + '.' + legalBallsInOver);
                                        sendBatsmenDataToBackend(overNumber);
                                        dismissedBatsmen1Ref.current = 0;  // Mark batsman 1 as dismissed
                                        dismissedBatsmen2Ref.current = 0;  // Mark batsman 1 as dismissed
                                    }
                                }
                                else {
                                    if (innings == 1) {
                                        // console.log('Over No', currentOver)
                                        ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                        // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                        runsInOver.push(runs); // Store the runs for the legal ball
                                        legalBallsInOver++; // Increment only for legal balls
                                        // console.log('ball No', legalBallsInOver)
                                        setCurrentOverAndBallForFirstInnings(newOvers + '.' + legalBallsInOver);
                                        wicket = wicket + 1;
                                        // console.log('WC', wicket)
                                    }
                                }
                            }
                            if (legalBallsInOver === 5) {
                                if (isWicket) {
                                    if (selectedBatsman.name === selectedBatsman1.name) {
                                        dismissedBatsmen1Ref.current = 1;  // Mark batsman 1 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman1.id);
                                        // console.log(' batsman 1 id (immediate): ', selectedBatsman1.id);
                                        // console.log('dismissed batsman 1 (immediate): ', dismissedBatsmen1Ref.current);
                                    } else if (selectedBatsman.name === selectedBatsman2.name) {
                                        dismissedBatsmen2Ref.current = 1;  // Mark batsman 2 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman2.id);
                                        // console.log(' batsman 2 id (immediate): ', selectedBatsman2.id);
                                        // console.log('dismissed batsman 2 (immediate): ', dismissedBatsmen2Ref.current);
                                    }
                                    if (innings == 1) {
                                        ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                        // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                        runsInOver.push(runs); // Store the runs for the legal ball
                                        legalBallsInOver++; // Increment only for legal balls
                                        // console.log('ball No', legalBallsInOver)
                                        setCurrentOverAndBallForFirstInnings(newOvers + 1);
                                        sendBatsmenDataToBackend(overNumber);
                                        dismissedBatsmen1Ref.current = 0;  // Mark batsman 1 as dismissed
                                        dismissedBatsmen2Ref.current = 0;  // Mark batsman 1 as dismissed
                                    }
                                }
                                if (innings == 1) {
                                    ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                    // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                    runsInOver.push(runs); // Store the runs for the legal ball
                                    legalBallsInOver++; // Increment only for legal balls
                                    // console.log('ball No', legalBallsInOver)
                                    setCurrentOverAndBallForFirstInnings(newOvers + 1);
                                    // console.log('ball by ball', (newOvers - 1) + '.' + (legalBallsInOver + 1))

                                }
                            }
                        }

                        if (isOverComplete || (isOverComplete && isWicket)) {
                            let runsInCurrentOver = prevBowler.runs + runs; // Update runs in the over
                            const totalBalls = ballsInOver.length;
                            handleOverCompletion(prevBowler);
                            const overNumber = newOvers + (ballsInCurrentOver / 10); // Over number in decimal form (e.g., 1.3)
                            // console.log('overNumber', overNumber)
                            // Switch batsman after over completion
                            setSelectedBatsman(
                                selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1
                            );

                            addOverDetails(ballsInOver, runsInCurrentOver, overNumber);
                            saveMatchDataToBackend(overNumber, ballsInOver, totalBalls, runsInOver);
                            sendBatsmenDataToBackend(overNumber);
                            newBalls = 0;
                            legalBallsInOver = 0; // Reset after over completion
                            // newOvers += 1;
                            setCurrentOver(newOvers);
                            // setCurrentOver(newOvers);
                        }

                        let oversInDecimal = newOvers + ballsInCurrentOver / 10;
                        oversInDecimal = Math.round(oversInDecimal * 10) / 10;

                        // Update bowler stats
                        const updatedBowler = {
                            ...prevBowler,
                            balls: newBalls,
                            overs: oversInDecimal,
                            runs: prevBowler.runs + runs, // Add runs to bowler's total only if valid runs
                            ballsInOver: ballsInOver, // Store balls in the over array
                            runsInOver: runsInOver, // Store runs for each ball
                            legalBallsInOver: legalBallsInOver, // Track the legal balls in the over
                        };

                        // Extras are recorded separately
                        if (isExtra) {
                            updatedBowler.extras += extraRuns;
                        }

                        // Update wickets if applicable
                        if (innings == 1) {
                            let wicket = totalWicketsInFirstInnings;
                            if (isWicket) {
                                updatedBowler.wicket += 1;
                                let wicketCount = wicket + 1;
                                setTotalWicketsInFirstInnings(wicketCount)
                            }
                        }

                        let economyRate = 0;
                        if (updatedBowler.overs > 0) {
                            economyRate = updatedBowler.runs / updatedBowler.overs;
                        }

                        updatedBowler.economy = economyRate; // Store the economy rate in the bowler stats
                        // console.log('ER', economyRate);

                        return updatedBowler;
                    }

                    // Increment balls count unless it's a wide or no-ball
                    let newBalls = isExtra ? currentBalls + 1 : currentBalls;
                    // console.log('Type of Extra', isExtra, isExtraType)

                    // Calculate overs based on new balls count
                    const isOverComplete = newBalls === 6;
                    let newOvers = Math.floor(newBalls / 6);
                    let ballsInCurrentOver = newBalls % 6;

                    if (isOverComplete) {
                        let ballInOver = [];
                        let runsPerBall = [];
                        handleOverCompletion(prevBowler);
                        const overNumber = newOvers + (ballsInCurrentOver / 10); // over number in decimal form (e.g., 1.3)
                        setSelectedBatsman(
                            selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1
                        );
                        const runsInCurrentOver = prevBowler.runs + runs; // Update runs in the over
                        // const ballInOver = `${newOvers}.${ballsInCurrentOver + 1}`;
                        for (let i = 1; i <= 6; i++) {
                            ballInOver.push(`${newOvers - 1}.${i}`);
                            runsPerBall.push(runs);
                            // console.log('ballInOver', ballInOver);
                            // console.log('runsPerBall', runsPerBall);
                        }
                        const totalBalls = ballInOver.length;
                        addOverDetails(ballInOver, runsInCurrentOver, overNumber);
                        saveMatchDataToBackend(overNumber, ballInOver, totalBalls, runsPerBall);
                        newBalls = 0;
                        newOvers += 1;
                    }

                    let oversInDecimal = newOvers + ballsInCurrentOver / 10;
                    oversInDecimal = Math.round(oversInDecimal * 10) / 10;

                    // Update bowler stats
                    const updatedBowler = {
                        ...prevBowler,
                        balls: newBalls,
                        overs: oversInDecimal,
                        runs: prevBowler.runs + runs, // Add runs to bowler's total only if valid runs
                    };

                    // Extras are recorded separately
                    if (isExtra) {
                        updatedBowler.extras += extraRuns;
                    }

                    // Update wickets if applicable
                    if (isWicket) {
                        updatedBowler.wicket += 1;
                    }

                    let economyRate = 0;
                    if (updatedBowler.overs > 0) {
                        economyRate = updatedBowler.runs / updatedBowler.overs;
                    }

                    updatedBowler.economy = economyRate; // Store the economy rate in the bowler stats

                    return updatedBowler;
                }
            }
        });
    };

    const resetBowlerStatsForSecondInnings = () => {
        setSelectedBowler({
            balls: 0,
            ballsInOver: [], // Reset the array to start fresh
            economy: 0,
            extras: 0,
            legalBallsInOver: 0,
            maiden: 0,
            noball: 0,
            overs: 0,
            runs: 0,
            runsInOver: [], // Reset the array for runs
            wicket: 0,     // Reset wicket count
            wides: 0,
            name: '', // Retain bowler's name
            hasReset: true,          // Flag to indicate the reset is done
        });
    };

    useEffect(() => {
        if (innings === 2) {
            resetBowlerStatsForSecondInnings();
        }
    }, [innings]);

    const updateBowlerStatsForSeconInnings = (runs, isWicket = false, isExtra = false, isExtraType = null, extraRuns = null) => {
        setSelectedBowler((prevBowler2ndInnings) => {
            if (innings === 2) {
                console.log('checkingggg', selectedBowler)
                // Ensure balls are initialized to 0 if undefined
                let currentBalls = prevBowler2ndInnings.balls ?? 0;
                let ballsInOver = prevBowler2ndInnings.ballsInOver ?? []; // Array to store balls
                let runsInOver = prevBowler2ndInnings.runsInOver ?? []; // Array to store runs for each ball
                let legalBallsInOver = prevBowler2ndInnings.legalBallsInOver ?? 0; // Track only legal balls
                let wicket = prevBowler2ndInnings.wicket ?? 0;

                if (isExtraType === 'LegByes' || isExtra === 'Byes') {
                    let newBalls = isExtra ? currentBalls + 1 : currentBalls;
                    let newOvers = Math.floor(newBalls / 6) + currentOver2ndInnings;
                    const isOverComplete = newBalls === 6;
                    let ballsInCurrentOver = newBalls % 6;

                    // Handling extra types like Wide or NoBall
                    if (isExtra || isWicket) {
                        if (legalBallsInOver <= 4) {
                            if (innings == 2) {

                                // console.log('Extra Type', isExtraType)
                                // console.log('Over No', currentOver)
                                ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                runsInOver.push(runs); // Store the runs for the legal ball
                                legalBallsInOver++; // Increment only for legal balls
                                // console.log('ball No', legalBallsInOver)
                                setCurrentOverAndBallForSecondInnings(newOvers + '.' + legalBallsInOver);
                            }
                        }
                        if (legalBallsInOver === 5 || isWicket) {
                            if (innings == 2) {

                                ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                runsInOver.push(runs); // Store the runs for the legal ball
                                legalBallsInOver++; // Increment only for legal balls
                                // console.log('ball No', legalBallsInOver)
                                setCurrentOverAndBallForSecondInnings(newOvers + '.' + legalBallsInOver);
                                // console.log('ball by ball', (newOvers - 1) + '.' + (legalBallsInOver + 1))
                            }
                        }
                    }

                    if (isOverComplete || (isOverComplete && isWicket)) {
                        let runsInCurrentOver = prevBowler2ndInnings.runs + runs; // Update runs in the over
                        const totalBalls = ballsInOver.length;
                        handleOverCompletion(prevBowler2ndInnings);
                        const overNumber = newOvers + (ballsInCurrentOver / 10); // Over number in decimal form (e.g., 1.3)
                        // console.log('overNumber', overNumber)
                        // Switch batsman after over completion
                        setSelectedBatsman(
                            selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1
                        );

                        addOverDetails(ballsInOver, runsInCurrentOver, overNumber);
                        saveMatchDataToBackend(overNumber, ballsInOver, totalBalls, runsInOver);
                        newBalls = 0;
                        legalBallsInOver = 0; // Reset after over completion
                        // newOvers += 1;
                        setCurrentOver2ndInnings(newOvers);
                        // setCurrentOver2ndInnings(newOvers);
                    }

                    let oversInDecimal = newOvers + ballsInCurrentOver / 10;
                    oversInDecimal = Math.round(oversInDecimal * 10) / 10;

                    // Update bowler stats
                    const updatedBowler = {
                        ...prevBowler2ndInnings,
                        balls: newBalls,
                        overs: oversInDecimal,
                        runs: prevBowler2ndInnings.runs + runs, // Add runs to bowler's total only if valid runs
                        ballsInOver: ballsInOver, // Store balls in the over array
                        runsInOver: runsInOver, // Store runs for each ball
                        legalBallsInOver: legalBallsInOver, // Track the legal balls in the over
                    };

                    // Extras are recorded separately
                    if (isExtra) {
                        updatedBowler.extras += extraRuns;
                    }

                    // Update wickets if applicable
                    // if (isWicket) {
                    //     updatedBowler.wicket += 1;
                    // }

                    let economyRate = 0;
                    if (updatedBowler.overs > 0) {
                        economyRate = updatedBowler.runs / updatedBowler.overs;
                    }

                    updatedBowler.economy = economyRate; // Store the economy rate in the bowler stats
                    // console.log('ER', economyRate);

                    return updatedBowler;
                }
        
                if (innings == 2) {
                    if (isExtraType !== 'LegByes' || isExtra !== 'Byes' || isWicket) {
                        let newBalls = isExtra ? currentBalls : currentBalls + 1;
                        let newOvers = Math.floor(newBalls / 6) + currentOver2ndInnings;
                        const isOverComplete = newBalls === 6;
                        let ballsInCurrentOver = newBalls % 6;

                        // Handling extra types like Wide or NoBall
                        if (isExtra) {
                            if (isExtraType === 'Wide') {
                                if (innings == 2) {

                                    // For a wide ball, keep the same decimal for the ball number (e.g., 0.3, 1.3, etc.)
                                    ballsInOver.push(newOvers + '.' + (ballsInCurrentOver + 1)); // Example: 0.3
                                    runsInOver.push(extraRuns); // Store the runs for wide (e.g., +2 for wide)
                                    prevBowler2ndInnings.wides += 1;
                                    setCurrentOverAndBallForSecondInnings(newOvers + '.' + legalBallsInOver);
                                }
                            } else if (isExtraType === 'NoBall') {
                               
                                if (innings == 2) {

                                    // For a no-ball, keep the same decimal for the ball number (e.g., 0.3, 1.3, etc.)
                                    ballsInOver.push(newOvers + '.' + (ballsInCurrentOver + 1)); // Example: 0.3
                                    runsInOver.push(extraRuns); // Store the runs for no-ball (e.g., +1 for no-ball)
                                    prevBowler2ndInnings.noball += 1;
                                    setCurrentOverAndBallForSecondInnings(newOvers + '.' + legalBallsInOver);
                                }
                            }
                        } else {
                            // Record the legal ball (increment legal balls)'
                            if (legalBallsInOver <= 4) {
                                if (isWicket) {
                                    if (selectedBatsman.name === selectedBatsman1.name) {
                                        dismissedBatsmen1Ref.current = 1;  // Mark batsman 1 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman1.id);
                                        setPrevBatsman(selectedBatsman1);
                                        // console.log(' batsman 1 id (immediate): ', selectedBatsman1.id);
                                        // console.log('dismissed batsman 1 (immediate): ', dismissedBatsmen1Ref.current);
                                    } else if (selectedBatsman.name === selectedBatsman2.name) {
                                        dismissedBatsmen2Ref.current = 1;  // Mark batsman 2 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman2.id);
                                        setPrevBatsman(selectedBatsman2);
                                        // console.log(' batsman 1 id (immediate): ', selectedBatsman2.id);
                                        // console.log('dismissed batsman 2 (immediate): ', dismissedBatsmen2Ref.current);
                                    }
                                  
                                    if (innings == 2) {
                                        // console.log('Over No', currentOver)
                                        ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                        // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                        runsInOver.push(runs); // Store the runs for the legal ball
                                        legalBallsInOver++; // Increment only for legal balls
                                        // console.log('ball No', legalBallsInOver)
                                        setCurrentOverAndBallForSecondInnings(newOvers + '.' + legalBallsInOver);
                                        sendBatsmenDataToBackend(overNumber);
                                        dismissedBatsmen1Ref.current = 0;  // Mark batsman 1 as dismissed
                                        dismissedBatsmen2Ref.current = 0;  // Mark batsman 1 as dismissed

                                    }

                                }
                                else {
                                    if (innings == 2) {

                                        // console.log('Over No', currentOver)
                                        ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                        // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                        runsInOver.push(runs); // Store the runs for the legal ball
                                        legalBallsInOver++; // Increment only for legal balls
                                        // console.log('ball No', legalBallsInOver)
                                        setCurrentOverAndBallForSecondInnings(newOvers + '.' + legalBallsInOver);
                                        wicket = wicket + 1;
                                        // console.log('WC', wicket)
                                    }
                                }
                            }
                            if (legalBallsInOver === 5) {
                                if (isWicket) {
                                    if (selectedBatsman.name === selectedBatsman1.name) {
                                        dismissedBatsmen1Ref.current = 1;  // Mark batsman 1 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman1.id);
                                        // console.log(' batsman 1 id (immediate): ', selectedBatsman1.id);
                                        // console.log('dismissed batsman 1 (immediate): ', dismissedBatsmen1Ref.current);
                                    } else if (selectedBatsman.name === selectedBatsman2.name) {
                                        dismissedBatsmen2Ref.current = 1;  // Mark batsman 2 as dismissed
                                        dismissedBatsmenIds.current.push(selectedBatsman2.id);
                                        // console.log(' batsman 2 id (immediate): ', selectedBatsman2.id);
                                        // console.log('dismissed batsman 2 (immediate): ', dismissedBatsmen2Ref.current);
                                    }
                                    if (innings == 2) {

                                        ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                        // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                        runsInOver.push(runs); // Store the runs for the legal ball
                                        legalBallsInOver++; // Increment only for legal balls
                                        // console.log('ball No', legalBallsInOver)
                                        setCurrentOverAndBallForSecondInnings(newOvers + 1);
                                        sendBatsmenDataToBackend(overNumber);
                                        dismissedBatsmen1Ref.current = 0;  // Mark batsman 1 as dismissed
                                        dismissedBatsmen2Ref.current = 0;  // Mark batsman 1 as dismissed
                                    }
                                }
                                if (innings == 2) {

                                    ballsInOver.push(newOvers + '.' + (legalBallsInOver + 1)); // Increment legal ball number (e.g., 0.1, 0.2, etc.)
                                    // console.log('ball by ball', newOvers + '.' + (legalBallsInOver + 1))
                                    runsInOver.push(runs); // Store the runs for the legal ball
                                    legalBallsInOver++; // Increment only for legal balls
                                    // console.log('ball No', legalBallsInOver)
                                    setCurrentOverAndBallForSecondInnings(newOvers + 1);
                                    // console.log('ball by ball', (newOvers - 1) + '.' + (legalBallsInOver + 1))
                                }
                            }
                        }
                        if (
                            (totalOvers <= currentOverAndBallForSecondInnings) ||
                            (totalRunsSecondInnings >= totalRunsFirstInnings)
                        ) {
                            const sendResultToAPI = async (resultMessage) => {
                                try {
                                    const dataToSend = {
                                        match_id: matchId,
                                        team_won_id: totalRunsSecondInnings > totalRunsFirstInnings ? battingTeamId : bowlingTeamId,
                                        team_loss_id: totalRunsSecondInnings < totalRunsFirstInnings ? battingTeamId : bowlingTeamId,
                                        result: resultMessage,
                                        total_runs_first_innings: totalRunsFirstInnings,
                                        total_wickets_first_innings: totalWicketsInFirstInnings,
                                        total_overs: totalOvers,
                                        total_runs_second_innings: totalRunsSecondInnings,
                                        total_wickets_second_innings: totalWicketsInSecondInnings,
                                        current_over_and_ball_second_innings: currentOverAndBallForSecondInnings,
                                        current_over_and_ball_first_innings: currentOverAndBallForFirstInnings,
                                    };

                                    console.log('Data to send to API:', JSON.stringify(dataToSend, null, 2));
                                    const response = await fetch(`${apiConnection.apiIp}/results.php`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(dataToSend),
                                    });
                                    console.log('DATA',)

                                    if (!response.ok) {
                                        throw new Error("Failed to send result to the server");
                                    }

                                    const data = await response.json();

                                    if (data.status === "success") {
                                        Alert.alert("Match Result", data.message || resultMessage);
                                    } else {
                                        Alert.alert("Error", data.message || "An error occurred while saving the result.");
                                    }
                                } catch (error) {
                                    console.error("API Error:", error);
                                    Alert.alert("Error", "Failed to save match result.");
                                }
                            };
                            if (totalRunsSecondInnings > totalRunsFirstInnings) {
                                let runsInCurrentOver = prevBowler2ndInnings.runs + runs; // Update runs in the over
                                const totalBalls = ballsInOver.length;
                                handleOverCompletion(prevBowler2ndInnings);
                                const overNumber = newOvers + (ballsInCurrentOver / 10); // Over number in decimal form (e.g., 1.3)
                                addOverDetails(ballsInOver, runsInCurrentOver, overNumber);
                                saveMatchDataToBackend(overNumber, ballsInOver, totalBalls, runsInOver);
                                sendBatsmenDataToBackend(overNumber);
                                newBalls = 0;
                                legalBallsInOver = 0; // Reset after over completion
                                // newOvers += 1;
                                setCurrentOver2ndInnings(newOvers);
                                let resultMessage = `${battingTeamName} Wins by ${10 - totalWicketsInSecondInnings} wicket!`;
                                sendResultToAPI(resultMessage);
                                Alert.alert("Congratulations", resultMessage);
                                navigation.navigate('Dashboard')
                            } else if ((totalRunsSecondInnings < totalRunsFirstInnings) && (totalOvers <= currentOversDecimal)) {
                                let runsInCurrentOver = prevBowler2ndInnings.runs + runs; // Update runs in the over
                                const totalBalls = ballsInOver.length;
                                handleOverCompletion(prevBowler2ndInnings);
                                const overNumber = newOvers + (ballsInCurrentOver / 10); // Over number in decimal form (e.g., 1.3)
                                addOverDetails(ballsInOver, runsInCurrentOver, overNumber);
                                saveMatchDataToBackend(overNumber, ballsInOver, totalBalls, runsInOver);
                                sendBatsmenDataToBackend(overNumber);
                                newBalls = 0;
                                legalBallsInOver = 0; // Reset after over completion
                                // newOvers += 1;
                                setCurrentOver2ndInnings(newOvers);
                                let resultMessage = `${bowlingTeamName} Wins by ${totalRunsSecondInnings - totalRunsFirstInnings} runs!`;
                                Alert.alert('Congratulations', bowlingTeamName + " Wins!");
                            } else if ((totalRunsSecondInnings === totalRunsFirstInnings) && (totalOvers === currentOverAndBallForSecondInnings)) {
                                let runsInCurrentOver = prevBowler2ndInnings.runs + runs; // Update runs in the over
                                const totalBalls = ballsInOver.length;
                                handleOverCompletion(prevBowler2ndInnings);
                                const overNumber = newOvers + (ballsInCurrentOver / 10); // Over number in decimal form (e.g., 1.3)
                                addOverDetails(ballsInOver, runsInCurrentOver, overNumber);
                                saveMatchDataToBackend(overNumber, ballsInOver, totalBalls, runsInOver);
                                sendBatsmenDataToBackend(overNumber);
                                newBalls = 0;
                                legalBallsInOver = 0; // Reset after over completion
                                // newOvers += 1;
                                setCurrentOver2ndInnings(newOvers);
                                let resultMessage = "It's a tie!";
                                sendResultToAPI(resultMessage);
                                Alert.alert("Match Tied", resultMessage);
                            }
                        }
                        if (isOverComplete || (isOverComplete && isWicket)) {
                            let runsInCurrentOver = prevBowler2ndInnings.runs + runs; // Update runs in the over
                            const totalBalls = ballsInOver.length;
                            handleOverCompletion(prevBowler2ndInnings);
                            const overNumber = newOvers + (ballsInCurrentOver / 10); // Over number in decimal form (e.g., 1.3)
                            // console.log('overNumber', overNumber)
                            // Switch batsman after over completion
                            setSelectedBatsman(
                                selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1
                            );

                            addOverDetails(ballsInOver, runsInCurrentOver, overNumber);
                            saveMatchDataToBackend(overNumber, ballsInOver, totalBalls, runsInOver);
                            sendBatsmenDataToBackend(overNumber);
                            newBalls = 0;
                            legalBallsInOver = 0; // Reset after over completion
                            // newOvers += 1;
                            setCurrentOver2ndInnings(newOvers);
                            // setCurrentOver2ndInnings(newOvers);
                        }

                        let oversInDecimal = newOvers + ballsInCurrentOver / 10;
                        oversInDecimal = Math.round(oversInDecimal * 10) / 10;

                        // Update bowler stats
                        const updatedBowler = {
                            ...prevBowler2ndInnings,
                            balls: newBalls,
                            overs: oversInDecimal,
                            runs: prevBowler2ndInnings.runs + runs, // Add runs to bowler's total only if valid runs
                            ballsInOver: ballsInOver, // Store balls in the over array
                            runsInOver: runsInOver, // Store runs for each ball
                            legalBallsInOver: legalBallsInOver, // Track the legal balls in the over
                        };

                        // Extras are recorded separately
                        if (isExtra) {
                            updatedBowler.extras += extraRuns;
                        }

                        // Update wickets if applicable
                        if (innings == 2) {
                            let wicket = totalWicketsInSecondInnings;
                            if (isWicket) {
                                updatedBowler.wicket += 1;
                                let wicketCount = wicket + 1;
                                setTotalWicketsInSecondInnings(wicketCount)
                            }
                        }

                        let economyRate = 0;
                        if (updatedBowler.overs > 0) {
                            economyRate = updatedBowler.runs / updatedBowler.overs;
                        }

                        updatedBowler.economy = economyRate; // Store the economy rate in the bowler stats
                        // console.log('ER', economyRate);

                        return updatedBowler;
                    }

                    // Increment balls count unless it's a wide or no-ball
                    let newBalls = isExtra ? currentBalls + 1 : currentBalls;
                    // console.log('Type of Extra', isExtra, isExtraType)

                    // Calculate overs based on new balls count
                    const isOverComplete = newBalls === 6;
                    let newOvers = Math.floor(newBalls / 6);
                    let ballsInCurrentOver = newBalls % 6;

                    if (isOverComplete) {
                        let ballInOver = [];
                        let runsPerBall = [];
                        handleOverCompletion(prevBowler2ndInnings);
                        const overNumber = newOvers + (ballsInCurrentOver / 10); // over number in decimal form (e.g., 1.3)
                        setSelectedBatsman(
                            selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1
                        );
                        const runsInCurrentOver = prevBowler2ndInnings.runs + runs; // Update runs in the over
                        // const ballInOver = `${newOvers}.${ballsInCurrentOver + 1}`;
                        for (let i = 1; i <= 6; i++) {
                            ballInOver.push(`${newOvers - 1}.${i}`);
                            runsPerBall.push(runs);
                            // console.log('ballInOver', ballInOver);
                            // console.log('runsPerBall', runsPerBall);
                        }
                        const totalBalls = ballInOver.length;
                        addOverDetails(ballInOver, runsInCurrentOver, overNumber);
                        saveMatchDataToBackend(overNumber, ballInOver, totalBalls, runsPerBall);
                        newBalls = 0;
                        newOvers += 1;
                    }

                    let oversInDecimal = newOvers + ballsInCurrentOver / 10;
                    oversInDecimal = Math.round(oversInDecimal * 10) / 10;

                    // Update bowler stats
                    const updatedBowler = {
                        ...prevBowler2ndInnings,
                        balls: newBalls,
                        overs: oversInDecimal,
                        runs: prevBowler2ndInnings.runs + runs, // Add runs to bowler's total only if valid runs
                    };

                    // Extras are recorded separately
                    if (isExtra) {
                        updatedBowler.extras += extraRuns;
                    }

                    // Update wickets if applicable
                    if (isWicket) {
                        updatedBowler.wicket += 1;
                    }

                    let economyRate = 0;
                    if (updatedBowler.overs > 0) {
                        economyRate = updatedBowler.runs / updatedBowler.overs;
                    }

                    updatedBowler.economy = economyRate; // Store the economy rate in the bowler stats

                    return updatedBowler;
                    checkMatchResult();
                }

            }
        });
    };

    const addOverDetails = (ballNumber, runs, overNumber) => {
        setOverDetail((prevOverDetail) => [...prevOverDetail, ...ballNumber]);
        setOverNumber(overNumber);
        setRunsInOver((prevRunsInOver) => {
            const updatedRuns = [...prevRunsInOver, runs];
            setCountRunsInOver(updatedRuns);
            const totalRunsFirstInnings = updatedRuns.reduce((acc, run) => acc + run, 0);
            console.log("Total Runs in Over: ", totalRunsFirstInnings);
            return updatedRuns;
        });
    };

    const handleOverCompletion = (completedBowler) => {
        setPreviousBowler(completedBowler); // Save the current bowler as the previous bowler
        setIsOverComplete(true); // Trigger modal or any other action to indicate over completion
    };

    const handleNoBallPress = () => {
        setIsNoBallModalVisible(true);
    };

    const renderNoBallModal = () => (
        <Modal visible={isNoBallModalVisible} transparent animationType="slide">
            <View style={ScoreboardStyle.modalContainer}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        setSelectedNoBallRuns(value);
                        setIsNoBallModalVisible(false); // Close this modal
                        setIsExtrasModalVisible(true); // Open extras modal
                    }}
                    items={[...Array(8).keys()].map((num) => ({
                        label: `${num}nb`,
                        value: num,
                    }))}
                    placeholder={{ label: "Select No-Ball Runs", value: null }}
                />
            </View>
        </Modal>
    );

    const renderExtrasModal = () => (
        <Modal visible={isExtrasModalVisible} transparent animationType="slide">
            <View style={ScoreboardStyle.modalContainer}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        setSelectedExtraType(value);
                        setIsExtrasModalVisible(false); // Close this modal
                        handleNoBallRunUpdate(value, isExtraType = 'NoBall');
                    }}
                    items={[
                        { label: "Byes", value: "Byes" },
                        { label: "Legbyes", value: "Legbyes" },
                        { label: "None", value: "None" },
                    ]}
                    placeholder={{ label: "Select Extra Type", value: null }}
                />
            </View>
        </Modal>
    );

    const handleNoBallRunUpdate = (extraType, isExtraType) => {
        const runs = selectedNoBallRuns;

        // Add runs to total
        // setTotalRunsFirstInnings((prevRuns) => prevRuns + runs + 1); // Add runs + 1 for the no-ball
        if (innings == 1) {
            setTotalRunsFirstInnings((prevRuns) => prevRuns + runs + 1);
        }
        if (innings == 2) {
            setTotalRunsSecondInnings((prevRuns) => prevRuns + runs + 1);
        }
        // Update bowler stats for the no-ball

        if (runs % 2 !== 0) {
            // Switch the selected batsman between batsman 1 and 2
            setSelectedBatsman(selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1);
        }
        // Update batsman or extras
        if (extraType === "None") {
            // Add runs to batsman's score
            if (innings == 1) {
                updateBowlerStats(runs + 1, false, true, isExtraType, runs + 1);
            }
            if (innings == 2) {
                updateBowlerStatsForSeconInnings(runs + 1, false, true, isExtraType, runs + 1);

            }
            if (selectedBatsman) {
                if (selectedBatsman.name === selectedBatsman1.name) {
                    setSelectedBatsman1((prevBatsman) => {
                        const updatedBatsman = { ...prevBatsman };
                        updatedBatsman.runs += runs;
                        if (runs === 6) {
                            updatedBatsman.sixes += 1;
                        }
                        if (runs === 4) {
                            updatedBatsman.fours += 1;
                        }
                        return updatedBatsman;
                    });
                } else if (selectedBatsman.name === selectedBatsman2.name) {
                    setSelectedBatsman2((prevBatsman) => {
                        const updatedBatsman = { ...prevBatsman };
                        updatedBatsman.runs += runs;
                        if (runs === 6) {
                            updatedBatsman.sixes += 1;
                        }
                        if (runs === 4) {
                            updatedBatsman.fours += 1;
                        }
                        return updatedBatsman;
                    });
                }
            }
        }

        // Log extras if Byes or Legbyes
        if ((isExtraType == 'NoBall') && (extraType === "Byes" || extraType === "Legbyes")) {
            if (innings == 1) {
                updateBowlerStats(1, false, true, isExtraType, runs + 1);
            }
            if (innings == 2) {

                updateBowlerStatsForSeconInnings(1, false, true, isExtraType, runs + 1);
            }
            // console.log(`${runs} ${isExtraType} recorded.`);
        }
    };

    const handleWidePress = () => {
        setIsWideModalVisible(true); // Show the wide modal
    };

    const renderWideModal = () => (
        <Modal visible={isWideModalVisible} transparent animationType="slide">
            <View style={ScoreboardStyle.modalContainer}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        setSelectedWideRuns(value);
                        setIsWideModalVisible(false); // Close the modal
                        handleWideRunUpdate(value, isExtraType = 'Wide');
                    }}
                    items={[...Array(8).keys()].map((num) => ({
                        label: `${num}wd`,
                        value: num,
                    }))}
                    placeholder={{ label: "Select Wide Runs", value: null }}
                />
            </View>
        </Modal>
    );

    const handleWideRunUpdate = (runs, isExtraType) => {
        const totalWideRuns = runs + 1; // Wide always adds one run as penalty

        // Add runs to total score
        if (innings == 1) {
            setTotalRunsFirstInnings((prevRuns) => prevRuns + totalWideRuns);
        }
        if (innings == 2) {
            setTotalRunsSecondInnings((prevRuns) => prevRuns + totalWideRuns);
        }

        if (runs % 2 !== 0) {
            // Switch the selected batsman between batsman 1 and 2
            setSelectedBatsman(selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1);
        }
        // Update bowler stats for wide delivery
        if (innings == 1) {
            updateBowlerStats(totalWideRuns, false, true, isExtraType, totalWideRuns);
        }
        if (innings == 2) {
            updateBowlerStatsForSeconInnings(totalWideRuns, false, true, isExtraType, totalWideRuns);

        }

        // Update extras log if needed
        if (runs > 0) {
            console.log(`${runs} additional runs scored on the wide.`);
        }
    };

    const handleByesLegByesPress = () => {
        setIsByesLegByesModalVisible(true); // Show the modal
    };

    const renderByesLegByesModal = () => (
        <Modal visible={isByesLegByesModalVisible} transparent animationType="slide">
            <View style={ScoreboardStyle.modalContainer}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        setSelectedByesLegByes(value); // Save the number of runs scored
                        setIsByesLegByesModalVisible(false); // Close the modal
                        handleByesLegByesRunUpdate(value, isExtraType = 'LegByes'); // Update the scores
                    }}
                    items={[...Array(8).keys()].map((num) => ({
                        label: `${num} byes/leg-byes`,
                        value: num,
                    }))}
                    placeholder={{ label: "Select Byes/Leg-Byes Runs", value: null }}
                />
            </View>
        </Modal>
    );

    const handleByesLegByesRunUpdate = (runs, isExtraType) => {
        // Add runs to total score
        if (innings == 1) {
            setTotalRunsFirstInnings((prevRuns) => prevRuns + runs);
        }
        if (innings == 2) {
            setTotalRunsSecondInnings((prevRuns) => prevRuns + runs);
        }

        if (runs % 2 !== 0) {
            // Switch the selected batsman between batsman 1 and 2
            setSelectedBatsman(selectedBatsman.name === selectedBatsman1.name ? selectedBatsman2 : selectedBatsman1);
        }
        // Update the bowler's stats for a valid delivery without runs credited to the bowler
        if (innings == 1) {
            updateBowlerStats(0, false, true, isExtraType, runs);
        }
        if (innings == 2) {
            updateBowlerStatsForSeconInnings(0, false, true, isExtraType, runs);

        }

        // Log the extras as byes or leg-byes
        console.log(`${runs} recorded as extras ${isExtraType}`);
    };

    useEffect(() => {
        fetchMatchData(matchId);
        // console.log('Total Overs', totalOvers);
    }, [totalOvers])
    // Function to fetch data from PHP script and display players
    async function fetchMatchData(matchId) {
        const requestData = { match_id: matchId };

        try {
            const response = await fetch(`${apiConnection.apiIp}/getMatchDetails.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            console.log('ALL DATA:', data.totalOvers);
            setTotalOvers(data.totalOvers);
            if (data.status === 'success') {
                if (innings == 1) {
                    console.log('Ininngssssssssss', innings)
                    // Update team names
                    setBattingTeamName(data.batting_team_name || "Unknown Batting Team");
                    setBowlingTeamName(data.bowling_team_name || "Unknown Bowling Team");
                    setBowlingTeamId(data.bowlingFirst);
                    setBattingTeamId(data.battingFirst);
                    // console.log('Bowling First:', data.bowlingFirst);
                    // Process and filter players and bowlers, removing null or undefined data
                    const validBatsmen = (data.batting_team || []).filter(player => player && player.name).map(player => ({
                        name: player.name || "Unknown Player",
                        id: player.id,
                        runs: 0,
                        balls: 0,
                        strikeRate: 0,
                        dots: 0,
                        ones: 0,
                        twos: 0,
                        threes: 0,
                        fours: 0,
                        sixes: 0,
                        dismissed: 0,
                        wicket_type: 'Not Out',
                        ballRuns: [],
                    }));

                    const validBowlers = (data.bowling_team || []).filter(player => player && player.name).map(player => ({
                        name: player.name || "Unknown Bowler",
                        overs: 0,
                        maiden: 0,
                        runs: 0,
                        wicket: 0,
                        noball: 0,
                        wides: 0,
                        economy: 0,
                        extras: 0,
                    }));

                    // Update state
                    setPlayers(validBatsmen);
                    setBowlers(validBowlers);
                }
                if (innings == 2) {
                    console.log('Ininngssssssssss', innings)
                    // Update team names
                    setBattingTeamName(data.bowling_team_name || "Unknown Batting Team");
                    setBowlingTeamName(data.batting_team_name || "Unknown Bowling Team");
                    setBowlingTeamId(data.battingFirst);
                    setBattingTeamId(data.bowlingFirst);
                    // console.log('Bowling First:', data.bowlingFirst);
                    // Process and filter players and bowlers, removing null or undefined data
                    const validBatsmen = (data.bowling_team || []).filter(player => player && player.name).map(player => ({
                        name: player.name || "Unknown Player",
                        id: player.id,
                        runs: 0,
                        balls: 0,
                        strikeRate: 0,
                        dots: 0,
                        ones: 0,
                        twos: 0,
                        threes: 0,
                        fours: 0,
                        sixes: 0,
                        dismissed: 0,
                        wicket_type: 'Not Out',
                        ballRuns: [],
                    }));

                    const validBowlers = (data.batting_team || []).filter(player => player && player.name).map(player => ({
                        name: player.name || "Unknown Bowler",
                        overs: 0,
                        maiden: 0,
                        runs: 0,
                        wicket: 0,
                        noball: 0,
                        wides: 0,
                        economy: 0,
                        extras: 0,
                    }));

                    // Update state
                    setPlayers(validBatsmen);
                    setBowlers(validBowlers);
                }
                // console.log("Bowling Team:", validBowlers);
            } else {
                console.error('Error fetching match data:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        if (matchId) {
            fetchMatchData(matchId);
        }
    }, [matchId]);

    useEffect(() => {
        if (innings === 2) {
            setModalVisible(true); // Open modal for the second innings
        }
    }, [innings]);

    useEffect(() => {
        if (matchId) {
            fetchMatchData(matchId);
        }
    }, [innings]);

    const handleBowlerSelection = (bowler) => {
        setSelectedBowler(bowler);
        checkIfSelectionComplete();

    };

    const checkIfSelectionComplete = () => {
        if (selectedBatsman1 && selectedBatsman2 && selectedBowler) {
            setIsSelectionComplete(true);
        }
    };

    const handleModalClose = () => {
        if (isSelectionComplete) {
            setModalVisible(false);
        }
    };

    const handleWicketPress = () => {
        if (selectedBatsman) {
            setIsWicketModalVisible(true); // Show the modal if a batsman is selected
        } else {
            // Optionally, show an alert or handle the case where no batsman is selected
            alert('Please select a batsman first');
        }
    };

    useEffect(() => {
        console.log(wicketType)
    }, [wicketType])

    const handleWicketSelection = (type) => {
        setWicketType(type + 'by' + selectedBowler.name);
        // setWicketType(type + '.' + selectedBowler.name);
        // console.log(wicketType)
        // console.log(`${runs} recorded as extras ${isExtraType}`);
        setIsConfirmModalVisible(true); // Show the confirmation modal
    };

    const handleNewBatsmanConfirm = () => {
        if (selectedBatsman.name === selectedBatsman1.name) {
            if (innings == 1) {
                updateScore(0, true, false);  // Update score
            }
            if (innings == 2) {
                updateScoreSecondInnings(0, true, false);  // Update score
            }
            setSelectedBatsman1(selectedBatsman);  // Replace with new batsman
            // updateBowlerStats(0, true, false);  // Update bowler stats
            // dismissedBatsmen1Ref.current = 0
        } else if (selectedBatsman.name === selectedBatsman2.name) {
            setSelectedBatsman2(selectedBatsman);  // Replace with new batsman
            if (innings == 1) {
                updateScore(0, true, false);  // Update score
            }
            if (innings == 2) {
                updateScoreSecondInnings(0, true, false);  // Update score
            }
            // updateBowlerStats(0, true, false);  // Update bowler stats
            // dismissedBatsmen2Ref.current = 0
        }

        if (newBatsman) {
            // First, immediately set the dismissed batsman status using refs
            // Now proceed with the rest of the logic
            setBatsmanOut(selectedBatsman);  // Clear out the batsman out
            setNewBatsman(newBatsman);  // Reset the new batsman field

            if (selectedBatsman.name === selectedBatsman1.name) {
                // updateScore(0, true, false);  // Update score
                setSelectedBatsman1(newBatsman);  // Replace with new batsman
                if (innings == 1) {
                    updateBowlerStats(0, true, false);  // Update bowler stats
                }
                if (innings == 2) {
                    updateBowlerStatsForSeconInnings(0, true, false);  // Update bowler stats

                }
                dismissedBatsmen1Ref.current = 0
            } else if (selectedBatsman.name === selectedBatsman2.name) {
                setSelectedBatsman2(newBatsman);  // Replace with new batsman
                // updateScore(0, true, false);  // Update score
                if (innings == 1) {
                    updateBowlerStats(0, true, false);  // Update bowler stats
                }
                if (innings == 2) {

                    updateBowlerStatsForSeconInnings(0, true, false);  // Update bowler stats
                }
                dismissedBatsmen2Ref.current = 0
            }

            setIsConfirmModalVisible(false);  // Close confirmation modal
        } else {
            alert("Please select a new batsman.");
        }
    };


    const availableBatsmen = () => {
        // Filter out batsmen who are already dismissed (by their IDs) or currently batting
        return players.filter(player =>
            !dismissedBatsmenIds.current.includes(player.id) &&  // Exclude dismissed batsmen by ID
            player.id !== selectedBatsman1.id &&  // Exclude currently batting batsman 1
            player.id !== selectedBatsman2.id &&   // Exclude currently batting batsman 2
            player.id !== prevBatsman?.id
        ).map(player => ({
            label: player.name,
            value: player
        }));
    };


    const saveMatchDataToBackend = async (overNumber, ballInOver, totalBalls, runsInOver) => {
        if (innings == 1) {
            if (((currentOverAndBallForFirstInnings && totalOvers) !== 0) && currentOverAndBallForFirstInnings === totalOvers) {
                if (bowlingTeamId === null) {
                    console.error('Bowling First is not set!');
                    return;
                }
                // console.log('ECONOMY', updateBowlerStats.e)
                const matchData = {
                    match_id: matchId,
                    team_id: bowlingTeamId,
                    bowler_name: selectedBowler.name,
                    over_detail: JSON.stringify(ballInOver),  // Store over details as JSON
                    total_runs_conceded: JSON.stringify(runsInOver),  // Store runs as JSON
                    over_number: overNumber,
                    total_wickets: selectedBowler.wicket,
                    total_balls_bowled: totalBalls,
                    economy_rate: (runsInOver.reduce((acc, run) => acc + run, 0)).toFixed(2),
                    innings: innings,  // Assuming you have a variable for innings (1st or 2nd)
                    total_runs_sum: runsInOver.reduce((acc, run) => acc + run, 0),
                };

                try {
                    const response = await fetch(`${apiConnection.apiIp}/matchOversData.php`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(matchData),
                    });

                    // console.log(`Request URL: ${apiConnection.apiIp}/matchOversData`);
                    // console.log('Request Body:', matchData);

                    const status = response.status;
                    const statusText = response.statusText;

                    // console.log('HTTP Status:', status, statusText);

                    const textResponse = await response.text(); // Read raw response
                    // console.log('Raw Response:', textResponse);

                    // Attempt to parse JSON
                    try {
                        const result = JSON.parse(textResponse);
                        if (result.status === 'success') {
                            console.log('Match data saved successfully!');
                            setSelectedBowler({
                                balls: 0,
                                ballsInOver: [], // Reset the array to start fresh
                                economy: 0,
                                extras: 0,
                                legalBallsInOver: 0,
                                maiden: 0,
                                noball: 0,
                                overs: 0,
                                runs: 0,
                                runsInOver: [],  // Reset the array for runs
                                wicket: 0,       // Reset wicket count
                                wides: 0,
                                name: selectedBowler.name,
                                hasReset: true,  // Flag to indicate the reset is d
                            });
                            setIsBowlerStateUpdated(true);
                        } else {
                            console.error('Failed to save match data:', result.message);
                        }
                    } catch (jsonError) {
                        console.error('Failed to parse JSON response:', jsonError.message);
                        console.log('Full Response:', textResponse); // Log full raw response for debugging
                    }
                } catch (error) {
                    console.error('Fetch Error:', error.message);
                    console.error('Full Error:', error); // Log the full error object
                }
                Alert.alert('1st Innings Finish');
                // navigation.navigate('Dashboard')
            }
            else {
                if (bowlingTeamId === null) {
                    console.error('Bowling First is not set!');
                    return;
                }
                const matchData = {
                    match_id: matchId,
                    team_id: bowlingTeamId,
                    bowler_name: selectedBowler.name,
                    over_detail: JSON.stringify(ballInOver),  // Store over details as JSON
                    total_runs_conceded: JSON.stringify(runsInOver),  // Store runs as JSON
                    over_number: overNumber,
                    total_wickets: selectedBowler.wicket,
                    total_balls_bowled: totalBalls,
                    economy_rate: (runsInOver.reduce((acc, run) => acc + run, 0)).toFixed(2),
                    innings: innings,  // Assuming you have a variable for innings (1st or 2nd)
                    total_runs_sum: runsInOver.reduce((acc, run) => acc + run, 0),
                };

                try {
                    const response = await fetch(`${apiConnection.apiIp}/matchOversData.php`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(matchData),
                    });

                    // console.log(`Request URL: ${apiConnection.apiIp}/matchOversData`);
                    console.log('Request Body:', matchData);

                    const status = response.status;
                    const statusText = response.statusText;

                    // console.log('HTTP Status:', status, statusText);

                    const textResponse = await response.text(); // Read raw response
                    // console.log('Raw Response:', textResponse);

                    // Attempt to parse JSON
                    try {
                        const result = JSON.parse(textResponse);
                        if (result.status === 'success') {
                            console.log('Match data saved successfully!');
                            // handleOverComplete();
                        } else {
                            console.error('Failed to save match data:', result.message);
                        }
                    } catch (jsonError) {
                        console.error('Failed to parse JSON response:', jsonError.message);
                        console.log('Full Response:', textResponse); // Log full raw response for debugging
                    }
                } catch (error) {
                    console.error('Fetch Error:', error.message);
                    console.error('Full Error:', error); // Log the full error object
                }
            }
        }
        if (innings == 2) {
            if (((currentOverAndBallForSecondInnings && totalOvers) !== 0) && currentOverAndBallForSecondInnings === totalOvers) {
                if (bowlingTeamId === null) {
                    console.error('Bowling First is not set!');
                    return;
                }
                // console.log('ECONOMY', updateBowlerStats.e)
                const matchData = {
                    match_id: matchId,
                    team_id: bowlingTeamId,
                    bowler_name: selectedBowler.name,
                    over_detail: JSON.stringify(ballInOver),  // Store over details as JSON
                    total_runs_conceded: JSON.stringify(runsInOver),  // Store runs as JSON
                    over_number: overNumber,
                    total_wickets: selectedBowler.wicket,
                    total_balls_bowled: totalBalls,
                    economy_rate: (runsInOver.reduce((acc, run) => acc + run, 0)).toFixed(2),
                    innings: innings,  // Assuming you have a variable for innings (1st or 2nd)
                    total_runs_sum: runsInOver.reduce((acc, run) => acc + run, 0),
                };

                try {
                    const response = await fetch(`${apiConnection.apiIp}/matchOversData.php`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(matchData),
                    });

                    // console.log(`Request URL: ${apiConnection.apiIp}/matchOversData`);
                    // console.log('Request Body:', matchData);

                    const status = response.status;
                    const statusText = response.statusText;

                    // console.log('HTTP Status:', status, statusText);

                    const textResponse = await response.text(); // Read raw response
                    // console.log('Raw Response:', textResponse);

                    // Attempt to parse JSON
                    try {
                        const result = JSON.parse(textResponse);
                        if (result.status === 'success') {
                            console.log('Match data saved successfully!');
                            handleOverComplete();
                        } else {
                            console.error('Failed to save match data:', result.message);
                        }
                    } catch (jsonError) {
                        console.error('Failed to parse JSON response:', jsonError.message);
                        console.log('Full Response:', textResponse); // Log full raw response for debugging
                    }
                } catch (error) {
                    console.error('Fetch Error:', error.message);
                    console.error('Full Error:', error); // Log the full error object
                }
                Alert.alert('1st Innings Finish');
                // navigation.navigate('Dashboard')
            }
            else {
                if (bowlingTeamId === null) {
                    console.error('Bowling First is not set!');
                    return;
                }
                const matchData = {
                    match_id: matchId,
                    team_id: bowlingTeamId,
                    bowler_name: selectedBowler.name,
                    over_detail: JSON.stringify(ballInOver),  // Store over details as JSON
                    total_runs_conceded: JSON.stringify(runsInOver),  // Store runs as JSON
                    over_number: overNumber,
                    total_wickets: selectedBowler.wicket,
                    total_balls_bowled: totalBalls,
                    economy_rate: (runsInOver.reduce((acc, run) => acc + run, 0)).toFixed(2),
                    innings: innings,  // Assuming you have a variable for innings (1st or 2nd)
                    total_runs_sum: runsInOver.reduce((acc, run) => acc + run, 0),
                };

                try {
                    const response = await fetch(`${apiConnection.apiIp}/matchOversData.php`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(matchData),
                    });

                    // console.log(`Request URL: ${apiConnection.apiIp}/matchOversData`);
                    console.log('Request Body:', matchData);

                    const status = response.status;
                    const statusText = response.statusText;

                    // console.log('HTTP Status:', status, statusText);

                    const textResponse = await response.text(); // Read raw response
                    // console.log('Raw Response:', textResponse);

                    // Attempt to parse JSON
                    try {
                        const result = JSON.parse(textResponse);
                        if (result.status === 'success') {
                            console.log('Match data saved successfully!');
                            // handleOverComplete();
                        } else {
                            console.error('Failed to save match data:', result.message);
                        }
                    } catch (jsonError) {
                        console.error('Failed to parse JSON response:', jsonError.message);
                        console.log('Full Response:', textResponse); // Log full raw response for debugging
                    }
                } catch (error) {
                    console.error('Fetch Error:', error.message);
                    console.error('Full Error:', error); // Log the full error object
                }
            }
        }
    };


    // Determine the profile and lock icon based on the theme
    const AvsB = colors.background === '#333' ? require('../assets/icons/AvB.png') : require('../assets/icons/AvB.png');
    const userIcon = colors.background === '#333' ? require('../assets/icons/user_white.png') : require('../assets/icons/user.png');

    return (
        <ScrollView style={[ScoreboardStyle.container, { backgroundColor: colors.background }]}>
            <Modal
                visible={isOverComplete}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsOverComplete(false)}
            >
                <View style={ScoreboardStyle.modalContainer}>
                    <View style={ScoreboardStyle.modalContent}>
                        <Text style={ScoreboardStyle.modalHeader}>Select Next Bowler</Text>
                        <RNPickerSelect
                            onValueChange={(value) => {
                                const newBowler = bowlers.find((bowler) => bowler.name === value);
                                handleBowlerSelection(newBowler); // Assign the new bowler
                                setIsOverComplete(false); // Close the modal
                            }}
                            items={bowlers
                                .filter((bowler) => bowler.name !== previousBowler?.name) // Exclude the previous bowler
                                .map((bowler) => ({
                                    label: bowler.name,
                                    value: bowler.name,
                                }))
                            }
                            placeholder={{ label: "Select Bowler", value: null }}
                            value={selectedBowler ? selectedBowler.name : null}
                            style={{
                                inputIOS: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBowler ? 'black' : 'gray',
                                },
                                inputAndroid: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBowler ? 'black' : 'gray',
                                },
                            }}
                        />
                        <Button title="Cancel" onPress={() => setIsOverComplete(false)} />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={ScoreboardStyle.modalContainer}>
                    <View style={ScoreboardStyle.modalContent}>
                        <Text style={ScoreboardStyle.modalHeader}>Select Batting Players</Text>

                        {/* Batting Team */}
                        <Text style={ScoreboardStyle.teamName}>{battingTeamName}</Text>

                        {/* Select Batsman 1 */}
                        <RNPickerSelect
                            onValueChange={(value) => {
                                const selectedPlayer = players.find(player => player.name === value);
                                setSelectedBatsman1(selectedPlayer); // Set the selected batsman 1
                            }}
                            items={players.map(player => ({
                                label: player.name,
                                value: player.name,
                            }))}
                            value={selectedBatsman1 ? selectedBatsman1.name : null}
                            placeholder={{ label: "Select Batsman 1", value: null }}
                            style={{
                                inputIOS: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBatsman1 ? 'black' : 'gray',
                                },
                                inputAndroid: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBatsman1 ? 'black' : 'gray',
                                },
                            }}
                        />

                        {/* Select Batsman 2 */}
                        <RNPickerSelect
                            onValueChange={(value) => {
                                const selectedPlayer = players.find(player => player.name === value);
                                setSelectedBatsman2(selectedPlayer); // Set the selected batsman 2
                            }}
                            items={players.map(player => ({
                                label: player.name,
                                value: player.name,
                            }))}
                            value={selectedBatsman2 ? selectedBatsman2.name : null}
                            placeholder={{ label: "Select Batsman 2", value: null }}
                            style={{
                                inputIOS: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBatsman2 ? 'black' : 'gray',
                                },
                                inputAndroid: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBatsman2 ? 'black' : 'gray',
                                },
                            }}
                        />



                        {/* Bowling Team */}
                        <Text style={ScoreboardStyle.modalHeader}>Select Bowler</Text>
                        <Text style={ScoreboardStyle.teamName}>{bowlingTeamName}</Text>

                        {/* Select Bowler */}
                        <RNPickerSelect
                            onValueChange={(value) =>
                                handleBowlerSelection(bowlers.find(bowler => bowler.name === value))
                            }
                            items={bowlers.map(bowler => ({
                                label: bowler.name,
                                value: bowler.name,
                            }))}
                            value={selectedBowler ? selectedBowler.name : null}
                            placeholder={{ label: "Select Bowler", value: null }}
                            style={{
                                inputIOS: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBowler ? 'black' : 'gray',
                                },
                                inputAndroid: {
                                    ...ScoreboardStyle.picker,
                                    color: selectedBowler ? 'black' : 'gray',
                                },
                            }}
                        />
                        {/* Next Button */}
                        {isSelectionComplete && (
                            <TouchableOpacity
                                style={ScoreboardStyle.nextButton}
                                onPress={handleModalClose}
                            >
                                <Text style={ScoreboardStyle.nextButtonText}>Next</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Scoreboard View */}
            {!modalVisible && (
                <>
                    <View style={ScoreboardStyle.header}>
                        <View style={ScoreboardStyle.iconContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                                <AntDesign name="caretleft" size={25} color='#EB001B' />
                            </TouchableOpacity>
                        </View>
                        <Text style={[ScoreboardStyle.title, { color: colors.text }]}>Matches</Text>
                        <Icon name="search" size={23} color="#f79e1b" style={ScoreboardStyle.iconSearch} />
                    </View>

                    {/* Score Card Section */}
                    <View style={ScoreboardStyle.middleText}>
                        <Text style={[ScoreboardStyle.welTxt, { color: colors.text }]}>Score Card</Text>
                    </View>

                    {/* Team Score Cards */}
                    <View style={ScoreboardStyle.cardContainer}>
                        {/* First Team */}
                        <View style={ScoreboardStyle.card}>
                            <View style={[ScoreboardStyle.helmetIconContainer, { backgroundColor: 'orange' }]}>
                                <Image
                                    source={require('../assets/icons/helmet.png')}
                                    style={ScoreboardStyle.helmetIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={[ScoreboardStyle.teamText, { color: 'black' }]}>{battingTeamName}</Text>
                            <Text style={[ScoreboardStyle.scoreText, { marginRight: 55 }]}>{totalRunsFirstInnings}/{totalWicketsInFirstInnings}</Text>
                            <Text style={ScoreboardStyle.scoreText}>({currentOverAndBallForFirstInnings}/{totalOvers})</Text>
                        </View>

                        {/* Second Team */}
                        <View style={ScoreboardStyle.card}>
                            <View style={ScoreboardStyle.helmetIconContainer}>
                                <Image
                                    source={require('../assets/icons/helmet.png')}
                                    style={ScoreboardStyle.helmetIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={[ScoreboardStyle.teamText, { color: 'black' }]}>{bowlingTeamName}</Text>
                            <Text style={[ScoreboardStyle.scoreText, { marginRight: 55 }]}>{totalRunsSecondInnings}/{totalWicketsInSecondInnings}</Text>
                            {innings == 2 && (
                                <Text style={ScoreboardStyle.scoreText}>({currentOverAndBallForSecondInnings}/{totalOvers})</Text>
                            )}
                        </View>
                    </View>

                    {/* Score Details */}
                    <View style={ScoreboardStyle.centeredContent}>
                        <View style={ScoreboardStyle.RRtextContainer}>
                            {/* Current Run Rate and Projected Score */}
                            <View style={ScoreboardStyle.crrContainer}>
                                <Text style={[ScoreboardStyle.crrText, { color: "black" }]}>Current Run rate:</Text>
                                <Text style={ScoreboardStyle.crrNumber}>36.00</Text>
                            </View>

                            <View style={ScoreboardStyle.crrContainer}>
                                <Text style={[ScoreboardStyle.crrText, { color: "black" }]}>Projected Score:</Text>
                                <Text style={ScoreboardStyle.crrNumber}>100</Text>
                            </View>
                        </View>

                        {/* Line Divider */}
                        <View style={ScoreboardStyle.line}></View>

                        <View style={ScoreboardStyle.batterText}>
                            <Text style={[ScoreboardStyle.batTxtH, { color: colors.text, flex: 1, textAlign: 'left' }]}>Batters</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 3 }}>
                                <Text style={ScoreboardStyle.runsH}>R</Text>
                                <Text style={ScoreboardStyle.runsH}>B</Text>
                                <Text style={ScoreboardStyle.runsH}>4s</Text>
                                <Text style={ScoreboardStyle.runsH}>6s</Text>
                                <Text style={ScoreboardStyle.runsH}>SR</Text>
                            </View>
                        </View>

                        {/* Display Selected Batters */}
                        {selectedBatsman1 && (
                            <View style={ScoreboardStyle.batterText}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    {/* Select Player 1 by clicking on the name */}
                                    <TouchableOpacity onPress={() => setSelectedBatsman(selectedBatsman1)}>
                                        {
                                            selectedBatsman ? (
                                                // If a batsman is selected, display the selected batsman with an "orange" background
                                                <View style={[ScoreboardStyle.plyCon, {
                                                    backgroundColor: selectedBatsman.name === selectedBatsman1.name ? 'orange' : 'grey',
                                                    flex: 1,
                                                    textAlign: 'left',
                                                }]}>
                                                    <Text style={ScoreboardStyle.batTxt}>{selectedBatsman1.name}</Text>
                                                </View>
                                            ) : (
                                                // If no batsman is selected, show the alternative background color
                                                <View style={[ScoreboardStyle.plyCon, {
                                                    backgroundColor: selectedBatsman === selectedBatsman1.name ? 'orange' : 'grey',
                                                    flex: 1,
                                                    textAlign: 'left',
                                                }]}>
                                                    <Text style={ScoreboardStyle.batTxt}>{selectedBatsman1.name}</Text>
                                                </View>
                                            )
                                        }

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 3 }}>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman1.runs}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman1.balls}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman1.fours}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman1.sixes}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman1.strikeRate.toFixed(2)}</Text>
                                </View>
                            </View>
                        )}

                        {selectedBatsman2 && (
                            <View style={ScoreboardStyle.batterText}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* Select Player 2 by clicking on the name */}
                                    <TouchableOpacity onPress={() => setSelectedBatsman(selectedBatsman2)}>
                                        {
                                            selectedBatsman ? (
                                                // If a batsman is selected, display the selected batsman with an "orange" background
                                                <View style={[ScoreboardStyle.plyCon, {
                                                    backgroundColor: selectedBatsman.name === selectedBatsman2.name ? 'orange' : 'grey',
                                                    flex: 1,
                                                    textAlign: 'left',
                                                }]}>
                                                    <Text style={ScoreboardStyle.batTxt}>{selectedBatsman2.name}</Text>
                                                </View>
                                            ) : (
                                                // If no batsman is selected, show the alternative background color
                                                <View style={[ScoreboardStyle.plyCon, {
                                                    backgroundColor: selectedBatsman === selectedBatsman2.name ? 'orange' : 'grey',
                                                    flex: 1,
                                                    textAlign: 'left',
                                                }]}>
                                                    <Text style={ScoreboardStyle.batTxt}>{selectedBatsman2.name}</Text>
                                                </View>
                                            )
                                        }

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 3 }}>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman2.runs}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman2.balls}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman2.fours}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman2.sixes}</Text>
                                    <Text style={ScoreboardStyle.runs}>{selectedBatsman2.strikeRate.toFixed(2)}</Text>
                                </View>
                            </View>
                        )}

                        <View style={ScoreboardStyle.batterText}>
                            <Text style={[ScoreboardStyle.batTxtH, { color: colors.text, flex: 1, textAlign: 'left' }]}>Bowlers</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 3 }}>
                                <Text style={ScoreboardStyle.runsH}>O</Text>
                                <Text style={ScoreboardStyle.runsH}>M</Text>
                                <Text style={ScoreboardStyle.runsH}>R</Text>
                                <Text style={ScoreboardStyle.runsH}>W</Text>
                                <Text style={ScoreboardStyle.runsH}>E</Text>
                            </View>
                        </View>

                        {/* Display Selected Bowler */}
                        {selectedBowler && (
                            <View style={ScoreboardStyle.batterText}>
                                <View style={ScoreboardStyle.bowlCon}>
                                    <Text style={[ScoreboardStyle.batTxt, { color: 'white', flex: 1, textAlign: 'left' }]}>{selectedBowler.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 3 }}>
                                    {innings == 1 && (
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.overs}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.maiden}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.runs}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.wicket}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.economy?.toFixed(1) ?? 0.0}</Text>
                                        </View>
                                    )}
                                    {innings == 2 && (
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.overs}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.maiden}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.runs}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.wicket}</Text>
                                            <Text style={ScoreboardStyle.runs}>{selectedBowler.economy?.toFixed(1) ?? 0.0}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}
                        <View style={ScoreboardStyle.backgroundContainer}>
                            <View style={ScoreboardStyle.overCardContainer}>
                                <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(0, false, false)
                                    }
                                    if (innings == 2) {
                                        updateScoreSecondInnings(0, false, false)
                                    }
                                }}
                                >
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Entypo name="dot-single" size={25} color='black' />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(1, false, false)
                                        console.log('Innings 1')
                                    }
                                    if (innings == 2) {
                                        console.log('Innings 2')
                                        updateScoreSecondInnings(1, false, false)
                                    }
                                }}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={ScoreboardStyle.overText}>1</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(2, false, false)
                                    }
                                    if (innings == 2) {
                                        updateScoreSecondInnings(2, false, false)
                                    }
                                }}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={ScoreboardStyle.overText}>2</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(3, false, false)
                                    }
                                    if (innings == 2) {
                                        updateScoreSecondInnings(3, false, false)
                                    }
                                }}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={ScoreboardStyle.overText}>3</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: 'grey' }]} onPress={() => (navigation.navigate('EnterTeam'))}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <MaterialCommunityIcons name="rotate-3d-variant" size={25} color='black' />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={ScoreboardStyle.overCardContainer}>
                                <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(4, false, false)
                                    }
                                    if (innings == 2) {
                                        updateScoreSecondInnings(4, false, false)
                                    }
                                }}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={ScoreboardStyle.overText}>4</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(5, false, false)
                                    }
                                    if (innings == 2) {
                                        updateScoreSecondInnings(5, false, false)
                                    }
                                }}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={ScoreboardStyle.overText}>5</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={ScoreboardStyle.oversCard} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(6, false, false)
                                    }
                                    if (innings == 2) {
                                        updateScoreSecondInnings(6, false, false)
                                    }
                                }}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={ScoreboardStyle.overText}>6</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: '#D3D3D3', borderColor: 'red', borderWidth: 1 }]} onPress={() => {
                                    if (innings == 1) {
                                        updateScore(7, false, false)
                                    }
                                    if (innings == 2) {
                                        updateScoreSecondInnings(7, false, false)
                                    }
                                }}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={[ScoreboardStyle.overText]}>7</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: '#D3D3D3', borderColor: 'red', borderWidth: 1 }]} onPress={() => (navigation.navigate('EnterTeam'))}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={ScoreboardStyle.overText}>DLS</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={ScoreboardStyle.overCardContainer}>
                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: 'black' }]} onPress={handleWidePress}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={[ScoreboardStyle.overText, { color: 'white' }]}>WIDE</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: 'black' }]} onPress={handleNoBallPress}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={[ScoreboardStyle.overText, { color: 'white' }]}>NOBALL</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: 'black' }]} onPress={handleByesLegByesPress}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={[ScoreboardStyle.overText, { color: 'white' }]}>BYES</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: 'black' }]} onPress={handleByesLegByesPress}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={[ScoreboardStyle.overText, { color: 'white' }]}>LEGBYES</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[ScoreboardStyle.oversCard, { backgroundColor: 'red' }]} onPress={handleWicketPress}>
                                    <View style={[ScoreboardStyle.addIconContainer]}>
                                        <Text style={[ScoreboardStyle.overText, { color: 'white' }]}>WICKET</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {renderNoBallModal()}
                            {renderExtrasModal()}
                            {renderWideModal()}
                            {renderByesLegByesModal()}
                            <Modal
                                visible={isWicketModalVisible}
                                animationType="slide"
                                transparent={true}
                                onRequestClose={() => setIsWicketModalVisible(false)}
                            >
                                <View style={ScoreboardStyle.modalContainer}>
                                    <View style={ScoreboardStyle.modalContent}>
                                        <Text style={ScoreboardStyle.modalHeader}>Select Wicket Type</Text>

                                        {/* Wicket Type Options */}
                                        {['Bowled', 'Caught', 'LBW', 'Stumped', 'Run Out'].map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                onPress={() => {
                                                    setWicketType(type);  // Set selected wicket type
                                                    setIsWicketModalVisible(false);  // Close the modal
                                                    handleWicketSelection(type)
                                                    // You can also add functionality to handle the wicket logic here
                                                }}
                                            >
                                                <Text style={ScoreboardStyle.overText}>{type}</Text>
                                            </TouchableOpacity>
                                        ))}

                                        <Button title="Cancel" onPress={() => setIsWicketModalVisible(false)} />
                                    </View>
                                </View>
                            </Modal>

                            <Modal
                                visible={isConfirmModalVisible}
                                animationType="slide"
                                transparent={true}
                                onRequestClose={() => setIsConfirmModalVisible(false)}
                            >
                                <View style={ScoreboardStyle.modalContainer}>
                                    <View style={ScoreboardStyle.modalContent}>
                                        <Text style={ScoreboardStyle.modalHeader}>Wicket Confirmed</Text>

                                        {/* Display Batsman details */}
                                        {selectedBatsman && (
                                            <View style={ScoreboardStyle.batsmanDetails}>
                                                <Text style={ScoreboardStyle.runsH}>Batsman: {selectedBatsman.name}</Text>
                                                <Text style={ScoreboardStyle.runsH}>Runs: {selectedBatsman.runs}</Text>
                                                <Text style={ScoreboardStyle.runsH}>Balls: {selectedBatsman.balls}</Text>
                                                <Text style={ScoreboardStyle.runsH}>4s: {selectedBatsman.fours}</Text>
                                                <Text style={ScoreboardStyle.runsH}>6s: {selectedBatsman.sixes}</Text>
                                                <Text style={ScoreboardStyle.runsH}>SR: {selectedBatsman.strikeRate.toFixed(2)}</Text>
                                            </View>
                                        )}

                                        {/* Select New Batsman */}
                                        <RNPickerSelect
                                            placeholder={{ label: 'Select New Batsman', value: null }}
                                            value={newBatsman ? newBatsman.name : null}
                                            onValueChange={(value) => setNewBatsman(value)} // Set the new batsman
                                            items={availableBatsmen()} // Get available batsmen for selection
                                        />

                                        <TouchableOpacity
                                            style={ScoreboardStyle.button}
                                            onPress={() => handleNewBatsmanConfirm()}
                                        >
                                            <Text style={ScoreboardStyle.buttonText}>Confirm</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={ScoreboardStyle.button}
                                            onPress={() => setIsConfirmModalVisible(false)}
                                        >
                                            <Text style={ScoreboardStyle.buttonText}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                        </View>

                        <TouchableOpacity
                            style={[ScoreboardStyle.button]}
                        >
                            <Text style={[ScoreboardStyle.buttonText, { color: 'white' }]}>
                                End Match
                            </Text>
                        </TouchableOpacity>

                    </View>
                </>
            )}
        </ScrollView>
    );
};

export default Scoreboard;
