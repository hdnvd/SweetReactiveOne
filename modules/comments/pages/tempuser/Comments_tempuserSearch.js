import React, {Component} from 'react'
import {StyleSheet, View, Alert, Dimensions,AsyncStorage,Image,TouchableWithoutFeedback,Text,Picker,TextInput,ScrollView,FlatList } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import TimeSelector from '../../../../sweet/components/TimeSelector';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import SweetButton from '../../../../sweet/components/SweetButton';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';


export default class Comments_tempuserSearch extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={' tempuss'} />
        };
    };
    state =
    {
        SearchFields:{
            
			name:'',
			family:'',
			mobilenum:'',
			email:'',
			telnum:'',
        },
        
    };
    async componentDidMount() {
        
    }
    
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox title={'نام'} value={this.state.SearchFields.name} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,name: text}});}}/>
                            <TextBox title={'نام خانوادگی'} value={this.state.SearchFields.family} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,family: text}});}}/>
                            <TextBox keyboardType='numeric' title={'موبایل'} value={this.state.SearchFields.mobilenum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,mobilenum: text}});}}/>
                            <TextBox title={'ایمیل'} value={this.state.SearchFields.email} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,email: text}});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن'} value={this.state.SearchFields.telnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,telnum: text}});}}/>
                                <SweetButton title={'جستجو'} onPress={(OnEnd) => {
                                    if(this.props.dataLoader!=null)
                                    {
                                        this.props.dataLoader(this.state.SearchFields);
                                        OnEnd(true);
                                    }
                                    else
                                        OnEnd(false);
                            }}/>
                            </View>
                        </ScrollView>
                </View>
            );
    }
}
    