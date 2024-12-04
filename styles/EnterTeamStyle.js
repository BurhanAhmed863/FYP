import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EnterTeamStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'), // Responsive padding
    },
    header: {
        flexDirection: 'row',
        marginTop: hp('2%'), // Responsive margin
    },
    iconContainer: {
        position: 'absolute', // Position the icon absolutely
        top: wp('2.2%'), // Adjust the distance from the top
    },
    addIconContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    centeredContent: {
        flex: 1,
        alignItems: 'center',
        marginBottom: wp('10%'),
    },
    title: {
        fontSize: wp('8%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.3%'),
        left: wp('7%'), // Responsive
        bottom: hp('0.3%'),
        marginBottom: hp('5%'), // Responsive margin
    },
    welTxt: {
        fontSize: wp('7%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: wp('0.2%'), // Responsive
    },
    modalImage: {
        width: wp('20%'),
        height: hp('10%'),
        borderRadius: wp('15%'),
        bottom: hp('2%')
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
        marginBottom: hp('5%'),
    },
    AvsBIcon: {
        position: 'absolute',
    },
    cardIcon: {
        width: wp('90%'), // Responsive width for icon
        height: wp('40%'), // Responsive height for icon
        bottom: hp('2.3%'),
    },
    icon: {
        position: 'absolute',
        width: wp('10%'), // Responsive width for icon
        height: wp('10%'), // Responsive height for icon
        right: wp('1%'), // Position the icon from the right
    },
    iconSearch: {
        position: 'absolute',
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
        borderColor: 'orange',
        marginBottom: hp('4%'),
    },
    inputIcon: {
        width: wp('9%'), // Responsive width for icon
        height: wp('9%'), // Responsive height for icon
        marginRight: wp('2%'), // Responsive margin
        borderRadius: 20,
    },
    input: {
        flex: 1,
        fontSize: wp('4.5%'), // Responsive font size
        fontFamily: 'SignikaNegative-Regular',
        color: 'black',
        letterSpacing: wp('0.5%'), // Responsive
        padding: wp('2%'), // Responsive padding
    },
    playerRole: {
        fontSize: wp('4.5%'), // Responsive font size
        fontFamily: 'SignikaNegative-Regular',
        color: 'black',
        letterSpacing: wp('0.5%'), // Responsive
        padding: wp('2%'), // Responsive padding
    },
    bottomButtonContainer: {
        // top: hp('2%'), // Space above the buttons
        // paddingBottom: 20, // Space below the buttons
        alignItems: 'center', // Center the buttons horizontally
        justifyContent: 'flex-end', // Align buttons at the bottom of the screen
    },    
    button: {
        backgroundColor: 'red', // Red color for the button
        borderRadius: 18,
        padding: hp('2.5%'), // Responsive padding
        width: wp('90%'), // Responsive width
        alignItems: 'center',
        marginBottom: hp('3%')
    },
    buttonText: {
        fontSize: wp('7%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold',
        letterSpacing: 1,
    },
    // Popup styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: wp('80%'),
        padding: wp('5%'),
        backgroundColor: 'white', // White background for popup
        borderRadius: 10,
        alignItems: 'center',
    },
    inputTitle: {
        fontSize: wp('6%'),
        fontFamily: 'SignikaNegative-Bold',
        marginBottom: hp('2%'),
        color: 'black', // Black text color
        right: wp('20%')
    },
    modalTitleContainer: { // Black text color
        backgroundColor: '#F7A01F',
        // flex:0,
        bottom: hp('2.5%'),
        borderRadius: wp('2%'),
        width: wp('80%'),
        height: hp('5%'),
        alignContent: 'center',
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: wp('6%'),
        fontFamily: 'SignikaNegative-Bold',
        textAlign: 'center',
    },
    modalInput: {
        width: wp('70%'),
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: wp('2%'),
        fontSize: wp('4.5%'),
        fontFamily: 'SignikaNegative-Regular',
        color: 'black', // Black text color
        marginBottom: hp('2%'),
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: hp('2%'),
    },
    modalButtonContainerOptions: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: hp('2%'),
    },
    modalButtonOptions: {
        // flex: 1,
        marginVertical: hp('0.3%'),
        padding: hp('1.5%'),
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        flex: 1,
        marginHorizontal: wp('2%'),
        padding: hp('1.5%'),
        borderRadius: 10,
        alignItems: 'center',
    },
    modalCameraButton: {
        marginHorizontal: wp('2%'),
        padding: hp('1.5%'),
        // borderRadius: 10,
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Bold',
        color: 'white', // White text color for button text
    },
    playerTypeButton: {
        paddingVertical: wp('3%'),
        width: wp('70%'),
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginTop: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    playerTypeText: {
        fontSize: wp('5%'),
        color: 'black',
        fontFamily: 'SignikaNegative-Regular',
    },
    modalOptionButton: {
        padding: wp('3%'),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: wp('5%'),
        color: 'black',
        fontFamily: 'SignikaNegative-Regular',
    },
    dropdownContainer: {
        marginTop: hp('35%'),
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: 200,
        position: 'absolute', // Position the dropdown below the button
        top: 60,
        zIndex: 1,
      },
      dropdownOption: {
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('5%'),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      dropdownText: {
        fontSize: wp('5%'),
        fontFamily: 'SignikaNegative-Regular',
        color: 'black',
      },
});

export default EnterTeamStyle;
