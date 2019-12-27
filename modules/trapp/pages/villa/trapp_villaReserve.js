import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import jMoment from "moment-jalaali";
import moment from "moment";
import {StyleSheet, View, ScrollView, Dimensions, Linking, Text, ImageBackground, Image, Switch,TextInput} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Constants from '../../../../classes/Constants';
import TextBox from '../../../../sweet/components/TextBox';
import PersianCalendarPicker from "react-native-persian-calendar-picker";
import TextRow from "../../../../sweet/components/TextRow";
import SweetButton from "../../../../sweet/components/SweetButton";
import SweetNavigation from '../../../../classes/sweetNavigation';
import SweetCalendarSelectPage from '../../../../sweet/components/SweetCalendarSelectPage';
import SwitchRow from '../../../../sweet/components/SwitchRow';
import trapp_villaReserveStyles from '../../values/styles/trapp_villaReserveStyles';
import NumberFormat from "react-number-format";
import User from '../../../users/classes/User';
export default class  trapp_villaReserve extends SweetCalendarSelectPage {

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
            guestcountnum:'0',
            reservedDays:[],
            nonFreeOptions:global.VillaNonFreeOptions[global.villaID],
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
    getGuestsPrice()
    {
        return this.state.guestcountnum*400000*this.state.duration;
    }
    render() {
        let priceSum=this.state.price;
        let Options=this.state.nonFreeOptions;
        let OptionsCount=Options.length;
        let NonFreeOptionViews=[];
        let NonFreeOptionViewIndex=0;

        for(let i=0;i<OptionsCount;i++)
        {
            let item=Options[i];
            if(item.maxcountnum>0)
            {
                if(item.countnum>0)
                    priceSum+=item.pricenum*this.state.duration;
                NonFreeOptionViews[NonFreeOptionViewIndex++]=<FactorItem  title={item.name}
                                                                          count={this.state.duration}
                                                                          price={item.pricenum*this.state.duration*0.1} onSwitchValueChange={value=>{
                    item.countnum=value?"1":"0";
                    Options[i]=item;
                    this.setState({nonFreeOptions:Options});
                }} content={item.countnum!=null && item.countnum>0}/>;
            }

        }
        priceSum+=this.getGuestsPrice();
        const {height: heightOfDeviceScreen} = Dimensions.get('window');

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
                            <FactorItem  title={'ویلای کد'+global.villaID} count={this.state.duration} price={this.state.price*0.1} />
                            {/*<FactorItem  title={'مهمان'} count={this.state.duration} price={this.state.price} />*/}
                            <View style={trapp_villaReserveStyles.factorItemContainer}>
                                <Text style={trapp_villaReserveStyles.factorItemTitle}>مهمان </Text>
                                <View style={trapp_villaReserveStyles.factorItemTextBoxContainer}>
                                    <TextInput  selectTextOnFocus={true} keyboardType='numeric' style={trapp_villaReserveStyles.factorItemTextBox} onChangeText={text=>{this.setState({guestcountnum:text});}} value={this.state.guestcountnum+""} />
                                    <Text style={trapp_villaReserveStyles.factorItemTextBoxTitle}>{"نفر"} </Text>
                                </View>
                                <NumberFormat value={this.getGuestsPrice()*0.1} displayType={'text'} thousandSeparator={true}
                                              renderText={value =><Text style={trapp_villaReserveStyles.factorItemPrice}>{(value)+" "+"تومان"} </Text> } />

                            </View>
                            {NonFreeOptionViews}
                            <FactorItem  title={'مجموع'}  price={priceSum*0.1}/>

                            {/*<TextRow title={'مدت اقامت:'} content={this.state.duration+' روز'}/>*/}
                            {/*<TextRow title={'مبلغ کل:'} content={this.state.price+' ریال'}/>*/}
                            {this.state.price>0 && <View  style={{marginTop: '3%'}}>
                                <SweetButton title='پرداخت وجه' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(onEnd) => {
                                    if (User.isUserLoggedIn()) {
                                        let formIsValid=true;
                                        if(formIsValid)
                                        {
                                            const data = new FormData();
                                            let id = '';
                                            if (global.villaID > 0)
                                                id = global.villaID;
                                            data.append('id', id);
                                            // Object.keys(this.state.nonFreeOptions).forEach(Item=>{
                                            //     data.append('nonfreeoptions', this.state.nonFreeOptions[Item]);
                                            //     data.append('optionmaxcount'+Item, this.state.nonFreeOptions[Item].maxcountnum);
                                            // });
                                            data.append('nonfreeoptions', JSON.stringify(this.state.nonFreeOptions));
                                            data.append('guestcountnum', this.state.guestcountnum);
                                            let method=SweetFetcher.METHOD_POST;
                                            new SweetFetcher().Fetch('/trapp/villa/reservestart/'+id+"?datestart="+this.state.selectedStartDate+"&duration="+this.state.duration, method, data, data => {
                                                if(data.hasOwnProperty('Data'))
                                                {
                                                    let transactionID=data.Data.transaction.transactionid;
                                                    this.openURL(Constants.SiteURL+"/financial/recharge/"+transactionID);
                                                    SweetNavigation.resetAndNavigateToNoDrawerPage(this.props.navigation,'Login');
                                                    onEnd(true);
                                                }
                                            },(err)=>{onEnd(false)},'trapp','villa',this.props.history);
                                        }

                                    }
                                    else
                                    {
                                        SweetNavigation.navigateToNoDrawerPage(this.props.navigation,'Login',{returnToPrevious:true,lastPage: 'trapp_villaReserve'})
                                        onEnd(true);
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
  class FactorItem extends Component<{}> {
    render() {
        return (
            <View style={trapp_villaReserveStyles.factorItemContainer}>
                {this.props.content != null &&
                <Switch style={trapp_villaReserveStyles.factorItemSwitch} value={this.props.content}
                        onValueChange={this.props.onSwitchValueChange}/>
                }
                <Text style={trapp_villaReserveStyles.factorItemTitle}>{this.props.title} </Text>
                <Text style={trapp_villaReserveStyles.factorItemCount}>{this.props.count!=null?this.props.count+" "+"شب":""} </Text>

                <NumberFormat value={this.props.price} displayType={'text'} thousandSeparator={true}
                              renderText={value =><Text style={trapp_villaReserveStyles.factorItemPrice}>{value+" "+"تومان"} </Text> } />

            </View>);
    }
}
