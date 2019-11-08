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


export default class Carserviceorder_requestSearch extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={' درخواست'} />
        };
    };
    state =
    {
        SearchFields:{
            
			carmakeyearnum:'',
			user:'',
			car:'',
        },
        
			carOptions:null,
    };
    async componentDidMount() {
        
        this.loadCars();
    }
    
    loadCars = () => {
        new SweetFetcher().Fetch('/carserviceorder/car',SweetFetcher.METHOD_GET, null, data => {
            this.setState({carOptions:data.Data});
        });
    };
                
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox keyboardType='numeric' title={'مدل خودرو'} value={this.state.SearchFields.carmakeyearnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,carmakeyearnum: text}});}}/>
                            <PickerBox
                                name={'cars'}
                                title={'خودرو'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.car}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,car: value}});
                                }}
                                options={this.state.carOptions}
                            />
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
    