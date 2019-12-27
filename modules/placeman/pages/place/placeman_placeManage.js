import React, {Component} from 'react'
import { CheckBox } from 'react-native-elements';
import {
    StyleSheet,
    View,
    Alert,
    TextInput,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Picker,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
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
import LogoTitle from "../../../../components/LogoTitle";
import SweetAlert from '../../../../classes/SweetAlert';
import SweetPage from '../../../../sweet/components/SweetPage';
import CityAreaSelectorModal from '../../../../sweet/components/CityAreaSelectorModal';
import SweetLocationSelector from '../../../../sweet/components/SweetLocationSelector';
import SweetNavigation from '../../../../classes/sweetNavigation';
import TrappUser from '../../../trapp/classes/TrappUser';
export default class  placeman_placeManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات محل ویلا'} />
        };
    };
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,

			title:'',selectedAreaValue: -1,
			address:'',
			SelectedlogoiguLocation:'',
			description:'',
			active:0,

        };

        this.loadData();
    }
    loadData=()=>{

        if(global.itemID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/placeman/place/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({title:data.Data.title,selectedAreaValue:data.Data.area,address:data.Data.address,latitude:data.Data.latitude,longitude:data.Data.longitude,logoigu:data.Data.logoigu,description:data.Data.description,active:data.Data.active,SelecteduserValue:data.Data.user,});
            });
        }//IF
    };

    render() {
        let Window = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <View style={{flex:1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                            <View style={generalStyles.container}><TouchableOpacity><View>
                            <CityAreaSelectorModal  area={this.state.selectedAreaValue} onSelect={(placeObject)=>{
                                this.setState({selectedAreaValue:placeObject.area})
                            }}/>
                            <SweetLocationSelector location={SweetLocationSelector.getLocationInfoFromObject(this.state)}
                                                   onLocationChange={(region)=>{
                                                       console.log("DDD");
                                                       console.log(region);
                                                       this.setState(region);
                                                   }}/>
                            <TextBox title={'آدرس'} value={this.state.address} onChangeText={(text) => {this.setState({address: text});}}/>

                            </View></TouchableOpacity></View>
                    </ScrollView>
                    </View>
                    <View  style={generalStyles.actionButtonContainer}>
                        <SweetButton title='ذخیره' style={generalStyles.actionButton} onPress={(OnEnd) => {
                            let formIsValid=true;
                            if(formIsValid)
                            {
                                const data = new FormData();
                                let id = '';
                                let method=SweetFetcher.METHOD_POST;
                                let Separator='';
                                let action=AccessManager.INSERT;
                                if (global.itemID > 0)
                                    id = global.itemID;

                                if(id!==''){
                                    method=SweetFetcher.METHOD_PUT;
                                    Separator='/';
                                    action=AccessManager.EDIT;
                                    data.append('id', id);
                                }

                                if(this.state.latitude==null || this.state.longitude==null)
                                {
                                    OnEnd(false);
                                    SweetAlert.displaySimpleAlert('خطا','لطفا مکان را از روی نقشه انتخاب کنید.');
                                }
                                else
                                {
                                    data.append('title', this.state.title);
                                    data.append('area', this.state.selectedAreaValue);
                                    data.append('address', this.state.address);
                                    data.append('latitude', this.state.latitude);
                                    data.append('longitude', this.state.longitude);
                                    ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'logoigu',this.state.SelectedlogoiguLocation);
                                    data.append('description', this.state.description);
                                    data.append('active', this.state.active);
                                    new SweetFetcher().Fetch('/placeman/place'+Separator+id, method, data, data => {
                                        if(data.hasOwnProperty('Data'))
                                        {
                                            global.placeId=data.Data.id;
                                            TrappUser.navigateToNextPage(this.props.navigation,TrappUser.PAGE_PLACE_MANAGE,id==='');

                                            OnEnd(true);
                                            // Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                        }
                                    },(error)=>{OnEnd(false)},'placeman','place',this.props.history);
                                }
                            }
                        }}/>
                    </View>
                </View>
            )
    }
}
