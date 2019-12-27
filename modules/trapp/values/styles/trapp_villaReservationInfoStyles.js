import {Dimensions, StyleSheet} from 'react-native';
import Constants from '../../../../classes/Constants';
import generalStyles from '../../../../styles/generalStyles';

let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        itemLeft: {
            width: Window.width * 0.3,
            height: '100%',
            backgroundColor: '#90e600',
            alignSelf: 'flex-end',
            left: 0,
        },
        itemLeftOwner: {
            width: Window.width * 0.3,
            height: '100%',
            backgroundColor: '#73adff',
            alignSelf: 'flex-end',
            left: 0,
        },
        itemRight: {
            width: Window.width * 0.6,
            alignSelf: 'flex-start',
            left: 0,
        },
        datepickerByUser:
            {
                color: '#90e600',
                fontWeight: '700',
                backgroundColor: "#ffffff",
            },
        datepickerByOwner:
            {
                color: '#2f81ff',
                fontWeight: '700',
                backgroundColor: "#ffffff",
            },
        grouptitle:
            {
                fontFamily:Constants.BaseFontName,
                backgroundColor:Constants.BaseColor,
                color:'#fff',
                textAlign:'center',
                width:'100%',
            },
        villaInfo:
            {
                width:'100%',
            },
        simplelabel:
            {
                fontFamily:Constants.BaseFontName,
                width:'100%',
                paddingHorizontal:10,
                paddingVertical:5,
                borderBottomWidth:1,
                borderBottomColor:'#eee',
            },
        button:
            {
                backgroundColor:Constants.BaseColor,
                fontFamily:Constants.BaseFontName,
                color:'#fff',
                height:Window.height*0.06,
                width:'50%',
                borderRadius:10,
                alignSelf:'center',
            },
        itemLeftTitle:{
            ...StyleSheet.flatten(generalStyles.simplelabel),
            width: '100%',
            fontSize: 10,
            textAlign: 'center',
        },
        itemLeftContent:{
            ...StyleSheet.flatten(generalStyles.simplelabel),
            width: '100%',
            fontSize: 20,
            textAlign: 'center',
        },
    }
);
