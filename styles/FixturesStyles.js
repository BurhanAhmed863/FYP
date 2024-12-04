import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FixturesStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'), // Responsive padding
    },
    stageHeader: {
        fontSize: wp('6%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold', // Custom font for bold text
        letterSpacing: wp('0.2%'), // Adds subtle spacing between letters
        marginHorizontal: wp('2%'), // Responsive margin
        marginVertical: hp('2%'), // Vertical spacing
        textTransform: 'uppercase', // Uppercase text for emphasis
    },
    matchCard: {
        marginHorizontal: wp('3%'), // Responsive horizontal margin
        marginVertical: hp('1%'), // Responsive vertical margin
        borderRadius: wp('3%'), // Rounded corners
        padding: wp('4%'), // Padding inside the card
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: wp('1.5%'), // Shadow blur for iOS
        backgroundColor: '#FFF', // Ensure a default card background
    },
    pointsTableContainer:{
        marginBottom: hp('4%'),
        borderBottomWidth: 5,
        borderColor: 'red',
        borderRadius: 18
    },
    matchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', // Allow content to wrap within the row
    },
    matchIcon: {
        width: wp('12%'), // Responsive width for icon
        height: wp('12%'), // Responsive height for icon
        marginRight: wp('3%'), // Space between icon and text
        resizeMode: 'contain', // Ensures the icon scales properly
    },
    teamText: {
        fontSize: wp('4.5%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold', // Custom font
        color: '#000', // Default text color
        // flex: 1, // Take available space to prevent overflow
        flexWrap: 'wrap', // Wrap text within the container
    },
    matchDetails: {
        fontSize: wp('3.5%'), // Responsive font size
        marginTop: hp('0.5%'), // Slight spacing from the team text
        fontFamily: 'SignikaNegative-Regular', // Subtle custom font
        color: '#666', // Subtle color for additional match details
        flexWrap: 'wrap', // Ensure details wrap to fit within the card
    },
    dateHeader: {
        fontSize: wp('5%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold', // Custom font for bold text
        color: '#333', // Default text color
        marginHorizontal: wp('2%'), // Horizontal margin
        marginVertical: hp('1.5%'), // Vertical spacing
    },
    finalsHeader: {
        fontSize: wp('6%'), // Slightly larger font for finals or major stages
        fontFamily: 'SignikaNegative-Bold', // Bold custom font
        color: '#FF8C00', // Highlighted text color
        textAlign: 'center', // Center the header
        marginVertical: hp('2%'), // Vertical spacing
    },
});

export default FixturesStyles;
