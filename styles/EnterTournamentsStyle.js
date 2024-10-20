// src/styles/loginStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Importing the library functions

const EnterTournamentsStyle = StyleSheet.create({
    
    speedIconContainer: {
        position: 'absolute',  // Position the icon absolutely
        top: wp('2.5%'),         // Adjust the distance from the top
        right: wp('2%'),        // Adjust the distance from the left
    },
    settingIconContainer: {
        position: 'absolute',  // Position the icon absolutely
        bottom: wp('2.5%'),         // Adjust the distance from the top
        right: wp('2%'),        // Adjust the distance from the left
    },
    speedCardContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('1%'), // Responsive margin
        alignContent: 'center',
        justifyContent: 'center'
        // padding: wp()
    },
    statsCard: {
        backgroundColor: '#000000', // Blue color for the button
        borderRadius: 18,
        margin: wp('1%'),
        marginBottom: hp('3%'),
        // right: wp('23%'),
        // padding: hp('2.5%'), // Responsive padding
        width: wp('35%'), // Responsive width
        height: hp('17%'), // Responsive width
        alignItems: 'center',
    },
    cardTxt: {
        position: 'absolute',
        top: wp('2%'), // Position the text from the top
        left: wp('3.8%'), // Position the text from the left
        textAlign: 'left', // Align text to the left
        fontSize: wp('7%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.2%'), // Responsive
    },
    speedCardTxt: {
        position: 'absolute',
        top: wp('1%'), // Position the text from the top
        left: wp('4%'), // Position the text from the left
        textAlign: 'left', // Align text to the left
        fontSize: wp('5%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',

    },
    tText:{
        fontSize: wp('7%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        color: 'orange',
        top: hp('1%'),
        textAlign: 'center'
    },
    statsCardTxt: {
        // position: 'absolute',
        top: hp('4.5%'), // Position the text from the top
        padding: wp('2%'),
        textAlign: 'center', // Align text to the left
        fontSize: wp('5%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Regular',

        letterSpacing: wp('0.3%'), // Responsive
    },
    speedCardTxt2: {
        position: 'absolute',
        top: wp('7%'), // Position the text from the top
        left: wp('4%'), // Position the text from the left
        marginRight: hp('5%'), // Position the text from the
        textAlign: 'left', // Align text to the left
        fontSize: wp('3.5%'),
        fontFamily: 'SignikaNegative-Regular',
        letterSpacing: wp('0.2%'), // Responsive
    },
    speedCardTxt3: {
        position: 'absolute',
        bottom: wp('6%'), // Position the text from the top
        textAlign: 'center', // Align text to the left
        fontSize: wp('17%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.2%'), // Responsive
    },
    speedCardTxt4: {
        position: 'absolute',
        bottom: wp('11%'), // Position the text from the top
        textAlign: 'center', // Align text to the left
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        fontSize: wp('3%'),
    }
});

export default EnterTournamentsStyle;
