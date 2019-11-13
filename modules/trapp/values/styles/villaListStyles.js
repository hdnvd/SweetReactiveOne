import {Dimensions, StyleSheet} from 'react-native';
import Localization from '../../../../classes/Localization';

let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        starstyle:
            {
                height: 20,
                width: 20,
                marginHorizontal:3,
            },
        starBox:
            {
              // alignSelf:'flex-end',
                width:Window.width*0.40,
                alignItems:'center',
                justifyContent:'center',
                position: 'absolute',
                top:30+Window.width*0.40+10,
                right:10,
            },
        ItemLogo:
            {
                height: Window.width * 0.05,
                width: Window.width * 0.05,
                marginHorizontal: Window.width * 0.01,
                position: 'relative',
                right: 0,
            },
        itemTopBar:
            {
                flexDirection: Localization.getRowDirection(),
                width: '100%',
                height: Window.width * 0.15,

            },
        itemTopBarItem:
            {
                width: Window.width * 0.15,
                height: Window.width * 0.1,
            },
        itemTopBarItemLogo:
            {
                width: Window.width * 0.1,
                height: Window.width * 0.1,
            },
        itemTopBarItemContent:
            {
                fontSize: 10,
                fontFamily: 'IRANSansMobile',
                textAlign: 'center',
                width: Window.width * 0.1,
            },
    }
);
