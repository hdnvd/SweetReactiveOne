import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import jMoment from "moment-jalaali";
import moment from "moment";
import {StyleSheet, View, ScrollView, Dimensions, Linking, Text, ImageBackground} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Constants from '../../../../classes/Constants';
import TextBox from '../../../../sweet/components/TextBox';
import PersianCalendarPicker from "react-native-persian-calendar-picker";
import TextRow from "../../../../sweet/components/TextRow";
import SweetButton from "../../../../sweet/components/SweetButton";
import Navigation from '../../../../classes/navigation';
export default class  trapp_villaReserve extends Component<{}> {

    constructor(props) {
        super(props);
        this.state =
        {
            ...super.state,
            isLoading:false,
            roomcount:'',
            duration:'1',
            selectedStartDate: null,
            selectedStartTimeStamp: null,
            selectedEndDate: null,
            price:0,
            reservedDays:[],
        };

        this._loadData();
    }

    onFullRangeSelect()
    {
        this.CalculatePrice(this.state.selectedStartDate,this.state.duration);
    }
    _loadData=()=>{
        let url1 = '/trapp/villa/'+global.villaID+'/reserveddays';
        new SweetFetcher().Fetch(url1, SweetFetcher.METHOD_GET, null, data => {
            let resD=data.Data.dates.map(dt=>moment.unix(dt));
            this.setState({
                reservedDays:resD
            });
        });
    };
    openURL = (URL) => {
        Linking.canOpenURL(URL).then(supported => {
            if (supported) {
                Linking.openURL(URL);
            } else {
                console.log("Don't know how to open URI: " + URL);
            }
        });
    };
    CalculatePrice=(selectedStartDate,Duration)=>
    {
        let formIsValid=true;
        if(formIsValid)
        {
            const data = new FormData();
            let id = '';
            if (global.villaID > 0)
                id = global.villaID;
            data.append('id', id);
            let method=SweetFetcher.METHOD_GET;
            new SweetFetcher().Fetch('/trapp/villa/price/'+id+"?datestart="+selectedStartDate+"&duration="+Duration, method, data, data => {
                if(data.hasOwnProperty('Data'))
                {
                    this.setState({price:data.Data.price});
                }
            },null,'trapp','villa',this.props.history);
        }
    };
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        // alert(jMoment.utc(1559566238895).format('jYYYY/jM/jD [is] YYYY/M/D'));
            return (
                <View style={{flex: 1}}>

                    <ImageBackground source={require('../../../../images/managementBG.png')} style={{width: '100%', height: '100%',
                        position: 'relative',
                        zIndex:2,}}>
                        <View>
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.containerWithNoBG}>
                            <Text style={generalStyles.inputLabel}>تاریخ شروع و اتمام اقامت</Text>
                            <View style={generalStyles.datepickercontainer}>
                                <PersianCalendarPicker
                                    isRTL={true}
                                    style={generalStyles.datepickercontainer}
                                    scaleFactor={500}
                                    onDateChange={this.onDateChange}
                                    allowRangeSelection={true}
                                    customDatesStyles={this.state.reservedDays.map(dt=>{
                                        return {date:dt,textStyle:generalStyles.datepickerCustom}
                                    })}
                                    selectedRangeStartStyle={generalStyles.selectedStartDate}
                                    selectedRangeEndStyle={generalStyles.selectedEndDate}
                                    textStyle={generalStyles.datepickertext}
                                />
                            </View>
                            <TextRow title={'مدت اقامت:'} content={this.state.duration+' روز'}/>
                            <TextRow title={'مبلغ کل:'} content={this.state.price+' ریال'}/>
                            {this.state.price>0 && <View  style={{marginTop: '3%'}}>
                                <SweetButton title='پرداخت وجه' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(onEnd) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        let id = '';
                                        if (global.villaID > 0)
                                            id = global.villaID;
                                        data.append('id', id);
                                        let method=SweetFetcher.METHOD_GET;
                                        new SweetFetcher().Fetch('/trapp/villa/reservestart/'+id+"?datestart="+this.state.selectedStartDate+"&duration="+this.state.duration, method, data, data => {
                                            if(data.hasOwnProperty('Data'))
                                            {
                                                let transactionID=data.Data.transaction.transactionid;
                                                this.openURL(Constants.SiteURL+"/financial/recharge/"+transactionID);
                                                this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('Login'));
                                                onEnd(true);
                                                // console.log('/financial/recharge/'+transactionID);
                                            }
                                        },(err)=>{onEnd(false)},'trapp','villa',this.props.history);
                                    }
                                }}/>
                            </View>
                            }

                        </View>
                    </ScrollView>
                        </View>
                    </ImageBackground>
                </View>
            )
    }
}
