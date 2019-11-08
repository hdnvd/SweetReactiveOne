import React from 'react'
import { Button } from 'react-native-elements';
import {StyleSheet, View, Dimensions,Image,TouchableWithoutFeedback,Text,Picker,TextInput,ScrollView,FlatList} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import SweetListPage from '../../../../sweet/components/SweetListPage';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import ListTopBar from '../../../../sweet/components/ListTopBar';
import PageContainer from '../../../../sweet/components/PageContainer';
import TextRow from '../../../../sweet/components/TextRow';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import TimeSelector from '../../../../sweet/components/TimeSelector';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import Comments_tempuserSearch from './Comments_tempuserSearch';
import comments_tempuserListStyles from '../../values/styles/tempuser/comments_tempuserListStyles';
import comments_tempuserListController from '../../controllers/tempuser/comments_tempuserListController';
import LogoTitle from '../../../../components/LogoTitle';
import jMoment from 'moment-jalaali';
import moment from 'moment';


export default class comments_tempuserList extends SweetListPage {
    state =
    {
        ...super.state,
        tempusers:[],
        searchFields:null,
        sortField: comments_tempuserListController.SORTFIELD_ID,
    };
    async componentDidMount() {
        this._loadData(true, false);
    }
    _loadData=(isRefreshing, forceHideSearchPage)=>{
        let {nextStartRow,tempusers}=this.state;
        if(isRefreshing)
        {
            tempusers=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true},()=>{
            new comments_tempuserListController().loadData(this.state.searchText, this.state.searchFields, nextStartRow, this.state.sortField, (data) => {
            if (forceHideSearchPage) {
               this.removeBackHandler();
            }
                this.setState({
                    tempusers: [...tempusers, ...data],
                    nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                    isLoading: false,
                    isRefreshing: false,
                    displaySearchPage: forceHideSearchPage ? false : this.state.displaySearchPage,
                });
                
            });
            
        });
    };
    render() {
            const renderListItem=({item}) =>{
                        return <TouchableWithoutFeedback onPress={() => {
                                global.tempuserID=item.id;
                                this.props.navigation.navigate('comments_tempuserManage', { name: 'comments_tempuserManage' });
                            }}>
                            <View style={generalStyles.ListItem}>
                            
                <Text style={generalStyles.simplelabel}>{item.name}</Text>
                <Text style={generalStyles.simplelabel}>{item.family}</Text>
                <Text style={generalStyles.simplelabel}>{item.mobilenum}</Text>
                <Text style={generalStyles.simplelabel}>{item.email}</Text>
                <Text style={generalStyles.simplelabel}>{item.telnum}</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        };//renderListItem
            const content=<View style={{flex: 1}}>
                    {this.state.displaySearchPage &&
                    <Comments_tempuserSearch dataLoader={searchFields=>{
                            this.setState({searchFields: searchFields}, () => {
                                this._loadData(true, true);
                            });
                        }}
                    />
                    }
                    {!this.state.displaySearchPage &&
                    <View style={generalStyles.listcontainer}>
                {this._getTopBar([{id:comments_tempuserListController.SORTFIELD_ID,name: 'جدیدترین ها'}])}
                <PageContainer isLoading={this.state.isLoading}
                               isEmpty={this.state.tempusers == null || this.state.tempusers.length == 0}>
                               <View style={generalStyles.listcontainer}>
                    {this._getFlatList(this.state.comments_tempuserListController,renderListItem)}
                </View>
                </PageContainer>

                    </View>
                }
                </View>
    }
}
    