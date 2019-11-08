import React from 'react'

import comments_tempuserManageStyles from '../../values/styles/tempuser/comments_tempuserManageStyles';
import comments_tempuserManageController from '../../controllers/tempuser/comments_tempuserManageController';
import { CheckBox } from 'react-native-elements';
import {StyleSheet, View, TextInput, ScrollView, Dimensions,Picker,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import TimeSelector from '../../../../sweet/components/TimeSelector';
import ImageSelector from '../../../../sweet/components/ImageSelector';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import SweetButton from '../../../../sweet/components/SweetButton';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import ComponentHelper from '../../../../classes/ComponentHelper';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';
import SweetAlert from '../../../../classes/SweetAlert';

export default class  comments_tempuserManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات tempuss'} />
        };
    };
    
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            formData:{},
            
        };
        
        this.loadData();
    }
    loadData=()=>{
        
        if(global.tempuserID!=null)
        {
            this.setState({isLoading:true},()=>{
                new comments_tempuserManageController().load(global.tempuserID,(data)=>{
                    this.setState({isLoading:false,formData:data});
                });
            });
        }
    };

    render() {
        let Window = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                  <View style={{height:this.getManagementPageHeight()}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                        <View style={generalStyles.container}>
                        
                            <TextBox title={'نام'} value={this.state.formData.name} onChangeText={(text) => {this.setState({formData:{...this.state.formData,name: text}});}}/>
                            <TextBox title={'نام خانوادگی'} value={this.state.formData.family} onChangeText={(text) => {this.setState({formData:{...this.state.formData,family: text}});}}/>
                            <TextBox keyboardType='numeric' title={'موبایل'} value={this.state.formData.mobilenum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,mobilenum: text}});}}/>
                            <TextBox title={'ایمیل'} value={this.state.formData.email} onChangeText={(text) => {this.setState({formData:{...this.state.formData,email: text}});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن'} value={this.state.formData.telnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,telnum: text}});}}/>
                            

                        </View>
                    </ScrollView>
                        </View>
                    <View style={generalStyles.actionButtonContainer}>
                                <SweetButton title='ذخیره' style={generalStyles.actionButton} onPress={(OnEnd) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data =Common.appendObject2FormData(this.state.formData,new FormData());
                                        new comments_tempuserManageController().save(global.tempuserID,data,(data)=>{
                                                 SweetAlert.displaySimpleAlert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                                 OnEnd(true);
                                        },(error)=>{OnEnd(false)}); 
        
                                    }
                                    else
                                        OnEnd(false);
                                }}/>
                            </View>
                </View>
            )
    }
}
    