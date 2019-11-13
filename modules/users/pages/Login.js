/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    TextInput,
    Text,
    TouchableOpacity,
    Linking, Image, Dimensions, BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import LogoTitle from "../../../components/LogoTitle";
import UserMan from "../../../classes/userman";
import SweetFetcher from "../../../classes/sweet-fetcher";
import Common from "../../../classes/Common";
import Constants from "../../../classes/Constants";
import TrappUser from "../../trapp/classes/TrappUser";
import SweetButton from "../../../sweet/components/SweetButton";
import SweetCheckBox from "../../../sweet/components/SweetCheckBox";
import SweetPage from '../../../sweet/components/SweetPage';
import SweetConsole from '../../../classes/SweetConsole';
import UserNavigator from '../classes/UserNavigator';
import User from '../classes/User';

export default class Login extends SweetPage {
    LOGINTYPE_NOTASKED=1;
    LOGINTYPE_LOGIN=2;
    LOGINTYPE_REGISTER=3;
    LOGINTYPE_CODESENT=4;
    static navigationOptions = {
        headerTitle: <LogoTitle hideMenu={true}/>,
    };

    state =
        {
            loginType:this.LOGINTYPE_NOTASKED,
            Password:'',
            phone:'',
            token:'',
            name:'',
            displayedMessage:false,
            checkedTerms:false,
        };
    constructor(props) {
        super(props);
    }
    openURL = (URL) => {
        Linking.canOpenURL(URL).then(supported => {
            if (supported) {
                Linking.openURL(URL);
            } else {
                SweetConsole.log("Don't know how to open URI: " + URL);
            }
        });
    };
    setBackHandler(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            if(this.state.loginType===this.LOGINTYPE_NOTASKED)
                return false;
            this.setState({loginType:this.LOGINTYPE_NOTASKED,});
                return true;
        });
    }
    componentDidMount=()=>{
        this.setBackHandler();
        AsyncStorage.getItem('token').then((value)=>{if(value=='' || value==null) this.setState({'token':'-1'}); else this.setState({'token':value});});

    };

    loginByVerificationCode=(OnEnd) => {
        // NativeModules.ActivityStarter.navigateToExample();
        let FormIsValid = true;
        let invalidFormMessage = "";
        if (this.state.Password.length<1) {
            FormIsValid = false;
            invalidFormMessage = 'لطفا کد تایید را که به شماره تلفن همراه شما ارسال شده است وارد نمایید.';
        }
        if (!FormIsValid) {
            Alert.alert('خطا', invalidFormMessage);
            OnEnd(false);
        }
        else {
            const data = new FormData();
            data.append('phone', this.state.phone);
            data.append('name', this.state.name);
            data.append('code', this.state.Password);
            data.append('forceLogin', true);
            data.append('appName', Constants.AppName);
            data.append('role', Constants.DefaultRole);
            new SweetFetcher().Fetch('/users/loginbyphone', SweetFetcher.METHOD_POST, data, data => {
                SweetConsole.log(data);
                User.saveUserData(data.Data.roles,data.Data.access,data.Data.sessionkey).then(result => {
                    // SweetConsole.log("HAAA");
                    if (data.Data.sessionkey.length > 2) {
                        // User.saveToken(data.Data.sessionkey);
                        this.setState({'token': data.Data.sessionkey});
                        global.isnewprofile = false;
                        OnEnd(true);
                        this.removeBackHandler();
                        // UserNavigator.navigateToUserStartPage(this.props.navigation);
                        UserNavigator.navigateToUserStartPage(this.props.navigation);
                        // TrappUser.navigateToUserStartPage(this.props.navigation);
                    }
                    else
                        Alert.alert('خطا', "اطلاعات کاربری صحیح نمی باشد.");
                    OnEnd(false);
                }).catch(e => {
                    SweetConsole.log(e);
                    OnEnd(false);
                });

            }, (error) => {

                OnEnd(false);
                SweetConsole.log(error);
            }, 'users', 'load', this.props.history);
        }

    };
    render() {
        User._setUserLoginStateInTemporaryGlobalFromToken(this.state.token);
        if(this.state.token=='')
        {
            return(
                <View style={styles.container}>
                    <Text style={{fontFamily:"IRANSansMobile"}}>در حال بررسی اطلاعات کاربری...</Text>
                </View>
            );
        }
        else if(this.state.token=='-1')
        {

            return (
                <View style={styles.container}>
                    {this.state.loginType === this.LOGINTYPE_NOTASKED &&
                    <View style={styles.container}>
                        {/*<Image source={Constants.BasePureIcon} style={styles.TopImage} resizeMode={'stretch'}/>*/}
                        <SweetButton title="ورود" onPress={(OnEnd) => {
                            OnEnd(true);
                            this.setState({loginType:this.LOGINTYPE_LOGIN});
                        }
                        }/>
                        <SweetButton title="ثبت نام" onPress={(OnEnd) => {
                            OnEnd(true);
                            this.setState({loginType:this.LOGINTYPE_REGISTER});
                        }
                        }/>

                        <Image source={Constants.BaseIconText} style={styles.BottomImage} resizeMode={'stretch'}/>
                    </View>
                    }
                    {(this.state.loginType === this.LOGINTYPE_REGISTER || this.state.loginType === this.LOGINTYPE_LOGIN) &&

                        <View  style={styles.container}>
                            <Image source={Constants.BasePureIcon} style={styles.TopImage} resizeMode={'stretch'}/>
                    {this.state.loginType === this.LOGINTYPE_REGISTER &&
                    <TextInput placeholder="نام کامل" value={this.state.name} style={styles.input}
                               underlineColorAndroid={'transparent'} onChangeText={(text) => {
                        this.setState({name: text});
                    }}/>
                    }
                        <TextInput placeholder="شماره موبایل" keyboardType='numeric' value={this.state.phone} style={styles.input} underlineColorAndroid={'transparent'} onChangeText={(text) => {
                        this.setState({phone: text});
                    }}/>
                            {this.state.loginType === this.LOGINTYPE_REGISTER &&

                            <View flexDirection={'column'} >
                            <SweetCheckBox
                                title='قوانین و مقررات سامانه را خوانده و می پذیرم'
                                iconType='font-awesome'
                                checkedIcon='check-square'
                                uncheckedIcon='square'
                                uncheckedColor='#cccccc'
                                checkedColor='#ffffff'
                                style={{
                                    direction:'rtl',
                                    marginVertical: 15,
                                }}
                                textStyle={{
                                    color:Constants.BaseTextColor,
                                    fontFamily: 'IRANSansMobile',
                                marginHorizontal: 10}}
                                checked={this.state.checkedTerms}
                                onPress={()=>{this.setState({checkedTerms:!this.state.checkedTerms})}}
                            />
                                <TouchableOpacity onPress={()=> {

                                    this.openURL("http://Trapp.ir/Terms");
                                }}>
                                    <Text style={{
                                        color:Constants.BaseTextColor,
                                        fontFamily: 'IRANSansMobile',
                                        direction:'rtl',
                                        textAlign:'center',
                                        marginBottom: 15,
                                    }}>(قوانین و مقررات)</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        <SweetButton title="ارسال کد تایید" onPress={(onEnd) => {
                            let FormIsValid = true;
                            let invalidFormMessage = "";
                            if (this.state.loginType === this.LOGINTYPE_REGISTER) {
                                if (!this.state.checkedTerms) {
                                    FormIsValid = false;
                                    invalidFormMessage = 'برای ثبت نام باید قوانین و مقررات سامانه را بپذیرید.';
                                }
                                if (this.state.name.length<3) {
                                    FormIsValid = false;
                                    invalidFormMessage = 'برای ثبت نام وارد کردن نام کامل اجباری می باشد';
                                }
                            }
                            if (this.state.phone.length!==11) {
                                FormIsValid = false;
                                invalidFormMessage = 'لطفا شماره تلفن همراه خود را به طور کامل وارد نمایید';
                            }
                            if (!FormIsValid) {
                                Alert.alert('خطا', invalidFormMessage);
                                onEnd(false);
                            }
                            else {
                                const data = new FormData();
                                data.append('phone', this.state.phone);
                                data.append('name', this.state.name);
                                data.append('logintype', this.state.loginType===this.LOGINTYPE_LOGIN?'login':'register');
                                data.append('appName', Constants.AppName);
                                data.append('role', Constants.DefaultRole);
                                new SweetFetcher().Fetch('/users/sendverificationcode', SweetFetcher.METHOD_POST, data, data => {
                                    Alert.alert('پیام', "کد تایید به شماره موبایل شما ارسال شد.");
                                    this.setState({loginType: this.LOGINTYPE_CODESENT});
                                    onEnd(true);
                                }, (error) => {
                                    Alert.alert('پیام', "خطایی در ارسال کد بوجود آمد");
                                    onEnd(false)
                                }, 'users', 'sendverificationcode', this.props.history);

                            }
                        }
                        }/>
                        </View >
                    }
                    {this.state.loginType === this.LOGINTYPE_CODESENT &&
                    <View style={styles.container}>
                        <Image source={Constants.BasePureIcon} style={styles.TopImage} resizeMode={'stretch'}/>
                        <TextInput placeholder="کد تایید" secureTextEntry={true} keyboardType='numeric' style={styles.input}
                                   underlineColorAndroid={'transparent'} onChangeText={(text) => {
                            this.setState({Password: text},()=>{
                                // let onEnd=(a)=>{};
                                // if(text.length>=5)
                                //     this.loginByVerificationCode(onEnd);
                            });
                        }}/>
                        <View>
                            <View>
                                <SweetButton title="ورود" onPress={this.loginByVerificationCode}/>
                            </View>
                        </View>
                    </View>
                    }
                </View>
            )
        }
        else
        {
            global.isnewprofile=false;

            // TrappUser.navigateToUserStartPage(this.props.navigation);
            UserNavigator.navigateToUserStartPage(this.props.navigation);
            return(<View/>);
        }


    }
}
let Window = Dimensions.get('window');
const styles = StyleSheet.create(
    {
        input:
            {
                fontSize: 17,
                minHeight: 40,
                textAlign:'center',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '70%',

                backgroundColor: "#ffffff",
                borderRadius:15,
                marginTop: '2%',
                borderColor:Constants.BaseColor,
                borderWidth:2,
            },
        container:
            {
                backgroundColor: Constants.BaseBGColor,
                height:'100%',
                width:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
        inputLabel:
            {
                lineHeight: 40,
                fontSize: 17,
                minHeight: 40,
                direction: 'rtl',
                textAlign: 'right',
                fontFamily: 'IRANSansMobile',
            },
        TopImage:
            {
                width:Window.width*0.5,
                height:Window.width*0.5*0.61,
            },
        BottomImage:
            {
                width:Window.width*0.5,
                height:Window.width*0.5*0.29,
            },


    }
);
