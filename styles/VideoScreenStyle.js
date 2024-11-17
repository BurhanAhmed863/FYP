import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const VideoScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    controlsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: wp('2%'), // 2% of screen width
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: wp('2%'), // 2% of screen width
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        right: 50
    },
    distanceLabel: {
        color: 'white',
        fontFamily: 'SignikaNegative-Bold',
        fontSize: hp('2%'), // 2% of screen height
    },
    distanceInput: {
        color: 'white',
        fontSize: hp('2%'),
        fontFamily: 'SignikaNegative-Regular',
        marginHorizontal: 5
    },
    distanceUnit: {
        color: 'white',
        fontSize: hp('2%'), // 2% of screen height
        fontFamily: 'SignikaNegative-Bold',
    },
    button: {
        padding: wp('1.5%'), // 2% of screen width
        backgroundColor: 'orange',
        borderRadius: 5,
    },
    Calbutton: {
        top: hp('7%'),
        height: hp('6%'), 
        justifyContent: 'center',
        padding: wp('1.5%'), // 2% of screen width
        backgroundColor: 'red',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'SignikaNegative-Bold',
        textAlign: 'center',
        fontSize: hp('1.7%'), // 2% of screen height
    },
    video: {
        width: '100%', // Full width
        height: '100%', // Full height
    },
    controls: {
        flexDirection: 'column', // Change this to column
        // alignItems: 'center', // Center items vertically
        // justifyContent: 'center', // Center items horizontally
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for visibility
    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: hp('2%'), // 2% of screen height
    },
    speedText: {
        textAlign: 'center',
        color: 'white',
        fontSize: hp('2%'), // 2% of screen height
        marginTop: hp('2%'), // 2% of screen height
    },
    modalContainer:{
        alignContent: 'center',
        justifyContent: 'center'
    },
    modalContent:{
        // backgroundColor: 'red'
    }
});

export default VideoScreenStyle;
