// src/styles/SignupStyle.js
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Importing the library functions

const SignupStyle = StyleSheet.create({
  scrollContainer:{
    flex:1,
  },
  container: {
    flex: 1,
    padding: wp('5%'), // Responsive padding
  },
  iconContainer: {
    position: 'absolute',  // Position the icon absolutely
    top: wp('10%'),         // Adjust the distance from the top
    left: wp('5%'),        // Adjust the distance from the left
  },
  centeredContent: {
    flex: 1,               // This will make the content center properly
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp('8%'), // Responsive font size
    fontFamily: 'SignikaNegative-Bold',
    // fontWeight: 'bold',
    letterSpacing: wp('0.4%'),
    marginRight: wp('50%'), // Responsive
    marginTop: hp('16%'), // Responsive margin
    marginBottom: hp('5%'), // Responsive margin
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: wp('1%'), // Responsive padding
    width: wp('90%'), // Responsive width
    marginBottom: hp('2.5%'), // Responsive margin
    borderColor: "orange",
    marginBottom: hp('5%')
  },
  icon: {
    width: wp('7%'), // Responsive width for icon
    height: wp('7%'), // Responsive height for icon
    marginRight: wp('2%'), // Responsive margin
  },
  input: {
    flex: 1,
    fontSize: wp('4.5%'), // Responsive font size
    fontFamily: 'SignikaNegative-Regular',
    letterSpacing: wp('0.3%'), // Responsive
    padding: wp('2%'), // Responsive padding
  },
  button: {
    backgroundColor: '#f79e1b', // Blue color for the button
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
  errorText:{
    fontSize: wp('4%'), // Responsive font size
    bottom: hp('4%'), // Space between input and error message
    color: 'red', // Default text color (change as needed)
    alignSelf: 'flex-start', // Align error messages to the left
    marginLeft: wp('10%'), // Align left with the input
  },
});

export default SignupStyle;
