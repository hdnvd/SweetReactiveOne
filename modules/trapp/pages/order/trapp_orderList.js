import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    AsyncStorage,
    Image,
    TouchableWithoutFeedback,
    Text,
    Picker,
    TextInput,
    ScrollView,
    FlatList
} from 'react-native';
const jMoment = require('moment-jalaali');
const moment = require('moment');
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Constants from '../../../../classes/Constants';
import SweetHttpRequest from '../../../../classes/sweet-http-request';


export default class trapp_orderList extends Component<{}> {
    state =
        {
            orders: [],
            LastSearchFields: null,
            nextStartRow: 0,
            SearchText: '',
            isLoading: false,
            isRefreshing: false,
            displaySearchPage: false,
        };

    async componentDidMount() {
        this._loadData('', null, true);
    }

    _loadData = (SearchText, SearchFields, isRefreshing) => {
        let {nextStartRow, orders} = this.state;
        if (isRefreshing) {
            orders = [];
            nextStartRow = 0;
        }
        this.setState({isRefreshing: isRefreshing, isLoading: true, LastSearchFields: SearchFields});
        let Request = new SweetHttpRequest();
        Request.appendVariablesFromObjectKeys(SearchFields);
        Request.appendVariable('__pagesize', Constants.DEFAULT_PAGESIZE);
        Request.appendVariable('__startrow', nextStartRow);
        Request.appendVariable('searchtext', SearchText);
        let filterString = Request.getParamsString();
        if (filterString != '') filterString = '?' + filterString;
        let url = '/trapp/order/user' + filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, data => {
            this.setState({
                orders: [...orders, ...data.Data],
                nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                isLoading: false,
                isRefreshing: false,
                SearchText: SearchText
            });
        });
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        return (<View style={{flex: 1}}>
                {!this.state.displaySearchPage &&

                <View style={generalStyles.listcontainer}>

                    <View style={generalStyles.listcontainer}>
                        <FlatList
                            data={this.state.orders}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => this._loadData(this.state.SearchText, this.state.LastSearchFields, false)}
                            onRefresh={() => this._loadData(this.state.SearchText, this.state.LastSearchFields, true)}
                            refreshing={this.state.isRefreshing}
                            keyExtractor={item => item.id}
                            onEndReachedThreshold={0.3}
                            renderItem={({item}) =>
                                <TouchableWithoutFeedback onPress={() => {
                                    global.villaID = item.villa;
                                    this.props.navigation.navigate('trapp_villaView', {name: 'trapp_villaView'});
                                }}>

                                    <View style={generalStyles.ListItem}>
                                        <View style={{flexDirection:'row'}}>

                                            <View style={Styles.itemLeft}>
                                                <Text style={{...StyleSheet.flatten(generalStyles.simplelabel),width:'100%',fontSize:10,textAlign: 'center'}}>تاریخ شروع اقامت:</Text>
                                                <Text style={{...StyleSheet.flatten(generalStyles.simplelabel),width:'100%',fontSize:20,textAlign: 'center',}}>{jMoment.utc(moment.unix(item.startdate)).format("jYYYY/jMM/jDD")}</Text>
                                                <Text style={{...StyleSheet.flatten(generalStyles.simplelabel),width:'100%',fontSize:10,textAlign: 'center'}}>مدت اقامت:</Text>
                                                <Text style={{...StyleSheet.flatten(generalStyles.simplelabel),width:'100%',fontSize:20,textAlign: 'center',}}>{item.durationnum} روز</Text>

                                            </View>
                                            <View style={Styles.itemRight}>
                                                <Text style={generalStyles.simplelabel}>کد ویلا:{item.villa}</Text>
                                                <Text style={generalStyles.simplelabel}>مبلغ پرداختی:{item.priceprc} ریال</Text>
                                                <Text style={generalStyles.simplelabel}>شهر:{item.villacontent}</Text>
                                                <Text style={generalStyles.simplelabel}>وضعیت:{item.orderstatuscontent}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        />
                    </View>
                </View>
                }
            </View>
        );
    }
}
let Window = Dimensions.get('window');
const Styles = StyleSheet.create(
    {
        itemLeft:{
            width: Window.width*0.3,
            height:'100%',
            backgroundColor:'#90e600',
            alignSelf:'flex-end',
            left:0,
        },
        itemRight:{
            width: Window.width*0.6,
            alignSelf:'flex-start',
            left:0,
        },
    }
);
