// src/styles/newScreenStyles.js
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PointsTableStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('4%'), // Responsive padding
    },
    header: {
        fontSize: wp('6%'), // Responsive font size
        fontFamily: 'SignikaNegative-Bold',
        textAlign: 'center',
        marginBottom: hp('2.5%'), // Responsive margin
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('1%'), // Responsive padding
        backgroundColor: '#333',
        borderRadius: wp('2%'), // Responsive border radius
        marginBottom: hp('1%'),
    },
    headerCell: {
        flex: 1,
        fontSize: wp('4%'), // Responsive font size
        color: '#FFF',
        fontFamily: 'SignikaNegative-Bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp('1.5%'),
        paddingHorizontal: wp('2%'),
        borderRadius: wp('2%'),
        marginBottom: hp('1%'),
    },
    cell: {
        flex: 1,
        fontSize: wp('4.5%'), // Responsive font size
        color: '#FFF',
        fontFamily: 'SignikaNegative-Regular',
        textAlign: 'center',
    },
});

export default PointsTableStyles;
