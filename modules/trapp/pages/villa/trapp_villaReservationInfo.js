import React, {Component} from 'react'
import {Button} from 'react-native-elements';
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
    FlatList,ImageBackground
} from 'react-native';
import jMoment from "moment-jalaali";
import moment from "moment";

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
import CheckedRow from '../../../../sweet/components/CheckedRow';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import PersianCalendarPicker from "react-native-persian-calendar-picker";
import SweetDate from "../../../../classes/SweetDate";
import LogoTitle from "../../../../components/LogoTitle";
import SweetPage from "../../../../sweet/components/SweetPage";
import SweetConsole from '../../../../classes/SweetConsole';


export default class trapp_villaReservationInfo extends SweetPage{
    state =
        {
            orders: [],
            LastSearchFields: null,
            nextStartRow: 0,
            SearchText: '',
            isLoading: false,
            isRefreshing: false,
            displaySearchPage: false,
            reservedDays:[],
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
        // let url1 = '/trapp/villa/'+global.itemID+'/reserveddays';
        // new SweetFetcher().Fetch(url1, SweetFetcher.METHOD_GET, null, data => {
        //     let resD=data.Data.dates.map(dt=>moment.unix(dt));
        //     this.setState({
        //         reservedDays:resD
        //     });
        // });
        this.setState({isRefreshing: isRefreshing, isLoading: true, LastSearchFields: SearchFields});
        let Request = new SweetHttpRequest();
        Request.appendVariablesFromObjectKeys(SearchFields);
        Request.appendVariable('__pagesize', Constants.DEFAULT_PAGESIZE);
        Request.appendVariable('__startrow', nextStartRow);
        Request.appendVariable('searchtext', SearchText);
        let filterString = Request.getParamsString();
        if (filterString != '') filterString = '?' + filterString;
        let url = '/trapp/order/villa' + filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, data => {
            let reservedDays=data.Data.reserveddays.map(dt=>moment.unix(dt));
            this.setState({
                orders: [...orders, ...data.Data.orders],
                nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                isLoading: false,
                isRefreshing: false,
                reservedDays:reservedDays,
                SearchText: SearchText
            });
        });
    };

    render() {
        SweetConsole.log(this.state.reservedDays);
        // alert(SweetDate.getCurrentTimeJMomentFromDateTimeStamp('1560124800').format("jYYYY/jMM/jDD"));
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        return (<View style={{flex: 1}}>
                {!this.state.displaySearchPage &&
                <ImageBackground source={require('../../../../images/managementBG.png')} style={{width: '100%', height: '100%'}}>

                <View style={generalStyles.listcontainer}>
                    <View style={generalStyles.datepickercontainer}>
                        <PersianCalendarPicker
                            isRTL={true}
                            style={generalStyles.datepickercontainer}
                            scaleFactor={500}
                            onDateChange={this.onDateChange}
                            disabledDates={this.state.reservedDays}
                            textStyle={generalStyles.datepickertext}
                        />
                    </View>
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
                                    global.itemID = item.villa;
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
                                                {/*<Text style={generalStyles.simplelabel}>وضعیت:{item.orderstatuscontent}</Text>*/}
                                                {/*<Text style={generalStyles.simplelabel}>مدت اقامت:{item.durationnum} روز</Text>*/}
                                                <Text style={generalStyles.simplelabel}>نام رزرو
                                                    کننده:{item.usercontent}</Text>
                                                <Text style={generalStyles.simplelabel}>مبلغ پرداختی:{item.priceprc} ریال</Text>
                                            </View>
                                            </View>

                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        />
                    </View>
                </View>
                </ImageBackground>
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
