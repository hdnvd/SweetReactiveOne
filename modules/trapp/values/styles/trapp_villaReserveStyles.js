import {Dimensions, StyleSheet} from 'react-native';
import Constants from '../../../../classes/Constants';

let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        factorItemContainer:{
            width:Window.width*0.94,backgroundColor:'#fff',borderRadius:10,flexDirection:'row-reverse',padding:Window.height*0.01,
            marginVertical: 7,
            marginHorizontal: Window.width*0.03,
            borderWidth:2,
            borderColor:Constants.BaseColor,
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
        factorItemCount:{

            flex:1,
            fontFamily:Constants.BaseFontName,
        },
        factorItemPrice:{

            flex:1,
            fontFamily:Constants.BaseFontName,
        },
        factorItemTextBoxContainer:
            {
                flex:1,
                flexDirection: 'row-reverse',
            },
        factorItemTextBoxTitle:
            {
                fontFamily:Constants.BaseFontName,
            },
        factorItemTextBox:
            {
                borderRadius:5,
                padding:0,
                paddingHorizontal:4,
                textAlign:'center',
                marginHorizontal:2,
                borderWidth:1,
                borderColor:Constants.BaseColor,
                fontFamily:Constants.BaseFontName,
            }
    }
);
