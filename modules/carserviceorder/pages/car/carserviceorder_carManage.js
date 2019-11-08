import React from 'react'

import carserviceorder_carManageStyles from '../../values/styles/car/carserviceorder_carManageStyles';
import carserviceorder_carManageController from '../../controllers/car/carserviceorder_carManageController';
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

export default class  carserviceorder_carManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات خودرو'} />
        };
    };
    
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            formData:{},
            
			carmakerOptions:null,
        };
        
        this.loadData();
    }
    loadData=()=>{
        
        this.loadCarmakers();
        if(global.carID!=null)
        {
            this.setState({isLoading:true},()=>{
                new carserviceorder_carManageController().load(global.carID,(data)=>{
                    this.setState({isLoading:false,formData:data});
                });
            });
        }
    };

    loadCarmakers = () => {
        new SweetFetcher().Fetch('/carserviceorder/carmaker',SweetFetcher.METHOD_GET, null, data => {
            this.setState({carmakerOptions:data.Data});
        });
    };
                
    render() {
        let Window = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                  <View style={{height:this.getManagementPageHeight()}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                        <View style={generalStyles.container}>
                        
                            <TextBox title={'عنوان'} value={this.state.formData.title} onChangeText={(text) => {this.setState({formData:{...this.state.formData,title: text}});}}/>
                            <TextBox keyboardType='numeric' title={'حداکثر مدل'} value={this.state.formData.maxmodelnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,maxmodelnum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'حداقل مدل'} value={this.state.formData.minmodelnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,minmodelnum: text}});}}/>
                            <ImageSelector title='انتخاب تصویر' onConfirm={(path,onEnd)=>{onEnd(true);this.setState({formData:{...this.state.formData,photoigu:ComponentHelper.getImageSelectorNormalPath(path)},SelectedphotoiguLocation : path});}} />
                            <PickerBox
                                name={'carmakers'}
                                title={'خودروساز'}
                                selectedValue ={this.state.formData.carmaker}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,carmaker: value}});
                                }}
                                options={this.state.carmakerOptions}
                            />
                            

                        </View>
                    </ScrollView>
                        </View>
                    <View style={generalStyles.actionButtonContainer}>
                                <SweetButton title='ذخیره' style={generalStyles.actionButton} onPress={(OnEnd) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data =Common.appendObject2FormData(this.state.formData,new FormData());
                                        new carserviceorder_carManageController().save(global.carID,data,(data)=>{
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
    