// src/styles/loginStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Importing the library functions

const EnterPlayersStyle = StyleSheet.create({
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
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: hp('3%'), // Responsive margin
    },
    card: {
        borderRadius: 25,
        padding: hp('2.5%'), // Responsive padding
        width: wp('90%'), // Responsive width
        height: hp('15%'), // Responsive width
        alignItems: 'center',
        marginBottom: hp("5%")
    },
    AvsBIcon: {
        position: "absolute",
    },
    cardIcon: {
        width: wp('90%'), // Responsive width for icon
        height: wp('40%'), // Responsive height for icon
        bottom: hp('2.3%')
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
        marginBottom: hp('1%'),
    },
    inputIcon: {
        width: wp('9%'), // Responsive width for icon
        height: wp('9%'), // Responsive height for icon
    },
    input: {
        flex: 1,
        fontFamily: 'SignikaNegative-Regular',
        fontSize: wp('4.5%'), // Responsive font size
        letterSpacing: wp('0.5%'), // Responsive
        padding: wp('2%'), // Responsive padding
    },
    button: {
        backgroundColor: 'red', // Blue color for the button
        marginTop: hp('2%'),
        borderRadius: 18,
        padding: hp('2.5%'), // Responsive padding
        width: wp('90%'), // Responsive width
        alignItems: 'center',
    },
    buttonText: {
        fontSize: wp('7%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold',
        // fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default EnterPlayersStyle;
