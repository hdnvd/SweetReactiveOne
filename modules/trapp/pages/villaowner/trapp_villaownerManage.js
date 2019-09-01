import React, {Component} from 'react'
import { CheckBox } from 'react-native-elements';
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,AsyncStorage,Picker,Text,Image } from 'react-native';
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
import TextRow from "../../../../sweet/components/TextRow";
import LogoTitle from "../../../../components/LogoTitle";
import SweetAlert from "../../../../classes/SweetAlert";
import HeaderSize from '../../../../classes/HeaderSize';
import SweetPage from '../../../../sweet/components/SweetPage';

export default class  trapp_villaownerManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات صاحب ویلا'} />
        };
    };
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,

			name:'',
			nationalcodebnum:'',
			address:'',
			shabacodebnum:'',
			telbnum:'',
			backuptelbnum:'',
			email:'',
			backupmobilebnum:'',
			SelectedphotoiguLocation:'',
			SelectednationalcardiguLocation:'',selectedAreaValue: -1,

        };

        this.loadData();
    }
    loadData=()=>{

        if(global.itemID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/villaowner/'+global.ownerId,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({name:data.Data.name,SelecteduserValue:data.Data.user,nationalcodebnum:data.Data.nationalcodebnum,address:data.Data.address,shabacodebnum:data.Data.shabacodebnum,telbnum:data.Data.telbnum,backuptelbnum:data.Data.backuptelbnum,email:data.Data.email,backupmobilebnum:data.Data.backupmobilebnum,photoigu:data.Data.photoigu,nationalcardigu:data.Data.nationalcardigu,placemanarea:data.Data.placemanarea,});
            });
        }//IF
    };

    render() {
        let Window = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <View style={{flex:1}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                        <View style={generalStyles.container}>
                            <TextBox title={'نام'} value={this.state.name} onChangeText={(text) => {this.setState({name: text});}}/>
                            <TextBox keyboardType='numeric' maxLength={10} title={'کد ملی'} value={this.state.nationalcodebnum+''} onChangeText={(text) => {this.setState({nationalcodebnum: text});}}/>

                            <CityAreaSelector
                                onAreaSelected={(AreaID)=>this.setState({selectedAreaValue: AreaID})}
                            />

                            <TextBox title={'آدرس'} value={this.state.address} onChangeText={(text) => {this.setState({address: text});}}/>
                            <TextBox keyboardType='numeric' maxLength={24}  title={'کد شبا(بدون خط تیره و IR)'} value={this.state.shabacodebnum+''} onChangeText={(text) => {this.setState({shabacodebnum: text});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن'}  maxLength={12} value={this.state.telbnum+''} onChangeText={(text) => {this.setState({telbnum: text});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن شماره ۲(اختیاری)'}   maxLength={12}value={this.state.backuptelbnum+''} onChangeText={(text) => {this.setState({backuptelbnum: text});}}/>
                            <TextBox title={'ایمیل(اختیاری)'} value={this.state.email} onChangeText={(text) => {this.setState({email: text});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن همراه شماره ۲(اختیاری)'}   maxLength={12} value={this.state.backupmobilebnum+''} onChangeText={(text) => {this.setState({backupmobilebnum: text});}}/>
                            <ImageSelector title='انتخاب عکس میزبان' onConfirm={(path,onEnd)=>{
                                onEnd(true);
                                this.setState({SelectedphotoiguLocation : path});
                            }} />
                            <ImageSelector title='انتخاب تصویر کارت ملی میزبان' onConfirm={(path,onEnd)=>{
                                    onEnd(true);
                                    this.setState({SelectednationalcardiguLocation : path});

                            }} />


                        </View>
                    </ScrollView>
                    </View>
                    <View style={generalStyles.actionButtonContainer}>
                        <SweetButton title='ذخیره' style={generalStyles.actionButton} onPress={(OnEnd) => {
                            let formIsValid=true;
                            if(formIsValid)
                            {
                                const data = new FormData();
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                if (global.ownerId > 0)
                                    id = global.ownerId;

                                if(id!==''){
                                    method=SweetFetcher.METHOD_PUT;
                                    Separator='/';
                                    action=AccessManager.EDIT;
                                    data.append('id', id);
                                }

                                data.append('name', this.state.name);
                                data.append('nationalcodebnum', this.state.nationalcodebnum);
                                data.append('address', this.state.address);
                                data.append('shabacodebnum', this.state.shabacodebnum);
                                data.append('telbnum', this.state.telbnum);
                                data.append('backuptelbnum', this.state.backuptelbnum);
                                data.append('email', this.state.email);
                                data.append('backupmobilebnum', this.state.backupmobilebnum);
                                ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'photoigu',this.state.SelectedphotoiguLocation);
                                ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'nationalcardigu',this.state.SelectednationalcardiguLocation);
                                data.append('placemanarea', this.state.selectedAreaValue);
                                new SweetFetcher().Fetch('/trapp/villaowner'+Separator+id, method, data, data => {
                                    if(data.hasOwnProperty('Data'))
                                    {
                                        global.ownerId=data.Data.id;
                                        if(id==='')
                                            this.props.navigation.navigate('placeman_placeManage', { name: 'placeman_placeManage' });
                                        else
                                        {
                                            this.props.navigation.navigate('trapp_villaReservationInfo', { name: 'trapp_villaReservationInfo' });
                                        }
                                        OnEnd(true);
                                    }
                                },(error)=>{OnEnd(false)},'trapp','villaowner',this.props.history);
                            }
                            else
                                OnEnd(false);
                        }}/>
                    </View>
                </View>
            )
    }
}
