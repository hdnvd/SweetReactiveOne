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
import Carserviceorder_requestSearch from './Carserviceorder_requestSearch';
import carserviceorder_requestListStyles from '../../values/styles/request/carserviceorder_requestListStyles';
import carserviceorder_requestListController from '../../controllers/request/carserviceorder_requestListController';
import LogoTitle from '../../../../components/LogoTitle';
import jMoment from 'moment-jalaali';
import moment from 'moment';


export default class carserviceorder_requestList extends SweetListPage {
    state =
    {
        ...super.state,
        requests:[],
        searchFields:null,
        sortField: carserviceorder_requestListController.SORTFIELD_ID,
    };
    async componentDidMount() {
        this._loadData(true, false);
    }
    _loadData=(isRefreshing, forceHideSearchPage)=>{
        let {nextStartRow,requests}=this.state;
        if(isRefreshing)
        {
            requests=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true},()=>{
            new carserviceorder_requestListController().loadData(this.state.searchText, this.state.searchFields, nextStartRow, this.state.sortField, (data) => {
            if (forceHideSearchPage) {
               this.removeBackHandler();
            }
                this.setState({
                    requests: [...requests, ...data],
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
                                global.requestID=item.id;
                                this.props.navigation.navigate('carserviceorder_requestManage', { name: 'carserviceorder_requestManage' });
                            }}>
                            <View style={generalStyles.ListItem}>
                            
                <Text style={generalStyles.simplelabel}>{item.latitudeflt}</Text>
                <Text style={generalStyles.simplelabel}>{item.longitudeflt}</Text>
                <Text style={generalStyles.simplelabel}>{item.carmakeyearnum}</Text>
                <Text style={generalStyles.simplelabel}>{item.usercontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.carcontent}</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        };//renderListItem
            const content=<View style={{flex: 1}}>
                    {this.state.displaySearchPage &&
                    <Carserviceorder_requestSearch dataLoader={searchFields=>{
                            this.setState({searchFields: searchFields}, () => {
                                this._loadData(true, true);
                            });
                        }}
                    />
                    }
                    {!this.state.displaySearchPage &&
                    <View style={generalStyles.listcontainer}>
                {this._getTopBar([{id:carserviceorder_requestListController.SORTFIELD_ID,name: 'جدیدترین ها'}])}
                <PageContainer isLoading={this.state.isLoading}
                               isEmpty={this.state.requests == null || this.state.requests.length == 0}>
                               <View style={generalStyles.listcontainer}>
                    {this._getFlatList(this.state.carserviceorder_requestListController,renderListItem)}
                </View>
                </PageContainer>

                    </View>
                }
                </View>
    }
}
    