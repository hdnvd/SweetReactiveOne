import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    BackHandler,
    Alert,
    Dimensions,
    AsyncStorage,
    Image,
    TouchableWithoutFeedback,
    Text,
    Picker,
    TextInput,
    ScrollView,
    FlatList, TouchableHighlight, ImageBackground
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import SweetButton from '../../../../sweet/components/SweetButton';
import PersianCalendarPicker from "react-native-persian-calendar-picker";
import jMoment from "moment-jalaali";
import TextRow from "../../../../sweet/components/TextRow";


export default class Trapp_villaSearch extends Component<{}> {
    state =
        {
            SearchFields: {

                roomcountnum:'',
                capacitynum:'',
                maxguestsnum:'',
                structureareanum:'',
                totalareanum:'',
                viewtype:'',
                structuretype:'',
                owningtype:'',
                descriptionte:'',
                normalpriceprc:'',
                holidaypriceprc:'',
                weeklyoffnum:'',
                monthlyoffnum:'',
                selectedCityValue: '-1',
                selectedStartDate: null,
                selectedStartTimeStamp: null,
                selectedEndDate: null,
                days: '1',
            },
            allOptions:{
                areatypes:[],
                structuretypes:[],
                owningtypes:[],
                viewtypes:[],
            },
            showMoreOptions: false,
        };
    onDateChange(date,type) {
        let DateString=jMoment.utc(date).format("jYYYY/jMM/jDD");
        if(type==='START_DATE')
            this.setState({SearchFields: {...this.state.SearchFields, selectedStartDate: DateString,selectedEndDate:null,selectedStartTimeStamp:date}});
        else
        {
            const dayLength=3600*24*1000;
            let Duration=parseInt((date-this.state.SearchFields.selectedStartTimeStamp)/dayLength);
            this.setState({SearchFields: {...this.state.SearchFields,selectedEndDate:DateString,days:Duration+""}});
        }
    }
    async componentDidMount() {
        this.loadAllOptions();
        this.onDateChange = this.onDateChange.bind(this);
    }
    loadAllOptions = () => {
        new SweetFetcher().Fetch('/trapp/villa/options/list', SweetFetcher.METHOD_GET, null, data => {
            this.setState({allOptions: data.Data});
        });
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        return (<View style={{flex: 1}}>

            <ImageBackground source={require('../../../../images/managementBG.png')} style={{width: '100%', height: '100%',
                position: 'relative',
                zIndex:2,}}>
                <View>
                <ScrollView contentContainerStyle={{minHeight: heightOfDeviceScreen || heightOfDeviceScreen}}>
                    <View style={generalStyles.containerWithNoBG}>
                        <Text style={generalStyles.inputLabel}>تاریخ شروع و اتمام اقامت</Text>
                        <View style={generalStyles.datepickercontainer}>
                            <PersianCalendarPicker
                                isRTL={true}
                                style={generalStyles.datepickercontainer}
                                scaleFactor={500}
                                onDateChange={this.onDateChange}
                                allowRangeSelection={true}
                                // disabledDates={this.state.reservedDays}
                                selectedRangeStartStyle={generalStyles.selectedStartDate}
                                selectedRangeEndStyle={generalStyles.selectedEndDate}
                                textStyle={generalStyles.datepickertext}
                            />
                        </View>
                        <TextRow title={'مدت اقامت:'} content={this.state.SearchFields.days+' روز'}/>

                        <CityAreaSelector
                            onCitySelected={(CityID) => this.setState({
                                SearchFields: {
                                    ...this.state.SearchFields,
                                    selectedCityValue: CityID
                                }
                            })}
                            displayAreaSelect={false}
                        />
                        {!this.state.showMoreOptions &&
                        <TouchableHighlight onPress={()=>{this.setState({showMoreOptions: true});}}
                            activeOpacity={0.3}
                            underlayColor='#ffffff'>
                            <Text style={Styles.text} >موارد بیشتر...</Text>
                            </TouchableHighlight>
                        }
                        {this.state.showMoreOptions &&
                        <View>
                            <TextBox keyboardType='numeric' title={'تعداد اتاق'}
                                     value={this.state.SearchFields.roomcountnum} onChangeText={(text) => {
                                this.setState({SearchFields: {...this.state.SearchFields, roomcountnum: text}});
                            }}/>
                            <TextBox keyboardType='numeric' title={'ظرفیت به نفر'}
                                     value={this.state.SearchFields.capacitynum} onChangeText={(text) => {
                                this.setState({SearchFields: {...this.state.SearchFields, capacitynum: text}});
                            }}/>
                            <PickerBox
                                name={'viewtypes'}
                                title={'چشم انداز'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.viewtype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,viewtype: value}});
                                }}
                                options={this.state.allOptions.viewtypes}
                            />
                            <PickerBox
                                name={'structuretypes'}
                                title={'نوع ساختمان'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.structuretype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,structuretype: value}});
                                }}
                                options={this.state.allOptions.structuretypes}
                            />
                            <PickerBox
                                name={'owningtypes'}
                                title={'نوع اقامتگاه'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.owningtype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,owningtype: value}});
                                }}
                                options={this.state.allOptions.owningtypes}
                            />
                            <PickerBox
                                name={'areatypes'}
                                title={'بافت'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.areatype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,areatype: value}});
                                }}
                                options={this.state.allOptions.areatypes}
                            />
                        </View>
                        }
                        <SweetButton title={'جستجو'} onPress={(onEnd) => {
                            if (this.props.dataLoader != null) {
                                this.props.dataLoader(this.state.SearchFields);
                                onEnd(true);
                            }
                        }}/>
                        <SweetButton title={'بازگشت'} onPress={(onEnd) => {
                            if (this.props.dataLoader != null) {
                                this.props.dataLoader(null);
                                onEnd(true);
                            }
                        }}/>
                    </View>
                </ScrollView>
                </View>
            </ImageBackground>
            </View>
        );
    }
}

let Window = Dimensions.get('window');
const Styles = StyleSheet.create(
    {

        text:
            {

                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'IRANSansMobile',
            },
        viewBoxLogo:
            {
                width:Window.width*0.1,
                height:Window.width*0.1,
            },
    }
);
