import Constants from "../../classes/Constants";
import {Dimensions} from 'react-native';

let Window = Dimensions.get('window');
export default {
    container: {
        paddingTop: 20,
        flex: 1,
    },
    navItemTextStyle: {
        direction: 'rtl',
        fontFamily: 'IRANSansMobile',
        // width: '100%',
    },
    navItemIconStyle:
        {
            marginTop: 3,
            marginHorizontal: 3,
            width:  Window.width*0.07,
            height:  Window.width*0.07,
        },
    navItemBarStyle: {
        padding: 10,
        flexDirection:'row-reverse',
        backgroundColor:'#ffffff',
        width: '100%',
        borderBottomColor: Constants.BaseColor,
        borderBottomWidth: 1
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
};
