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


export default class Carserviceorder_carSearch extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={' خودرو'} />
        };
    };
    state =
    {
        SearchFields:{
            
			title:'',
			maxmodelnum:'',
			minmodelnum:'',
			carmaker:'',
        },
        
			carmakerOptions:null,
    };
    async componentDidMount() {
        
        this.loadCarmakers();
    }
    
    loadCarmakers = () => {
        new SweetFetcher().Fetch('/carserviceorder/carmaker',SweetFetcher.METHOD_GET, null, data => {
            this.setState({carmakerOptions:data.Data});
        });
    };
                
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox title={'عنوان'} value={this.state.SearchFields.title} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,title: text}});}}/>
                            <TextBox keyboardType='numeric' title={'حداکثر مدل'} value={this.state.SearchFields.maxmodelnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,maxmodelnum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'حداقل مدل'} value={this.state.SearchFields.minmodelnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,minmodelnum: text}});}}/>
                            <PickerBox
                                name={'carmakers'}
                                title={'خودروساز'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.carmaker}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,carmaker: value}});
                                }}
                                options={this.state.carmakerOptions}
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
    