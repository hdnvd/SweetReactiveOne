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
import Comments_commentSearch from './Comments_commentSearch';
import comments_commentListStyles from '../../values/styles/comment/comments_commentListStyles';
import comments_commentListController from '../../controllers/comment/comments_commentListController';
import LogoTitle from '../../../../components/LogoTitle';
import jMoment from 'moment-jalaali';
import moment from 'moment';


export default class comments_commentList extends SweetListPage {
    state =
    {
        ...super.state,
        comments:[],
        searchFields:null,
        sortField: comments_commentListController.SORTFIELD_ID,
    };
    async componentDidMount() {
        this._loadData(true, false);
    }
    _loadData=(isRefreshing, forceHideSearchPage)=>{
        let {nextStartRow,comments}=this.state;
        if(isRefreshing)
        {
            comments=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true},()=>{
            new comments_commentListController().loadData(this.state.searchText, this.state.searchFields, nextStartRow, this.state.sortField, (data) => {
            if (forceHideSearchPage) {
               this.removeBackHandler();
            }
                this.setState({
                    comments: [...comments, ...data],
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
                                global.commentID=item.id;
                                this.props.navigation.navigate('comments_commentManage', { name: 'comments_commentManage' });
                            }}>
                            <View style={generalStyles.ListItem}>
                            
                <Text style={generalStyles.simplelabel}>{item.text}</Text>
                <Text style={generalStyles.simplelabel}>{item.commenttypecontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.publishtime}</Text>
                <Text style={generalStyles.simplelabel}>{item.ratenum}</Text>
                <Text style={generalStyles.simplelabel}>{item.tempusercontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.mothercommentcontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.usercontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.subjectentitycontent}</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        };//renderListItem
            const content=<View style={{flex: 1}}>
                    {this.state.displaySearchPage &&
                    <Comments_commentSearch dataLoader={searchFields=>{
                            this.setState({searchFields: searchFields}, () => {
                                this._loadData(true, true);
                            });
                        }}
                    />
                    }
                    {!this.state.displaySearchPage &&
                    <View style={generalStyles.listcontainer}>
                {this._getTopBar([{id:comments_commentListController.SORTFIELD_ID,name: 'جدیدترین ها'}])}
                <PageContainer isLoading={this.state.isLoading}
                               isEmpty={this.state.comments == null || this.state.comments.length == 0}>
                               <View style={generalStyles.listcontainer}>
                    {this._getFlatList(this.state.comments_commentListController,renderListItem)}
                </View>
                </PageContainer>

                    </View>
                }
                </View>
    }
}
    