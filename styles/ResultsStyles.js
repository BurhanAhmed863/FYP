import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ResultsStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: '#FFF',
    },
    resultCard: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: wp('2%'),
        marginBottom: hp('2%'),
        // width: wp('90%'),
        // // height: hp
        borderRadius: 15
    },
    upperBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: hp('2%'),
    },
    dateSection: {
        flex: 1,
    },
    matchInfo: {
        alignItems: 'flex-end',
    },
    dateText: {
        fontSize: wp('4%'),
        color: '#FFF',
        fontFamily: 'SignikaNegative-Bold',
    },
    dayText: {
        fontSize: wp('3.5%'),
        color: '#FEC570',
        fontFamily: 'SignikaNegative-Regular',
    },
    matchNumberText: {
        fontSize: wp('3.5%'),
        color: '#FFF',
        fontFamily: 'SignikaNegative-Bold',
    },
    timeText: {
        fontSize: wp('3%'),
        color: '#FEC570',
        fontFamily: 'SignikaNegative-Regular',
    },
    finishedText: {
        color: '#FFF',
        fontSize: wp('3%'),
        fontFamily: 'SignikaNegative-Bold',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#FFF',
        marginVertical: hp('0.5%'),
    },
    matchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    teamSection: {
        alignItems: 'center',
    },
    matchIcon: {
        width: wp('12%'),
        height: wp('12%'),
        resizeMode: 'contain',
    },
    overText: {
        fontSize: wp('3.5%'),
        fontFamily: 'SignikaNegative-Regular',
        color: '#FFF',
        textAlign: 'center',
        flexDirection: 'column'
    },
    teamText: {
        fontSize: wp('4%'),
        fontFamily: 'SignikaNegative-Bold',
        color: '#FFF',
        textAlign: 'center',
    },
    statsText: {
        fontSize: wp('4.5%'),
        fontFamily: 'SignikaNegative-Bold',
        color: '#FFF',
    },
    vsText: {
        fontSize: wp('4%'),
        color: '#FFF',
        fontFamily: 'SignikaNegative-Regular',
    },
    resultText: {
        fontSize: wp('4.5%'),
        color: '#FEC570',
        fontFamily: 'SignikaNegative-Bold',
        textAlign: 'center',
        marginTop: hp('1%'),
    },
});

export default ResultsStyles;
