// src/styles/loginStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Importing the library functions

const SpeedHistoryStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'), // Responsive padding
    },
    header: {
        flexDirection: 'row',
        marginTop: hp('2%'), // Responsive margin
    },
    iconContainer: {
        position: 'absolute',  // Position the icon absolutely
        top: wp('2.2%'),         // Adjust the distance from the top
        // right: wp('1%'),        // Adjust the distance from the left
    },
    addIconContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    centeredContent: {
        flex: 1,               // This will make the content center properly
        // justifyContent: 'center',
        alignItems: 'center',
        marginBottom: wp('10%')
    },
    title: {
        fontSize: wp('8%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.3%'),
        left: wp('7%'), // Responsive
        bottom: hp('0.3%'),
        marginBottom: hp('5%'), // Responsive margin
    },
    welTxt: {
        fontSize: wp('7%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.2%'), // Responsive
    },
    overHeader: {
        fontSize: wp('5.5%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        top: hp('2.5%'),
        letterSpacing: wp('0.2%'), // Responsive
    },
    addTxt: {
        position: 'absolute',
        fontSize: wp('7%'), // Responsive font size
        // fontWeight:'bold',
        fontFamily: 'SignikaNegative-Bold',
        left: wp('-18%'),
        top: hp('17%'),
    },
    speedText: {
        fontSize: wp('6%'), 
        left: wp('6%'),
        top: hp('2%'),
        fontFamily: 'SignikaNegative-Bold',
        color: 'white',
    },
    line: {
        width: wp('70%'),
        borderWidth: 2,
        borderRadius: 2
    },
    historyTxt: {
        position: 'absolute',
        fontSize: wp('7%'), // Responsive font size
        // fontWeight:'bold',
        position: 'absolute',
        fontFamily: 'SignikaNegative-Bold',
        left: wp('-7%'),
        bottom: hp('1%'),
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: hp('3%'), // Responsive margin
    },
    addCardContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: hp('3%'), // Responsive margin
    },
    overCardContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    card: {
        backgroundColor: '#f79e1b', // Blue color for the button
        borderRadius: 25,
        padding: hp('1%'), // Responsive padding
        width: wp('90%'), // Responsive width
        height: hp('15%'), // Responsive width
        // alignItems: 'left',
    },
    addCard: {
        backgroundColor: '#f79e1b', // Blue color for the button
        borderRadius: 20,
        margin: wp('1%'),
        top: hp('3%'),
        width: wp('90%'), // Responsive width
        height: hp('20%'), // Responsive width
        marginBottom: hp('10%'),
        alignItems: 'center',
    },
    oversCard: {
        backgroundColor: '#E61717', // Blue color for the button
        borderRadius: 15,
        margin: wp('0.5%'),
        borderWidth: 4,
        top: hp('3%'),
        width: wp('16.7%'), // Responsive width
        height: hp('8.5%'), // Responsive width
        marginBottom: hp('6%'),
        alignItems: 'center',
    },
    tossCard: {
        backgroundColor: '#E61717', // Blue color for the button
        borderRadius: 15,
        borderWidth: 4,
        margin: wp('1%'),
        padding: wp('1%'),
        top: hp('3%'),
        width: wp('31%'), // Responsive width
        height: hp('17%'), // Responsive width
        marginBottom: hp('2%'),
        alignItems: 'center',
    },
    battingCard: {
        backgroundColor: '#E61717', // Blue color for the button
        borderRadius: 15,
        borderWidth: 4,
        margin: wp('1%'),
        padding: wp('1%'),
        top: hp('3%'),
        width: wp('27%'), // Responsive width
        height: hp('12%'), // Responsive width
        marginBottom: hp('6%'),
        alignItems: 'center',
    },
    overText: {
        fontSize: wp('7%'),
        fontFamily: 'SignikaNegative-Regular',
        color: 'white'
    },
    tossText: {
        fontSize: wp('4%'),
        fontFamily: 'SignikaNegative-Regular',
        color: 'white'
    },
    AvsBIcon: {
        position: "absolute",
    },
    wicketIcon: {
        // position: "absolute",
    },
    cardIcon: {
        // position: "absolute",
        width: wp('35%'), // Responsive width for icon
        height: wp('30%'), // Responsive height for icon
        left: hp('27%'), // Position the icon from the right
        bottom: hp('9%'), // Position the icon from the top
    },
    icon: {
        position: "absolute",
        width: wp('10%'), // Responsive width for icon
        height: wp('10%'), // Responsive height for icon
        right: wp('1%'), // Position the icon from the right
    },
    iconSearch: {
        position: "absolute",
        width: wp('9%'), // Responsive width for icon
        height: wp('9%'), // Responsive height for icon
        right: wp('11%'), // Position the icon from the right
        top: hp('1%'), // Position the icon from the top
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderRadius: 10,
        padding: wp('1%'), // Responsive padding
        width: wp('90%'), // Responsive width
        borderColor: "orange",
        marginBottom: hp('1.5%'),
        marginTop: hp('2%')
    },
    inputIcon: {
        width: wp('9%'), // Responsive width for icon
        height: wp('9%'), // Responsive height for icon
        marginRight: wp('2%'), // Responsive margin
    },
    input: {
        flex: 1,
        fontSize: wp('4.5%'), // Responsive font size
        fontFamily: 'SignikaNegative-Regular',
        letterSpacing: wp('0.5%'), // Responsive
        padding: wp('2%'), // Responsive padding
    },
    button: {
        backgroundColor: 'red', // Blue color for the button
        borderRadius: 18,
        padding: hp('2.5%'), // Responsive padding
        width: wp('90%'), // Responsive width
        alignItems: 'center',
    },
    buttonText: {
        fontSize: wp('7%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: 1,
    },
});

export default SpeedHistoryStyle;
