import {Dimensions, StyleSheet} from 'react-native';
import Constants from '../../../../classes/Constants';

let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        factorItemContainer:{
            width:'90%',
            backgroundColor:'#fff',
            borderRadius:10,
            flexDirection:'row-reverse',
            padding:Window.height*0.01,
            marginVertical: 7,
            marginHorizontal: Window.width*0.03,
        },
        factorItemSwitch:
            {
                flex:0.5,
                fontFamily:Constants.BaseFontName,
            },
            factorItemTitle:{

                flex:1,
                fontFamily:Constants.BaseFontName,
            },
    }
);
