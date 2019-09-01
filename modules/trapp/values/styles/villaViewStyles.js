import {Dimensions, StyleSheet} from "react-native";
import generalStyles from '../../../../styles/generalStyles';
import Localization from '../../../../classes/Localization';
import Constants from '../../../../classes/Constants';
let BaseColor=Constants.BaseColor;
let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        footerBar:
            {
                width: Window.width,
                height: StyleSheet.flatten(generalStyles.SweetButton).height,
                backgroundColor: '#b7fa94',
                position: 'absolute',
                zIndex: 2,
                bottom: 0,
            },
        BottomIcon1:
            {
                ...StyleSheet.flatten(generalStyles.IconItemStyle),
                marginVertical: 0,
                backgroundColor: 'rgba(0,55,0,1)',
            },
        BottomIcon2:
            {
                ...StyleSheet.flatten(generalStyles.IconItemStyle),
                backgroundColor: 'rgba(106,190,63,1)',
                marginVertical: 0,
            },
        BottomIcon3:
            {
                ...StyleSheet.flatten(generalStyles.IconItemStyle),
                backgroundColor: 'rgba(42,136,0,1)',
                marginVertical: 0,
            },
        Button1:
            {
                ...StyleSheet.flatten(generalStyles.SweetButton), backgroundColor: '#60c62b',
                borderWidth: 1,
                borderColor: '#000000',
                width:Window.width*0.4,
                marginHorizontal: Window.width*0.05,
            },
        Button3:
            {
                ...StyleSheet.flatten(generalStyles.SweetButton),
                backgroundColor: '#317c0a',
                borderWidth: 1,
                borderColor: '#000000',
                width:Window.width*0.4,
                marginHorizontal: Window.width*0.05,
            },
        viewBoxCaption:
            {
                ...StyleSheet.flatten(generalStyles.viewBoxCaption)
            },
        viewBox:
            {
                ...StyleSheet.flatten(generalStyles.viewBox),
                position:'relative',
                zIndex:3,
            },
        viewBoxLogo:
            {
                width:Window.width*0.1,
                height:Window.width*0.1,
            },
        viewBoxTitleBox:
            {
                width:'100%',
                alignItems: 'flex-end'
            },
        footer:
            {
                width:'100%',
                flexDirection:Localization.getRowReverseDirection(),
                position:'absolute',
                height:StyleSheet.flatten(generalStyles.SweetButton).height+5,
                bottom:5,
                zIndex:3,
            },
        defaultTopPhotoContainer:
            {
                width:'100%',
                height:Window.width*0.5,
                alignItems: 'center',

                justifyContent: 'center',
            },
        defaultTopPhoto:
            {
                width:Window.width*0.35,
                height:Window.width*0.35*0.756,
            }
    }
);
