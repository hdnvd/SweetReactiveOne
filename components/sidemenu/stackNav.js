import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, TouchableOpacity
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

import {createStackNavigator} from 'react-navigation-stack';
import IOSIcon from "react-native-vector-icons/Ionicons";
import Splash from "../../pages/Splash";
import Login from "../../modules/users/pages/Login";
import placeman_placeManage from "../../modules/placeman/pages/place/placeman_placeManage";
import placeman_placeView from "../../modules/placeman/pages/place/placeman_placeView";
import placeman_placeList from "../../modules/placeman/pages/place/placeman_placeList";
import placeman_placePhotoManage from "../../modules/placeman/pages/placephoto/placeman_placephotoManage";

import sas_unitList from "../../modules/sas/pages/unit/sas_unitList";
import sas_unitManage from "../../modules/sas/pages/unit/sas_unitManage";
import MapPage from "../../pages/MapPage";
import posts__posts_postManage from "../../modules/posts/pages/post/posts_postManage";
import DisplayPlace from "../../pages/DisplayPlace";
import ManageBranch from "../../pages/ManageBranch";
import SelectLocation from "../../pages/SelectLocation";
import PlaceVerification from "../../pages/PlaceVerification";
import LogoTitle from "../LogoTitle";
import Common from "../../classes/Common";
import carserviceorderRoutes from '../../modules/carserviceorder/routes/carserviceorderRoutes';
import commentsRoutes from '../../modules/comments/routes/commentsRoutes';
import trappRoutes from '../../modules/trapp/routes/trappRoutes';
const navOptions =({navigation}) => {
    return {
        headerLeft: null,
        headerTitle: <LogoTitle onNavigationClick={() => {
            // alert("opening");
            navigation.dispatch(DrawerActions.openDrawer());
        }}/>
    };

};

const navOptionsWithNoMenu =({navigation}) => {
    return {
        gesturesEnabled: false,
        headerTitle: <LogoTitle hideMenu={true}/>
    };
};
const getNavOptionsMenuFromTitle=(title)=>
{
    return ({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={title} onNavigationClick={() => {
                // alert("opening");
                navigation.dispatch(DrawerActions.openDrawer());
            }}/>
        };

    }
};
const PageToRoute=(InitialRoute,theObject)=>
{
    let key, keys = Object.keys(theObject);
    let n = 0;
    let resultArray=InitialRoute;
    while (n<keys.length) {
        key = keys[n];
        if(theObject[key].screen!=null && theObject[key].screenTitle!=null)
            resultArray[key]={screen:theObject[key].screen,navigationOptions:getNavOptionsMenuFromTitle(theObject[key].screenTitle)};
        else
            resultArray[key]={screen:theObject[key],navigationOptions:navOptions};
        n++;
    }
    return resultArray;
};
let initialRouteWithNoMenu={
    Splash:{screen:Splash,navigationOptions:navOptionsWithNoMenu},
    Login:{screen:Login,navigationOptions:navOptionsWithNoMenu},
};
let initialRoute={
    placeman_placeManage: {screen:placeman_placeManage,navigationOptions:getNavOptionsMenuFromTitle('اطلاعات مکان ویلا')},
    placeman_placePhotoManage: {screen:placeman_placePhotoManage,navigationOptions:getNavOptionsMenuFromTitle('تصاویر ویلا')},
};
const Pages={
    placeman_placeView:  placeman_placeView,
    placeman_placeList:  placeman_placeList,
    sas_unitList:  sas_unitList,
    sas_unitManage: sas_unitManage,
    MapPage:  MapPage,
    posts__posts_postManage: posts__posts_postManage,
    DisplayPlace:  DisplayPlace,
    ManageBranch:  ManageBranch,
    SelectLocation:  SelectLocation,
};
var AllPages = Object.assign({}, Pages, carserviceorderRoutes,commentsRoutes,trappRoutes);
let Routes=PageToRoute(initialRoute,AllPages);
// console.log(Routes);
const LoginStack =createStackNavigator(initialRouteWithNoMenu);
const DrawerNavigation =createStackNavigator(Routes);
LoginStack.navigationOptions = ({ navigation }) => {
    let drawerLockMode = 'unlocked';
    console.log(navigation);
    if (navigation.state.index===0) {
        drawerLockMode = 'locked-closed';
    }

    return {
        drawerLockMode,
    };
};
const stackNav=createStackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerNavigation }
},{
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack'
});
export default stackNav;
