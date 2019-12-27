import React, {Component} from 'react';
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
    FlatList, ImageBackground,
} from 'react-native';
import jMoment from 'moment-jalaali';
import moment from 'moment';

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
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import SweetDate from '../../../../classes/SweetDate';
import LogoTitle from '../../../../components/LogoTitle';
import SweetPage from '../../../../sweet/components/SweetPage';
import SweetConsole from '../../../../classes/SweetConsole';
import SweetCalendarSelectPage from '../../../../sweet/components/SweetCalendarSelectPage';
import SweetAlert from '../../../../classes/SweetAlert';
import SweetSelectorModal from '../../../../sweet/components/SweetSelectorModal';
import trapp_villaReservationInfoController from '../../controllers/trapp_villaReservationInfoController';
import SweetButton from '../../../../sweet/components/SweetButton';
import SweetModal from '../../../../sweet/components/SweetModal';
import trapp_villaReservationInfoStyles from '../../values/styles/trapp_villaReservationInfoStyles';


export default class trapp_villaReservationInfo extends SweetCalendarSelectPage {
    state =
        {
            ...super.state,
            orders: [],
            LastSearchFields: null,
            nextStartRow: 0,
            SearchText: '',
            isLoading: false,
            isRefreshing: false,
            displaySearchPage: false,
            reservedDays: [],
            displayRangeActionSelect: false,
            displayOwnerItemActionSelect: [],
            displayReservedItemActionSelect: [],
            reservedbyusersdays: [],
            reservedbyownerdays: [],
            modalVisible: [],
        };

    onFullRangeSelect() {
        this.setState({displayRangeActionSelect: true});
    }

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
        if (filterString != '') {
            filterString = '?' + filterString;
        }
        let url = '/trapp/order/villa' + filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, data => {
            let reservedDays = data.Data.reserveddays.map(dt => moment.unix(dt));
            let reservedbyusersdays = data.Data.reservedbyusersdays.map(dt => moment.unix(dt));
            let reservedbyownerdays = data.Data.reservedbyownerdays.map(dt => moment.unix(dt));
            this.setState({
                orders: [...orders, ...data.Data.orders],
                nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                isLoading: false,
                isRefreshing: false,
                reservedDays: reservedDays,
                reservedbyownerdays: reservedbyownerdays,
                reservedbyusersdays: reservedbyusersdays,
                SearchText: SearchText,

            });
        });
    };

    getUserItemModal(item) {
        return <SweetModal visible={this.state.displayReservedItemActionSelect[item.id] === true} onHideRequest={() => {
            this.changeReservedItemActionSelectDisplayState(item.id, false);
        }
        }>

            <View style={trapp_villaReservationInfoStyles.villaInfo}>
                <Text style={trapp_villaReservationInfoStyles.grouptitle}>اطلاعات رزرو</Text>
                <Text style={trapp_villaReservationInfoStyles.simplelabel}>مبلغ پرداختی:{item.priceprc} ریال</Text>
                <Text style={trapp_villaReservationInfoStyles.simplelabel}>تعداد مهمان:{item.guestcountnum}</Text>
                {item.villanonfreeoptions != null &&
                <View>
                    <Text style={trapp_villaReservationInfoStyles.grouptitle}>امکانات ویژه</Text>
                    {item.villanonfreeoptions.map(nfo => {
                        console.log(nfo);
                        return <View><Text style={trapp_villaReservationInfoStyles.simplelabel}>{nfo.option.name} به مدت {nfo.daysnum} شب</Text>
                            </View>;

                    })}
                </View>
                }
                <Text style={trapp_villaReservationInfoStyles.grouptitle}>اطلاعات رزرو کننده</Text>
                <Text style={trapp_villaReservationInfoStyles.simplelabel}>نام رزرو کننده:{item.username}</Text>
                <Text style={trapp_villaReservationInfoStyles.simplelabel}>تلفن رزرو کننده:{item.userphone}</Text>
                {/*<SweetButton title={'مشاهده ویلا'} style={trapp_villaReservationInfoStyles.button} onPress={(onEnd) => {*/}
                {/*    onEnd(true);*/}
                {/*    global.villaID = item.villa;*/}
                {/*    this.props.navigation.navigate('trapp_villaView', {name: 'trapp_villaView'});*/}
                {/*    this.changeReservedItemActionSelectDisplayState(item.id, false);*/}
                {/*}}/>*/}
            </View>
        </SweetModal>;
    }

    changeOwnerItemActionSelectDisplayState(id, isVisible) {
        let mv = this.state.displayOwnerItemActionSelect;
        mv[id] = isVisible;
        this.setState({displayOwnerItemActionSelect: mv});
    }

    changeReservedItemActionSelectDisplayState(id, isVisible) {
        let mv = this.state.displayReservedItemActionSelect;
        mv[id] = isVisible;
        this.setState({displayReservedItemActionSelect: mv});
    }

    getOwnerReservedItem(item) {
        return <TouchableWithoutFeedback onPress={() => {
            this.changeOwnerItemActionSelectDisplayState(item.id, true);

        }}>
            <View style={generalStyles.ListItem}>
                {this.getOwnerItemActionSelectModal(item)}
                <View style={{flexDirection: 'row'}}>

                    <View style={trapp_villaReservationInfoStyles.itemLeftOwner}>
                        <Text style={trapp_villaReservationInfoStyles.itemLeftTitle}>تاریخ شروع:</Text>
                        <Text
                            style={trapp_villaReservationInfoStyles.itemLeftContent}>{jMoment.utc(moment.unix(item.startdate)).format('jYYYY/jMM/jDD')}</Text>
                        <Text style={trapp_villaReservationInfoStyles.itemLeftTitle}>مدت:</Text>
                        <Text style={trapp_villaReservationInfoStyles.itemLeftContent}>{item.durationnum} روز</Text>

                    </View>
                    <View style={trapp_villaReservationInfoStyles.itemRight}>
                        <Text style={generalStyles.simplelabel}>عدم سرویس دهی توسط میزبان</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>;
    }

    getReservedItem(item) {
        return <TouchableWithoutFeedback onPress={() => {
            this.changeReservedItemActionSelectDisplayState(item.id, true);
        }}>
            <View style={generalStyles.ListItem}>
                {this.getUserItemModal(item)}
                <View style={{flexDirection: 'row'}}>

                    <View style={trapp_villaReservationInfoStyles.itemLeft}>
                        <Text style={trapp_villaReservationInfoStyles.itemLeftTitle}>تاریخ شروع اقامت:</Text>
                        <Text
                            style={trapp_villaReservationInfoStyles.itemLeftContent}>{jMoment.utc(moment.unix(item.startdate)).format('jYYYY/jMM/jDD')}</Text>
                        <Text style={trapp_villaReservationInfoStyles.itemLeftTitle}>مدت اقامت:</Text>
                        <Text style={trapp_villaReservationInfoStyles.itemLeftContent}>{item.durationnum} روز</Text>

                    </View>
                    <View style={trapp_villaReservationInfoStyles.itemRight}>
                        <Text style={generalStyles.simplelabel}>نام رزرو
                            کننده:{item.usercontent}</Text>
                        <Text style={generalStyles.simplelabel}>مبلغ
                            پرداختی:{item.priceprc} ریال</Text>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>;
    }

    getDateActionSelectModal() {
        return <SweetSelectorModal
            options={[{id: '1', title: 'ثبت عدم سرویس دهی'}]}
            onValueChange={(option) => {
                if (option.id == '1') {
                    trapp_villaReservationInfoController.saveRangeServiceState(global.itemID, this.state.selectedStartDate, this.state.duration, false, (a) => {
                        console.log(this.state);
                        this._loadData('', null, true);
                    }, (a) => {
                    });
                } else {
                    // SweetAlert.displaySimpleAlert('KEY:', option.id);
                }
            }}
            onHideRequest={() => {
                this.setState({displayRangeActionSelect: false});
            }}
            visible={this.state.displayRangeActionSelect}/>;
    }

    getOwnerItemActionSelectModal(item) {
        return <SweetSelectorModal
            options={[{id: '1', title: 'حذف و اعلام سرویس دهی در این مدت'}]}
            onValueChange={(option) => {
                if (option.id == '1') {
                    trapp_villaReservationInfoController.deleteOrder(global.itemID, item.id, (a) => {
                        this._loadData('', null, true);

                    }, (a) => {
                    });
                }
            }}
            onHideRequest={() => {
                this.changeOwnerItemActionSelectDisplayState(item.id, false);
            }}
            visible={this.state.displayOwnerItemActionSelect[item.id] === true}/>;
    }

    /****************************مدیریت ویلا*************************/
    render() {
        let reservedByUsersDaysStyles = this.state.reservedbyusersdays.map(dt => {
            return {date: dt, textStyle: trapp_villaReservationInfoStyles.datepickerByUser};
        });
        let reservedbyownerdaysStyles = this.state.reservedbyownerdays.map(dt => {
            return {date: dt, textStyle: trapp_villaReservationInfoStyles.datepickerByOwner};
        });

        return (<View style={{flex: 1}}>
                {!this.state.displaySearchPage &&
                <ImageBackground source={require('../../../../images/managementBG.png')}
                                 style={{width: '100%', height: '100%'}}>

                    <View style={generalStyles.listcontainer}>
                        {this.getDateActionSelectModal()}
                        <View style={generalStyles.datepickercontainer}>

                            <PersianCalendarPicker
                                isRTL={true}
                                style={generalStyles.datepickercontainer}
                                scaleFactor={500}
                                onDateChange={this.onDateChange}
                                allowRangeSelection={true}
                                customDatesStyles={reservedByUsersDaysStyles.concat(reservedbyownerdaysStyles)}
                                selectedRangeStartStyle={generalStyles.selectedStartDate}
                                selectedRangeEndStyle={generalStyles.selectedEndDate}
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
                                renderItem={({item}) => {
                                    if (item.orderstatus == 2) {
                                        return this.getReservedItem(item);
                                    } else {
                                        return this.getOwnerReservedItem(item);
                                    }
                                }


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
