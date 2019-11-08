import React from 'react'

import comments_commenttypeManageStyles from '../../values/styles/commenttype/comments_commenttypeManageStyles';
import comments_commenttypeManageController from '../../controllers/commenttype/comments_commenttypeManageController';
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

export default class  comments_commenttypeManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات چگونه نوع'} />
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
        
        if(global.commenttypeID!=null)
        {
            this.setState({isLoading:true},()=>{
                new comments_commenttypeManageController().load(global.commenttypeID,(data)=>{
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
                            <CheckedRow title='دارای رتبه' checked={this.state.formData.rated}
                            onPress={() => this.setState({formData:{...this.state.formData,rated: this.state.formData.rated==0?1:0}})}
                            />
                            <CheckedRow title='is_uniquecomment' checked={this.state.formData.uniquecomment}
                            onPress={() => this.setState({formData:{...this.state.formData,uniquecomment: this.state.formData.uniquecomment==0?1:0}})}
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
                                        new comments_commenttypeManageController().save(global.commenttypeID,data,(data)=>{
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
    