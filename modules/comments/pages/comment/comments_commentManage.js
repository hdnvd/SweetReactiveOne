import React from 'react'

import comments_commentManageStyles from '../../values/styles/comment/comments_commentManageStyles';
import comments_commentManageController from '../../controllers/comment/comments_commentManageController';
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
import { TabView, SceneMap } from 'react-native-tab-view';

export default class  comments_commentManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات اظهار نظر'} />
        };
    };
    FirstRoute = () => (
        <View style={{flex:1, backgroundColor: '#ff4081' }} />
    );

    SecondRoute = () => (
        <View style={{flex:1, backgroundColor: '#673ab7' }} />
    );
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            formData:{},

			commenttypeOptions:null,
			mothercommentOptions:null,
			userOptions:null,
			subjectentityOptions:null,
            index:1,
            routes: [
                { key: 'first', title: 'First' },
                { key: 'second', title: 'Second' },
            ],
        };

        this.loadData();
    }
    loadData=()=>{

        this.loadCommenttypes();
        this.loadMothercomments();
        this.loadUsers();
        this.loadSubjectentitys();
        if(global.commentID!=null)
        {
            this.setState({isLoading:true},()=>{
                new comments_commentManageController().load(global.commentID,(data)=>{
                    this.setState({isLoading:false,formData:data});
                });
            });
        }
    };

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
        let Window = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >

                  <View style={{height:this.getManagementPageHeight()}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                        <View style={generalStyles.container}>

                            <TextBox title={'متن'} value={this.state.formData.text} onChangeText={(text) => {this.setState({formData:{...this.state.formData,text: text}});}}/>
                            <PickerBox
                                name={'commenttypes'}
                                title={'چگونه نوع'}
                                selectedValue ={this.state.formData.commenttype}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,commenttype: value}});
                                }}
                                options={this.state.commenttypeOptions}
                            />
                            <TextBox keyboardType='numeric' title={'نرخ'} value={this.state.formData.ratenum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,ratenum: text}});}}/>
                            <PickerBox
                                name={'mothercomments'}
                                title={'نظر مادر'}
                                selectedValue ={this.state.formData.mothercomment}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,mothercomment: value}});
                                }}
                                options={this.state.mothercommentOptions}
                            />
                            <PickerBox
                                name={'users'}
                                title={'کاربر'}
                                selectedValue ={this.state.formData.user}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,user: value}});
                                }}
                                options={this.state.userOptions}
                            />
                            <PickerBox
                                name={'subjectentitys'}
                                title={'ذهنیت'}
                                selectedValue ={this.state.formData.subjectentity}
                                onValueChange={(value, index) => {
                                    this.setState({formData:{...this.state.formData,subjectentity: value}});
                                }}
                                options={this.state.subjectentityOptions}
                            />

                            <TabView
                                renderTabBar = {props =>{
                                    return <Text>First</Text>;
                                }}
                                navigationState={this.state}
                                renderScene={SceneMap({
                                    first: this.FirstRoute,
                                    second: this.SecondRoute,
                                })}
                                onIndexChange={index => this.setState({ index })}
                                initialLayout={{ width: Dimensions.get('window').width }}
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
                                        new comments_commentManageController().save(global.commentID,data,(data)=>{
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
