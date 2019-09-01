import React, {Component} from 'react';
import {BackHandler, Dimensions, StyleSheet} from 'react-native';
import {NavigationState} from 'react-navigation'
import generalStyles from '../../styles/generalStyles';
import HeaderSize from '../../classes/HeaderSize';

export default class SweetPage extends Component<{}> {
    componentWillUnmount() {
        this.removeBackHandler();
    }
    componentDidMount() {
        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
        //     console.log('getting back');
        //     return false;
        // });
    }
    removeBackHandler(){

        if(this.backHandler!=null)
            this.backHandler.remove();
    }

    getActiveRouteState(route) {
        if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
            return route;
        }

        const childActiveRoute = route.routes[route.index];
        return this.getActiveRouteState(childActiveRoute);
    }
    getManagementPageHeight=()=>{
        let Window = Dimensions.get('window');
        return '100%'-(StyleSheet.flatten(generalStyles.actionButtonContainer).height+HeaderSize.getHeaderHeight()+10);
    };

}
