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


export default class Comments_commentSearch extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={' اظهار نظر'} />
        };
    };
    state =
    {
        SearchFields:{
            
			text:'',
			commenttype:'',
			ratenum:'',
			tempuser:'',
			mothercomment:'',
			user:'',
			subjectentity:'',
        },
        
			commenttypeOptions:null,
			mothercommentOptions:null,
			userOptions:null,
			subjectentityOptions:null,
    };
    async componentDidMount() {
        
        this.loadCommenttypes();
        this.loadMothercomments();
        this.loadUsers();
        this.loadSubjectentitys();
    }
    
    loadCommenttypes = () => {
        new SweetFetcher().Fetch('/comments/commenttype',SweetFetcher.METHOD_GET, null, data => {
            this.setState({commenttypeOptions:data.Data});
        });
    };
                
    loadMothercomments = () => {
        new SweetFetcher().Fetch('/mother/comment',SweetFetcher.METHOD_GET, null, data => {
            this.setState({mothercommentOptions:data.Data});
        });
    };
                
    loadUsers = () => {
        new SweetFetcher().Fetch('/comments/user',SweetFetcher.METHOD_GET, null, data => {
            this.setState({userOptions:data.Data});
        });
    };
                
    loadSubjectentitys = () => {
        new SweetFetcher().Fetch('/comments/subjectentity',SweetFetcher.METHOD_GET, null, data => {
            this.setState({subjectentityOptions:data.Data});
        });
    };
                
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox title={'متن'} value={this.state.SearchFields.text} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,text: text}});}}/>
                            <PickerBox
                                name={'commenttypes'}
                                title={'چگونه نوع'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.commenttype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,commenttype: value}});
                                }}
                                options={this.state.commenttypeOptions}
                            />
                            <TextBox keyboardType='numeric' title={'نرخ'} value={this.state.SearchFields.ratenum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,ratenum: text}});}}/>
                            <PickerBox
                                name={'mothercomments'}
                                title={'نظر مادر'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.mothercomment}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,mothercomment: value}});
                                }}
                                options={this.state.mothercommentOptions}
                            />
                            <PickerBox
                                name={'users'}
                                title={'کاربر'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.user}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,user: value}});
                                }}
                                options={this.state.userOptions}
                            />
                            <PickerBox
                                name={'subjectentitys'}
                                title={'ذهنیت'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.subjectentity}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,subjectentity: value}});
                                }}
                                options={this.state.subjectentityOptions}
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
    