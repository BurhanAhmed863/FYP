// src/styles/loginStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Importing the library functions

const DashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'), // Responsive padding
    },
    header: {
        flexDirection: 'row',
        marginTop: hp('5%'), // Responsive margin
    },
    progressbar: {
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 20,
        top: wp('19%')
    },
    iconContainer: {
        position: 'absolute',  // Position the icon absolutely
        top: wp('4%'),         // Adjust the distance from the top
        right: wp('5%'),        // Adjust the distance from the left
    },
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
    centeredContent: {
        flex: 1,               // This will make the content center properly
        // justifyContent: 'center',
        alignItems: 'center',
        marginBottom: wp('10%')
    },
    title: {
        fontSize: wp('8%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.3%'),
        bottom: hp('0.7%'),
        marginBottom: hp('5%'), // Responsive margin
    },
    helloTxt: {
        fontSize: wp('7%'), // Responsive font size
        fontFamily: 'SignikaNegative-Regular',
        letterSpacing: wp('0.2%'), // Responsive
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
    speedCardContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: hp('3%'), // Responsive margin
    },
    card: {
        backgroundColor: '#f79e1b', // Blue color for the button
        borderRadius: 18,
        padding: hp('2.5%'), // Responsive padding
        width: wp('90%'), // Responsive width
        height: hp('30%'), // Responsive width
        alignItems: 'center',
    },
    speedCard: {
        backgroundColor: '#f79e1b', // Blue color for the button
        borderRadius: 18,
        margin: wp('1%'),
        // right: wp('23%'),
        // padding: hp('2.5%'), // Responsive padding
        width: wp('43%'), // Responsive width
        height: hp('28%'), // Responsive width
        alignItems: 'center',
    },
    statsCard: {
        backgroundColor: '#f79e1b', // Blue color for the button
        borderRadius: 18,
        margin: wp('1%'),
        // right: wp('23%'),
        // padding: hp('2.5%'), // Responsive padding
        width: wp('43%'), // Responsive width
        height: hp('14%'), // Responsive width
        alignItems: 'center',
    },
    cardTxt: {
        position: 'absolute',
        top: wp('2%'), // Position the text from the top
        left: wp('4%'), // Position the text from the left
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
    statsCardTxt: {
        position: 'absolute',
        top: wp('1%'), // Position the text from the top
        left: wp('4%'), // Position the text from the left
        textAlign: 'left', // Align text to the left
        fontSize: wp('5%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',

        letterSpacing: wp('0.3%'), // Responsive
    },
    cardTxt2: {
        position: 'absolute',
        top: wp('10%'), // Position the text from the top
        left: wp('4%'), // Position the text from the left
        textAlign: 'left', // Align text to the left
        fontSize: wp('3.5%'),
        fontFamily: 'SignikaNegative-Regular',

        letterSpacing: wp('0.2%'), // Responsive
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
    cardTxt3: {
        position: 'absolute',
        bottom: wp('15%'), // Position the text from the top
        left: wp('4%'), // Position the text from the left
        textAlign: 'left', // Align text to the left
        fontSize: wp('5%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
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
    cardTxt4: {
        position: 'absolute',
        bottom: wp('11%'), // Position the text from the top
        left: wp('4%'), // Position the text from the left
        textAlign: 'left', // Align text to the left
        fontSize: wp('3.5%'),
        fontFamily: 'SignikaNegative-Regular',
        letterSpacing: wp('0.2%'), // Responsive
    },
    speedCardTxt4: {
        position: 'absolute',
        bottom: wp('11%'), // Position the text from the top
        textAlign: 'center', // Align text to the left
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        fontSize: wp('3%'),
    },
    wicketIcon: {
        position: "absolute",
    },
    cardIcon: {
        position: "absolute",
        width: wp('40%'), // Responsive width for icon
        height: wp('40%'), // Responsive height for icon
        left: hp('3.5%'), // Position the icon from the right
        top: hp('10.4%'), // Position the icon from the top
    },
    cardIcon2: {
        position: "absolute",
        width: wp('40%'), // Responsive width for icon
        height: wp('40%'), // Responsive height for icon
        left: hp('5.5%'), // Position the icon from the right
        top: hp('10.4%'), // Position the icon from the top
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
    input: {
        flex: 1,
        fontSize: wp('4.5%'), // Responsive font size
        fontFamily: 'SignikaNegative-Regular',
        letterSpacing: wp('0.5%'), // Responsive
        padding: wp('2%'), // Responsive padding
    },

    buttonText: {
        fontSize: wp('7%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: 1,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Centers the text and link in the container
        marginTop: wp('3%'), // Adds some space above the link section
    },
    linktext: {
        fontSize: wp('4%'), // Responsive font size
        color: '#888888', // Default text color (change as needed)
    },
    linkbutton: {
        fontSize: wp('4%'), // Responsive font size
        // fontWeight: 'bold',
        fontFamily: 'SignikaNegative-Bold',
        color: '#EB001B', // Customize the link color (could be a prominent color like red)
        marginLeft: wp('1%'), // Space between "Don't have an account?" and the "Sign up" button
    },
});

export default DashboardStyles;
