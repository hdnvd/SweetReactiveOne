import React from 'react'
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

export default class  trapp_villaManageNew extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات ویلا'} />
        };
    };

    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                formData:{},
                placemanplaceOptions:null,
                viewtypeOptions:null,
                structuretypeOptions:null,
                owningtypeOptions:null,
                areatypeOptions:null,
            };

        this.loadData();
    }
    loadData=()=>{
        this.loadAllOptions();
        if(global.villaID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/villa/'+global.villaID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({formData:data.Data});
            });
        }//IF
    };
    loadAllOptions = () => {
        new SweetFetcher().Fetch('/trapp/villa/options/list', SweetFetcher.METHOD_GET, null, data => {
            this.setState({allOptions: data.Data});
        });
    };
    render() {
        let Window = Dimensions.get('window');
        return (
            <View style={{flex:1}}  >
                <View style={{height:this.getManagementPageHeight()}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                        <View style={generalStyles.container}>

                            <TextBox keyboardType='numeric' title={'تعداد اتاق'} value={this.state.formData.roomcountnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,roomcountnum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'ظرفیت به نفر'} value={this.state.formData.capacitynum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,capacitynum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'حداکثر تعداد مهمان'} value={this.state.formData.maxguestsnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,maxguestsnum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'متراژ بنا'} value={this.state.formData.structureareanum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,structureareanum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'متراژ کل'} value={this.state.formData.totalareanum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,totalareanum: text}});}}/>
                            <PickerBox
                                name={'placemanplaces'}
                                title={'محل'}
                                selectedValue ={this.state.formData.SelectedplacemanplaceValue}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,SelectedplacemanplaceValue: value}});
                                }}
                                options={this.state.formData.placemanplaceOptions}
                            />
                            <CheckedRow title='دارای سند مالکیت به نام کاربر' checked={this.state.formData.addedbyowner}
                                        onPress={() => this.setState({formData:{...this.state.formData,addedbyowner: this.state.formData.addedbyowner==0?1:0}})}
                            />
                            <PickerBox
                                name={'viewtypes'}
                                title={'چشم انداز'}
                                selectedValue ={this.state.formData.SelectedviewtypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,SelectedviewtypeValue: value}});
                                }}
                                options={this.state.formData.viewtypeOptions}
                            />
                            <PickerBox
                                name={'structuretypes'}
                                title={'نوع ساختمان'}
                                selectedValue ={this.state.formData.SelectedstructuretypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,SelectedstructuretypeValue: value}});
                                }}
                                options={this.state.formData.structuretypeOptions}
                            />
                            <CheckedRow title='تحویل ۲۴ ساعته' checked={this.state.formData.fulltimeservice}
                                        onPress={() => this.setState({formData:{...this.state.formData,fulltimeservice: this.state.formData.fulltimeservice==0?1:0}})}
                            />
                            <TimeSelector title={'زمان تحویل/تخلیه'} value={this.state.formData.timestartclk} onConfirm={(date)=>this.setState({formData:{...this.state.formData,timestartclk: date}})} />
                            <PickerBox
                                name={'owningtypes'}
                                title={'نوع اقامتگاه'}
                                selectedValue ={this.state.formData.SelectedowningtypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,SelectedowningtypeValue: value}});
                                }}
                                options={this.state.formData.owningtypeOptions}
                            />
                            <PickerBox
                                name={'areatypes'}
                                title={'بافت'}
                                selectedValue ={this.state.formData.SelectedareatypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,SelectedareatypeValue: value}});
                                }}
                                options={this.state.formData.areatypeOptions}
                            />
                            <TextBox title={'توضیحات'} value={this.state.formData.descriptionte} onChangeText={(text) => {this.setState({formData:{...this.state.formData,descriptionte: text}});}}/>
                            <ImageSelector title='انتخاب سند مالکیت' onConfirm={(path,onEnd)=>{onEnd(true);this.setState({formData:{...this.state.formData,documentphotoigu:ComponentHelper.getImageSelectorNormalPath(path)},SelecteddocumentphotoiguLocation : path});}} />
                            <TextBox keyboardType='numeric' title={'قیمت در روزهای عادی'} value={this.state.formData.normalpriceprc} onChangeText={(text) => {this.setState({formData:{...this.state.formData,normalpriceprc: text}});}}/>
                            <TextBox keyboardType='numeric' title={'قیمت در روزهای تعطیل'} value={this.state.formData.holidaypriceprc} onChangeText={(text) => {this.setState({formData:{...this.state.formData,holidaypriceprc: text}});}}/>
                            <TextBox keyboardType='numeric' title={'تخفیف رزرو بیش از یک هفته'} value={this.state.formData.weeklyoffnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,weeklyoffnum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'تخفیف رزرو بیش از یک ماه'} value={this.state.formData.monthlyoffnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,monthlyoffnum: text}});}}/>
                        </View>
                    </ScrollView>
                </View>
                <View style={generalStyles.actionButtonContainer}>
                    <SweetButton title='ذخیره' style={generalStyles.actionButton} onPress={(OnEnd) => {
                        let formIsValid=true;
                        if(formIsValid)
                        {
                            const data =Common.appendObject2FormData(this.state.formData,new FormData());
                            villaManageController
                            let id = '';
                            let method=SweetFetcher.METHOD_POST;
                            let Separator='';
                            let action=AccessManager.INSERT;
                            if (global.villaID > 0)
                                id = global.villaID;

                            if(id!==''){
                                method=SweetFetcher.METHOD_PUT;
                                Separator='/';
                                action=AccessManager.EDIT;
                                data.append('id', id);
                            }

                            new SweetFetcher().Fetch('/trapp/villa'+Separator+id, method, data, data => {
                                if(data.hasOwnProperty('Data'))
                                {
                                    SweetAlert.displaySimpleAlert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                    OnEnd(true);
                                }
                            },(error)=>{OnEnd(false)},'trapp','villa',this.props.history);
                        }
                        else
                            OnEnd(false);
                    }}/>
                </View>
            </View>
        )
    }
}
