import React from 'react'

import carserviceorder_requestManageStyles from '../../values/styles/request/carserviceorder_requestManageStyles';
import carserviceorder_requestManageController from '../../controllers/request/carserviceorder_requestManageController';
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
import villaSearchIndexStyles from '../../../trapp/values/styles/villaSearchIndexStyles';

export default class  carserviceorder_requestManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات درخواست'} />
        };
    };

    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            formData:{},

			carOptions:null,
        };

        this.loadData();
    }
    loadData=()=>{

        this.loadCars();
        if(global.requestID!=null)
        {
            this.setState({isLoading:true},()=>{
                new carserviceorder_requestManageController().load(global.requestID,(data)=>{
                    this.setState({isLoading:false,formData:data});
                });
            });
        }
    };

    loadCars = () => {
        new SweetFetcher().Fetch('/carserviceorder/car',SweetFetcher.METHOD_GET, null, data => {
            this.setState({carOptions:data.Data});
        });
    };

    render() {
        let Window = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                  <View style={{height:this.getManagementPageHeight()}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                        <View style={generalStyles.container}>

                            <LocationSelector title='انتخاب از روی نقشه' navigation={this.props.navigation}/>
                            <TextBox keyboardType='numeric' title={'مدل خودرو'} value={this.state.formData.carmakeyearnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,carmakeyearnum: text}});}}/>
                            <PickerBox
                                name={'cars'}
                                title={'خودرو'}
                                selectedValue ={this.state.formData.car}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,car: value}});
                                }}
                                options={this.state.carOptions}
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
                                        if(global.SelectedLocation!=null){
                                            data.append('latitudeflt', global.SelectedLocation.latitude);
                                            data.append('longitudeflt', global.SelectedLocation.longitude);
                                        }
                                        new carserviceorder_requestManageController().save(null,data,(data)=>{
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
