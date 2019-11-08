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
import Carserviceorder_carmakerSearch from './Carserviceorder_carmakerSearch';
import carserviceorder_carmakerListStyles from '../../values/styles/carmaker/carserviceorder_carmakerListStyles';
import carserviceorder_carmakerListController from '../../controllers/carmaker/carserviceorder_carmakerListController';
import LogoTitle from '../../../../components/LogoTitle';
import jMoment from 'moment-jalaali';
import moment from 'moment';


export default class carserviceorder_carmakerList extends SweetListPage {
    state =
    {
        ...super.state,
        carmakers:[],
        searchFields:null,
        sortField: carserviceorder_carmakerListController.SORTFIELD_ID,
    };
    async componentDidMount() {
        this._loadData(true, false);
    }
    _loadData=(isRefreshing, forceHideSearchPage)=>{
        let {nextStartRow,carmakers}=this.state;
        if(isRefreshing)
        {
            carmakers=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true},()=>{
            new carserviceorder_carmakerListController().loadData(this.state.searchText, this.state.searchFields, nextStartRow, this.state.sortField, (data) => {
            if (forceHideSearchPage) {
               this.removeBackHandler();
            }
                this.setState({
                    carmakers: [...carmakers, ...data],
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
                                global.carmakerID=item.id;
                                this.props.navigation.navigate('carserviceorder_carmakerManage', { name: 'carserviceorder_carmakerManage' });
                            }}>
                            <View style={generalStyles.ListItem}>
                            
                <Text style={generalStyles.simplelabel}>{item.title}</Text>
                <Image style={generalStyles.listitemthumbnail} source={{uri: Constants.ServerURL+'/'+item.logoigu}}/>

                            </View>
                            </TouchableWithoutFeedback>
                        };//renderListItem
            const content=<View style={{flex: 1}}>
                    {this.state.displaySearchPage &&
                    <Carserviceorder_carmakerSearch dataLoader={searchFields=>{
                            this.setState({searchFields: searchFields}, () => {
                                this._loadData(true, true);
                            });
                        }}
                    />
                    }
                    {!this.state.displaySearchPage &&
                    <View style={generalStyles.listcontainer}>
                {this._getTopBar([{id:carserviceorder_carmakerListController.SORTFIELD_ID,name: 'جدیدترین ها'}])}
                <PageContainer isLoading={this.state.isLoading}
                               isEmpty={this.state.carmakers == null || this.state.carmakers.length == 0}>
                               <View style={generalStyles.listcontainer}>
                    {this._getFlatList(this.state.carserviceorder_carmakerListController,renderListItem)}
                </View>
                </PageContainer>

                    </View>
                }
                </View>
    }
}
    