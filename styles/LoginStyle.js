// src/styles/loginStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Importing the library functions

const LoginStyle = StyleSheet.create({
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
    marginRight: wp('65%'), // Responsive
    marginTop:hp('16%'),
    marginBottom: hp('10%'), // Responsive margin
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
    letterSpacing: wp('0.2%'), // Responsive
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
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers the text and link in the container
    marginTop: wp('3%'), // Adds some space above the link section
  },
  linktext: {
    fontSize: wp('4%'), // Responsive font size
    fontFamily: 'SignikaNegative-Regular',
    color: '#888888', // Default text color (change as needed)
  },
  linkbutton: {
    fontSize: wp('4%'), // Responsive font size
    // fontWeight: 'bold',
    fontFamily: 'SignikaNegative-Bold',
    color: '#EB001B', // Customize the link color (could be a prominent color like red)
    marginLeft: wp('1%'), // Space between "Don't have an account?" and the "Sign up" button
  },
  errorText:{
    fontSize: wp('4%'), // Responsive font size
    // position:'absolute',
    right:wp('18%'),
    bottom:hp('5%'),
    fontFamily: 'SignikaNegative-Regular',
    color: 'red', // Default text color (change as needed)
  },
});

export default LoginStyle;
