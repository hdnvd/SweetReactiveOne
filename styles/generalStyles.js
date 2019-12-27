import {Dimensions, StyleSheet} from "react-native";
import Constants from "../classes/Constants";
import Localization from "../classes/Localization";
let BaseColor=Constants.BaseColor;
let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        actionButton:
            {
                width: '100%',
                height:'100%',
                backgroundColor: BaseColor,
            },
        actionButtonContainer:
            {
                marginTop:20,
                width: '100%',
                height:Window.width*0.13,
                justifyContent: 'flex-end',
            },
        topBar:
            {
                width: '100%',
                height: '100%',
                backgroundColor: BaseColor,
                alignItems: 'center',
                justifyContent: 'center'
            },
        listTopBar:
            {
                backgroundColor:'#ffffff',
                height:40,
                flexDirection:'row'
            },

        listTopBarItem:
            {
                width:Window.width/2,
                height:40,
                backgroundColor:'#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.4,
                borderColor: '#afafaf',
                flexDirection:'row',
            },
        listTopBarItemIcon:
            {
                width:20,
                height:20,
            },
        listTopBarItemButtonIcon:
            {
                width:15,
                height:15,
            },

        listTopBarItemButtonIconContainerSelected:
            {
                width:27,
                height:27,
                // backgroundColor:"#15be29",
                borderRadius:3,
                paddingHorizontal:4,
                paddingVertical:4,
                borderWidth: 2,
                borderColor: BaseColor,
                marginHorizontal:3,
            },
        listTopBarItemButtonIconContainer:
            {
                width:25,
                height:25,
                // backgroundColor:"#15be29",
                borderRadius:3,
                paddingHorizontal:4,
                paddingVertical:4,
                marginHorizontal:3,
            },
        listTopBarItemText:
            {

                direction: 'rtl',
                marginHorizontal:3,
                fontFamily: 'IRANSansMobile',
            },
        profilePicture:
            {
                position:'relative',
                right:0,
                width: Window.width/4,
                height: Window.width/3,
                borderRadius:15,
            },
        topimagelistitem:
            {
              width:Window.width,
                height:Window.width*0.7,
                paddingHorizontal:10,
                paddingVertical:10,
                backgroundColor:'#ffffff',
                shadowColor: "#1f1f1f",
                shadowOffset: {
                    width: 5,
                    height: 5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 2.22,

                elevation: 3,
                borderColor:BaseColor,
                borderBottomWidth:2,
            },
        topimagelistItemImage:
            {
                width:'100%',
                height:'100%',
            },
        marker:
            {
                width:10,
                height:10,
                marginVertical: 20,
            },
        drawerTopImage:
            {
                width:Window.width*0.4,
                height:Window.width*0.3,
            },
        photomanagephoto:
            {
                width: Window.width/2-Window.width/50,
                height: Window.width/2-Window.width/50,
                borderRadius: 10,
                zIndex:2,
            },
        photomanagedeleteicon:
            {
                width: Window.width/13,
                height:  Window.width/13,
            },
        photomanagedeleteiconcontainer:{
            width: Window.width/13,
            height:  Window.width/13,
            position: 'absolute',
            right:Window.width/35,
            top:Window.width/35,
            zIndex:3,
        },
        photomanagephotocontainer:
            {
                width: Window.width/2,
                height: Window.width/2,
                // backgroundColor:'#ee00ee',
                paddingVertical: Window.width/100,
                paddingHorizontal:Window.width/100,
            },
        input:
            {
                fontSize: 10,
                minHeight: 36,
                height: 41,
                textAlign: 'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '94%',
                marginHorizontal: '2%',
                backgroundColor: "#ffffff",
                borderRadius: 5,
                marginTop: '2%',
                borderWidth: 1,
                borderColor: BaseColor
            },
        inputLabel:
            {
                fontSize: 12,
                textAlign: 'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '94%',
                marginHorizontal: '2%',
                marginTop: '2%',
            },
        container:
            {
                flex: 1,
                flexGrow: 1,
                backgroundColor: "#fcfcfc",

            },
        containerWithNoBG:
            {
                flex: 1,
                flexGrow: 1,

            },
        mapContainer:
            {

                width:Window.width,
                height: Window.height / 3,
                paddingHorizontal:30,
                paddingVertical:30,
                backgroundColor:'#ffffff',
            },
        map:
            {
                width: '100%',
                height: '100%',
                borderRadius:20,
            },
        listcontainer: {

            flex: 1,
            flexGrow: 1,
        },
        text:
            {

                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'IRANSansMobile',
            },
        caption:
            {

                textAlign: 'right',
                fontSize: 13,
                fontWeight: '400',
                fontFamily: 'IRANSansMobile',
                color:'#232323',
            },
        content:
            {

                textAlign: 'right',
                fontSize: 13,
                fontFamily: 'IRANSansMobile',
                width: '85%',
                color:'#232323',
                justifyContent: 'center',
                alignItems: 'center',
                textAlignVertical:'center',
                flex: 1,
                // backgroundColor:'#ee000e',
            },
        topimage:
            {

                width: '100%',
                height: Window.height / 5,
            },
        row:
            {
                paddingHorizontal: 10,
                marginVertical:2,
                paddingVertical: 10,
                flexDirection: Localization.getRowReverseDirection(),
                width: '100%',
            },

        semiRow:
            {
                ...this.row,
                width: '50%',
            },
        saveButton:
            {
                borderRadius: 5,
                minHeight: 35,
                height: 35,
                width: '84%',
                marginHorizontal: '8%',
                backgroundColor: "#051841",
                alignSelf: 'center',
            },
        SweetButton:
            {
                borderRadius: 8,
                minHeight: 45,
                height: 45,
                width: Window.width * 0.50,
                marginHorizontal: '8%',
                marginVertical: 5,
                backgroundColor: "#051841",
                alignSelf: 'center',
            },
        SweetButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical: 'center',
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 13,
                color: '#ffffff',
                height: '100%'
            },
        SweetButtonWaitDialogContainer:
            {
                height: '100%'
            },
        SweetButtonWaitDialog:
            {
                // height:'100%',
                paddingVertical: 10,
            },
        saveButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical: 'center',
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 13,
                color: '#ffffff',
            },
        cautionContainer:
            {

                fontFamily: 'IRANSansMobile',
                paddingVertical: 10,
                paddingHorizontal: 10,
            },

        messageBarInfo:
            {
                width: '100%',
                height: '8%',
                backgroundColor: "#2779ee",
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        messageBarHidden:
            {
                width: 0,
                height: 0,
            },
        messageBarError:
            {
                width: '100%',
                height: '8%',
                backgroundColor: "#ee5e50",
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        messageBarSuccess:
            {
                width: '100%',
                height: '8%',
                backgroundColor: BaseColor,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        message:
            {
                color: "#ffffff",
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 13,
            },
        ListItem: {
            justifyContent: Localization.getFlexStart(),
            paddingTop: 30,
            flexDirection:Localization.getRowReverseDirection(),
            flexWrap:'wrap',
            paddingHorizontal: 10,
            borderRadius: 5,
            backgroundColor: "#ffffff",
            marginHorizontal:3,
            marginBottom:10,
            shadowColor: "#565656",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        simplelabel:
            {
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                textAlign: 'right',
            },
        listitemthumbnail:
        Localization.isPhoneRTL()?{
            width: Window.width*0.40,
                height: Window.width*0.40,
            aspectRatio: 1,
            position: 'absolute',
            borderRadius: 20,
            left:10,
            top:30,
            borderWidth: 2,
            borderColor: BaseColor,
        }:
            {
                width: Window.width*0.40,
                height: Window.width*0.40,
                aspectRatio: 1,
                position: 'absolute',
                borderRadius: 20,
                right:10,
                top:30,
                borderWidth: 2,
                borderColor:BaseColor,
            },
        searchbar:
            {},
        searchbarinput:
            {
                fontSize: 12,
                minHeight: 36,
                height: 36,
                textAlign: 'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '100%',
                backgroundColor: "#ffffff",
            },
        select:
            {
                lineHeight: 40,
                fontSize: 17,
                minHeight: 40,
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                width: '100%',
                height: 50,
                color: '#000000',
            },
        pickerItem:
            {
                color: "#ffffff",
                fontFamily: 'IRANSansMobile',
            },
        pickerText:
            {
                color: '#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 20,

            },
        IconItemStyle:
            {
                width:Window.width/5,
                height:Window.width/5,
                backgroundColor:'rgba(167,236,131,0.8)',
                borderRadius:Window.width/10,
                marginVertical:Window.width*0.02,
                marginHorizontal:Window.width/17,
                paddingHorizontal:Window.width/25,
                paddingVertical:Window.width/25,
                shadowColor: "#232323",
                shadowOffset: {
                    width: -3,
                    height: 4,
                },
                shadowOpacity: 0.9,
                shadowRadius: 2.22,
            },
        IconItemLogo:
            {
                width:Window.width*0.09,
                height:Window.width*0.09,
                marginHorizontal:Window.width*0.015,

            },
        IconItemContent:
            {
                color: '#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 10,
            },
        IconItemTitle:
            {
                color: '#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 10,
            },
        datepickercontainer:
            {
                // maxHeight: Window.height*0.4,
                // height:Window.height*0.4,
                backgroundColor: '#ffffff',
                borderRadius:10,
                padding: 20,
                marginVertical: 7,
                marginHorizontal: 7,
                borderWidth:2,
                borderColor:BaseColor,
            },fulldatecontainer:
            {
                backgroundColor:'#ee0'
            },
        datepickertext:
            {
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
            },
        datepickerCustom:
            {
                backgroundColor:'#ffffff',
                color:"#ff0000",
            },
        selectedStartDate:
            {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderRadius:0,
                fontFamily: 'IRANSansMobile',
            },
        selectedEndDate:
            {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor:'#ee796f',
                borderRadius:0,
                fontFamily: 'IRANSansMobile',
            },
        ItemLogo:
            {
                width:'100%',
                height:'100%',
            },
        itemLogoContainerStyle:
            {

                height: Window.width*0.08,
                width: Window.width*0.08,
                marginHorizontal:Window.width*0.01,
                position: 'relative',
                right: 0,
                backgroundColor:'#ffffff',
            },
        viewBoxCaption:
            {
                color: BaseColor,
                textAlign: 'right',
                fontSize: 13,
                fontFamily: 'IRANSansMobile',
                // width: '100%',
                marginBottom: 10,
            },
        viewBox:
            {
                width: Window.width - 20,
                justifyContent: Localization.getFlexStart(),
                paddingTop: 10,
                flexDirection: Localization.getRowReverseDirection(),
                flexWrap: 'wrap',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 5,
                marginHorizontal: 10,
                marginTop: 10,
                backgroundColor: '#ffffff',
                shadowColor: "#565656",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
            },
        searchTitleTopBar:
            {
                width:'100%',
                height:40,
                borderBottomWidth: 0.4,
                borderColor: '#afafaf',
                justifyContent:'center',
                flexDirection:'row'
            },
        searchTitleTopBarText:
            {
                width:'100%',
                height:'100%',
                fontSize: 15,
                justifyContent:'center',
                marginTop:5,
                fontFamily: 'IRANSansMobile',
                textAlign:'center',
            },
        searchTitleTopBarCancelIcon:
            {
                width:18,
                height:18,
            },
        searchTitleTopBarCancelIconContainer:
            {
                width:50,
                height:25,
                position:'absolute',
                left: 15,
                top:10
            },
        viewBoxLogo:
            {
                width:Window.width*0.1,
                height:Window.width*0.1,
            },
        viewBoxTitleBox:
            {
                width:'100%',
                justifyContent: 'flex-start',
                alignContent:'center',
                // backgroundColor:"#ee0",
                flexDirection:'row',
            },
    },

);
