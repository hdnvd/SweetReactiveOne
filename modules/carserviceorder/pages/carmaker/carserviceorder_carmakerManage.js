import React from 'react'

import carserviceorder_carmakerManageStyles from '../../values/styles/carmaker/carserviceorder_carmakerManageStyles';
import carserviceorder_carmakerManageController from '../../controllers/carmaker/carserviceorder_carmakerManageController';
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

export default class  carserviceorder_carmakerManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات خودروساز'} />
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
        
        if(global.carmakerID!=null)
        {
            this.setState({isLoading:true},()=>{
                new carserviceorder_carmakerManageController().load(global.carmakerID,(data)=>{
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
                        
                            <TextBox title={'عنوان'} value={this.state.formData.title} onChangeText={(text) => {this.setState({formData:{...this.state.formData,title: text}});}}/>
                            <ImageSelector title='انتخاب لوگو' onConfirm={(path,onEnd)=>{onEnd(true);this.setState({formData:{...this.state.formData,logoigu:ComponentHelper.getImageSelectorNormalPath(path)},SelectedlogoiguLocation : path});}} />
                            

                        </View>
                    </ScrollView>
                        </View>
                    <View style={generalStyles.actionButtonContainer}>
                                <SweetButton title='ذخیره' style={generalStyles.actionButton} onPress={(OnEnd) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data =Common.appendObject2FormData(this.state.formData,new FormData());
                                        new carserviceorder_carmakerManageController().save(global.carmakerID,data,(data)=>{
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
    