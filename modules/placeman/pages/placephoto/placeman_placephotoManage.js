import React, {Component} from 'react'
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,AsyncStorage,Picker,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import ImageSelector from '../../../../sweet/components/ImageSelector';
import SweetButton from '../../../../sweet/components/SweetButton';
import ComponentHelper from '../../../../classes/ComponentHelper';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from "../../../../components/LogoTitle";
import SweetHttpRequest from "../../../../classes/sweet-http-request";
import PhotoManageBox from "../../../../sweet/components/PhotoManageBox";

export default class  placeman_placephotoManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'تصاویر ویلا'} />
        };
    };

    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            placephotos:[],
			name:'',
            photoCount:0,
        };

        this._loadData();
    }
    _loadData=()=>{
        this.setState({isLoading:true});
        let Request=new SweetHttpRequest();
        Request.appendVariable('__pagesize',Constants.DEFAULT_PAGESIZE);
        Request.appendVariable('__startrow','0');
        Request.appendVariable('place_fid',global.placeId);
        let filterString=Request.getParamsString();
        if(filterString!='') filterString='?'+filterString;
        let url='/placeman/placephoto/place/'+global.placeId+filterString;
        new SweetFetcher().Fetch(url,SweetFetcher.METHOD_GET, null, data => {
            let placePhotosList=data.Data.map(dt=>{
                return {url:dt.photoigu,
                onDelete:()=>
                {
                    let DeleteUrl='/placeman/placephoto/'+dt.id;
                    new SweetFetcher().Fetch(DeleteUrl,SweetFetcher.METHOD_DELETE, null, data => {
                        this._loadData();
                    });
                }
                }
            });
            console.log(placePhotosList);
            this.setState({placephotos:placePhotosList,isLoading:false,photoCount:placePhotosList.length});
        });
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                            <PhotoManageBox photos={this.state.placephotos}/>
                            {this.state.photoCount < 8 &&
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <ImageSelector title='انتخاب و آپلود عکس'
                                               onConfirm={(path,onEnd) => {
                                                   let formIsValid = true;
                                                   if (formIsValid && path!=null) {
                                                       const data = new FormData();
                                                       let id = '';
                                                       let method = SweetFetcher.METHOD_POST;
                                                       let Separator = '';
                                                       let action = AccessManager.INSERT;
                                                       data.append('name', 'villaPhoto');
                                                       ComponentHelper.appendImageSelectorToFormDataIfNotNull(data, 'photoigu', path);
                                                       // data.append('phototype', this.state.SelectedphototypeValue);
                                                       // data.append('place', this.state.SelectedplaceValue);
                                                       new SweetFetcher().Fetch('/placeman/placephoto' + Separator + id, method, data, data => {
                                                           if (data.hasOwnProperty('Data')) {
                                                               // this.props.navigation.navigate('trapp_villaReservationInfo', { name: 'trapp_villaReservationInfo' });
                                                               // Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                                               onEnd(true);
                                                               this._loadData();
                                                           }
                                                       }, (error) => {
                                                           onEnd(false);

                                                       }, 'placeman', 'placephoto', this.props.history);
                                                   }
                                               }
                                               }/>
                            </View>
                            }
                            {/*<SweetButton title={'صفحه مدیریت ویلا'} onPress={(OnEnd)=>*/}
                            {/*{*/}
                                {/*this.props.navigation.navigate('trapp_villaReservationInfo', { name: 'trapp_villaReservationInfo' });*/}
                                {/*OnEnd(true);*/}
                            {/*}}/>*/}
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
