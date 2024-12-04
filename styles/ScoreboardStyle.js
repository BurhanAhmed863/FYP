import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ScoreboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        // bottom: hp('2%'),
    },
    header: {
        flexDirection: 'row',
        marginTop: hp('2%'),
    },
    iconContainer: {
        position: 'absolute',
        top: wp('2.2%'),
    },
    addIconContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('10%'),
        top: hp('5%'),
    },
    title: {
        fontSize: wp('8%'),
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.3%'),
        left: wp('7%'),
        bottom: hp('0.3%'),
        marginBottom: hp('5%'),
    },
    welTxt: {
        fontSize: wp('7%'),
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        marginLeft: wp('2%'),
    },
    scoreText: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Bold',
        color: 'black',
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: wp('1%'),
    },
    teamText: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        left: wp('15%'),
    },
    card2: {
        flexDirection: 'column',
        backgroundColor: '#f79e1b',
        borderRadius: 25,
        padding: hp('2.5%'),
        width: wp('90%'),
        height: hp('15%'),
    },
    RRtextContainer: {
        marginBottom: hp('2%'),
    },
    crrContainer: {
        flexDirection: 'row',
    },
    middleText: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjust to space elements evenly
        alignItems: 'center', // Center items vertically
        paddingVertical: hp('1%'), // Add vertical padding
    },
    // batterText: {
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'flex-start',
    //     paddingVertical: hp('0.3%'), // Add vertical padding
    //     marginBottom: hp('1%'), // Spacing between rows
    // },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',  // Ensure header items span the full width
        paddingVertical: hp('0.5%'), // Padding between header rows
    },
    // Row for player/bowler stats
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',  // Ensure row items span the full width
        paddingVertical: hp('0.5%'), // Padding between row items
    },

    crrText: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Regular',
        marginRight: wp('5%'),
    },
    crrNumber: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
        color: '#E61717',
    },
    batterText: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensures proper space distribution
        alignItems: 'center', // Vertically align the items in the center
        paddingVertical: hp('0.5%'), // Adjusted padding for better spacing
    },
    batTxtH: {
        fontSize: wp('7%'),
        fontFamily: 'SignikaNegative-Bold',
        marginBottom: hp('3%'),
        top: hp('1.5%'),
        left: wp('3%'),
        textAlign: 'left', // Align text to the left for headings
    },
    runsH: {
        fontSize: wp('5%'),
        padding: wp('2.5%'),
        fontFamily: 'SignikaNegative-Bold',
        color: '#E61717',
        // marginHorizontal: wp('2%'), // Consistent horizontal margin
    },
    plyCon: {
        width: wp('40%'),
        height: hp('5%'),
        borderRadius: 12,
        padding: wp('0.5%'), // Padding for better visual appearance
        justifyContent: 'center', // Center the name text vertically
        left: wp('2%'),
    },
    bowlCon: {
        width: wp('40%'),
        height: hp('5%'),
        backgroundColor: 'red',
        borderRadius: 12,
        padding: wp('0.5%'),
        left: wp('2%'),
    },
    batTxt: {
        fontSize: wp('6%'),
        fontFamily: 'SignikaNegative-Regular',
        paddingLeft: wp('1%'),
        color: 'white',
    },
    runs: {
        fontSize: hp('2.2%'),
        flexDirection: 'row',
        paddingVertical: 2,
        fontFamily: 'SignikaNegative-Regular',
        color: '#E61717',
        marginHorizontal: wp('2%'), // Ensure even spacing between stats
    },
    addTxt: {
        position: 'absolute',
        fontSize: wp('7%'),
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
        left: wp('-12%'),
        top: hp('17%'),
    },
    line: {
        width: wp('70%'),
        borderWidth: 2,
        borderRadius: 2,
    },
    historyTxt: {
        position: 'absolute',
        fontSize: wp('7%'),
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
        left: wp('-8%'),
        bottom: hp('1%'),
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        top: hp('3%'),
    },
    addCardContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: hp('3%'),
    },
    backgroundContainer: {
        flex: 1,
        // flexDirection: 'row',
        // position: 'absolute',
        top: hp('3%'),
        width: wp('100%'),
        height: hp('32%'),
        padding: hp('1%'),
        // justifyContent: 'center',
        backgroundColor: '#D3D3D3'
    },
    overCardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: hp('1%'),
        // backgroundColor: '#D3D3D3'
    },
    card: {
        flexDirection: 'row',
        marginBottom: hp('5%'),
    },
    addCard: {
        backgroundColor: '#f79e1b',
        borderRadius: 50,
        margin: wp('1%'),
        top: hp('3%'),
        width: wp('26%'),
        height: hp('13%'),
        marginBottom: hp('10%'),
        alignItems: 'center',
    },
    oversCard: {
        backgroundColor: 'orange',
        borderRadius: 15,
        // margin: wp('0.5%'),
        top: hp('2%'),
        width: wp('16%'),
        height: hp('8%'),
        marginLeft: wp('1%'),
        // marginBottom: hp('2%'),
        alignItems: 'center',
    },
    tossCard: {
        backgroundColor: '#E61717',
        borderRadius: 15,
        borderWidth: 4,
        margin: wp('1%'),
        padding: wp('1%'),
        top: hp('3%'),
        width: wp('31%'),
        height: hp('17%'),
        marginBottom: hp('6%'),
        alignItems: 'center',
    },
    overText: {
        fontSize: wp('4%'),
        fontFamily: 'SignikaNegative-Regular',
        color: 'black',
        textAlign: 'center',
        padding: wp('3%'),
    },
    tossText: {
        fontSize: wp('4%'),
        fontFamily: 'SignikaNegative-Regular',
        color: 'white',
    },
    AvsBIcon: {
        position: 'absolute',
    },
    cardIcon: {
        width: wp('90%'),
        height: wp('40%'),
        bottom: hp('2.3%'),
    },
    helmetIconContainer: {
        position: 'absolute',
        width: wp('8%'),
        height: wp('8%'),
        top: 0,
        left: 0,
        marginLeft: wp('4%'),
        backgroundColor: 'red',
        borderRadius: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    helmetIcon: {
        width: wp('6%'),
        height: wp('6%'),
        borderRadius: wp('3%'),
    },
    icon: {
        position: 'absolute',
        width: wp('10%'),
        height: wp('10%'),
        right: wp('1%'),
    },
    iconSearch: {
        position: 'absolute',
        width: wp('9%'),
        height: wp('9%'),
        right: wp('11%'),
        top: hp('1%'),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderRadius: 10,
        padding: wp('1%'),
        width: wp('90%'),
        borderColor: 'orange',
        marginBottom: hp('1.5%'),
        marginTop: hp('2%'),
    },
    inputIcon: {
        width: wp('9%'),
        height: wp('9%'),
        marginRight: wp('2%'),
    },
    input: {
        flex: 1,
        fontSize: wp('4.5%'),
        fontFamily: 'SignikaNegative-Regular',
        letterSpacing: wp('0.5%'),
        padding: wp('2%'),
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 18,
        padding: hp('2.5%'),
        width: wp('90%'),
        alignItems: 'center',
        marginTop: hp('6%')
    },
    buttonText: {
        fontSize: wp('7%'),
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: hp('3%'),
        borderRadius: 15,
        width: wp('85%'),
        height: hp('65%'),
    },
    modalHeader: {
        fontSize: wp('6%'),
        fontFamily: 'SignikaNegative-Bold',
        color: '#E61717',
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    teamName: {
        fontSize: wp('5.5%'),
        fontFamily: 'SignikaNegative-Bold',
        textAlign: 'center',
        marginBottom: hp('2%'),
        color: '#f79e1b'
    },
    selectionContainer: {
        marginBottom: hp('3%'),
    },
    selectionText: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Regular',
        marginBottom: hp('1%'),
        textAlign: 'center',
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: hp('2%'),
        marginVertical: hp('0.8%'),
        borderRadius: 10,
        alignItems: 'center',
    },
    optionText: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Regular',
        color: '#333',
    },
    nextButton: {
        backgroundColor: '#f79e1b',
        paddingVertical: hp('2%'),
        borderRadius: 10,
        alignItems: 'center',
        marginTop: hp('3%'),
    },
    nextButtonText: {
        fontSize: wp('6%'),
        fontFamily: 'SignikaNegative-Bold',
        color: 'white',
    },
    picker: {
        width: '100%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black',
    },
    radioButton: {
        width: wp('6%'),
        height: hp('3%'),
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10,
    },
    selectedButton: {
        borderColor: 'blue', // Highlight selected button
    },
    radioButtonText: {
        fontSize: 14,
        color: 'blue',
    },
});

export default ScoreboardStyle;
