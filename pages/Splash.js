/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Image} from 'react-native';
import LogoTitle from "../components/LogoTitle";
import Navigation from "../classes/navigation";
import Constants from "../classes/Constants";
import SweetFetcher from '../classes/sweet-fetcher';
import UserNavigator from '../modules/users/classes/UserNavigator';

export default class Splash extends Component<{}> {

    static navigationOptions = {
        headerTitle: <LogoTitle />,
    };
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // Start counting when the page is loaded

        new SweetFetcher().Fetch('/placeman/provincesfull',SweetFetcher.METHOD_GET, null, data => {
            global.provinces=data.Data;

            this.timeoutHandle = setTimeout(()=>{
                UserNavigator.navigateToUserStartPage(this.props.navigation);
            }, 1000);
        });

    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }
    state =
        {
            Password:'',
            email:'',
            token:'',
        };

    render() {


            return(
                <View style={styles.container}>
                    <Image source={Constants.BaseIcon} style={styles.img} resizeMode={'stretch'}/>
                    {/*<Text style={styles.centerText}>Travel App</Text>*/}
                </View>
            );


    }
}
const styles = StyleSheet.create(
    {
        input:
            {
                fontSize: 17,
                minHeight: 60,
                textAlign:'center',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '70%',

                backgroundColor: "#ffffff",
                borderRadius:30,
                marginTop: '3%',
            },
        container:
            {

                backgroundColor: "#ffffff",
                height:'100%',
                width:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
        img:
            {
                width: 200,
                height: 200,


            },
        centerText:
            {
                color:"#051841",
                fontFamily: 'IRANSansMobile',
                textAlign:'center',
                height:60,

            },
        saveButton:
            {
                borderRadius:30,
                minHeight: 60,
                width:'100%',
                backgroundColor:"#104a69",
                alignSelf:'center',
            },
        saveButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical:'center',
                textAlign:'center',
                paddingVertical: 10,
            },
        row:
            {
                paddingHorizontal: 10,
                paddingVertical:  10,
                flexDirection: 'row-reverse',
            },
    }
);
