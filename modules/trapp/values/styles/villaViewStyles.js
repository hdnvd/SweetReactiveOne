import {Dimensions, StyleSheet, View} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import Localization from '../../../../classes/Localization';
import Constants from '../../../../classes/Constants';
import React from 'react';

let BaseColor = Constants.BaseColor;
let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        commentEditText:
            {
                fontFamily: Constants.BaseFontName,
                width:'100%',
                direction: 'rtl',
                textAlign: 'right',
            },
        tabViewTopBar:
            {
                width: '100%',
                backgroundColor: Constants.BaseColor,
                height: Window.height * 0.07,
                flexDirection: 'row-reverse',
                justifyContent: 'center',
                alignItems: 'center',
            },
        tabViewTopBarItem:
            {
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },

        tabViewTopBarItemText:
            {
                color: '#fff',
                textAlign: 'center',
                fontFamily: Constants.BaseFontName,
            },
        tabViewTopBarItemActiveBar:
            {
                width: '100%',
                backgroundColor: '#ff0',
                height: 5,
                alignSelf:'flex-end',
                position:'absolute',
                bottom:0,
            },

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
                width: Window.width * 0.4,
                marginHorizontal: Window.width * 0.05,
            },

        ButtonFullComment:
            {
                ...StyleSheet.flatten(generalStyles.SweetButton), backgroundColor: '#60c62b',
                borderWidth: 1,
                borderColor: '#000000',
                width: Window.width * 0.9,
                marginHorizontal: Window.width * 0.05,
            },
        Button3:
            {
                ...StyleSheet.flatten(generalStyles.SweetButton),
                backgroundColor: '#317c0a',
                borderWidth: 1,
                borderColor: '#000000',
                width: Window.width * 0.4,
                marginHorizontal: Window.width * 0.05,
            },
        viewBox:
            {
                ...StyleSheet.flatten(generalStyles.viewBox),
                position: 'relative',
                zIndex: 3,
            },
        viewBoxStyle:
            {
                position: 'relative',
                zIndex: 3,
            },
        footer:
            {
                width: '100%',
                flexDirection: Localization.getRowReverseDirection(),
                position: 'absolute',
                height: StyleSheet.flatten(generalStyles.SweetButton).height + 5,
                bottom: 5,
                zIndex: 3,
            },

    },
);
