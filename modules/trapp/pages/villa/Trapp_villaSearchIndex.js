import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Image,
    Text,
    TextInput,
    ScrollView,TouchableOpacity ,
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetButton from '../../../../sweet/components/SweetButton';
import jMoment from 'moment-jalaali';
import villaSearchIndexStyles from '../../values/styles/villaSearchIndexStyles';
import SweetDatePickerModal from '../../../../sweet/components/SweetDatePickerModal';
import PlaceManager from '../../../placeman/classes/PlaceManager';
import SweetAlert from '../../../../classes/SweetAlert';

export default class Trapp_villaSearchIndex extends Component<{}> {
    state =
        {
            startdatemodalvisible: false,
            enddatemodalvisible: false,
            startdate: '',
            selectedStartTimeStamp:0,
            enddate: '',
            selectedEndTimeStamp:0,
            visibleSearch: false,
            inputy: 0,
            inputContainerY: 0,
            findText: '',
            selectedCityID:-1,
            selectedProvinceID:-1,
        };
    async componentDidMount() {
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
    }
    onStartDateChange(date, type) {
        let DateString = jMoment.utc(date).format('jYYYY/jMM/jDD');
        this.setState({startdatemodalvisible: false, startdate: DateString,selectedStartTimeStamp:date});
    }
    onEndDateChange(date, type) {
        let DateString = jMoment.utc(date).format('jYYYY/jMM/jDD');
        this.setState({enddatemodalvisible: false, enddate: DateString,selectedEndTimeStamp:date});
    }
    render() {
        let data = null;
        if (global.provinces != null && this.state.findText.length>1) {
            data =PlaceManager.findPlaces(this.state.findText);
        }
        let Window = Dimensions.get('window');
        return (<View style={{flex: 1}}>
                {this.state.visibleSearch && this.state.findText.length >= 2 &&
                <View style={{
                    backgroundColor: '#fff', width: '80%', height: 170, justifyContent: 'center', alignSelf: 'center',
                    shadowColor: '#1f1f1f',
                    position: 'absolute',
                    top: this.state.inputy + this.state.inputContainerY - 180,
                    zIndex: 2,
                    shadowOffset: {
                        width: 5,
                        height: 5,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 2.22,
                    elevation: 5,
                    borderRadius: 15,
                }}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flexGrow: 1}}>
                        <View style={{justifyContent: 'center', height: '100%', flex: 1}}>
                            {data != null && data.length > 0 &&
                            <View>

                                <View>
                                    <Text style={{textAlign: 'center', fontFamily: 'IRANSansMobile'}}>استان ها</Text></View>
                                {data[0].map(pr => {
                                    return <TouchableOpacity activeOpacity={0}
                                                               underlayColor='#fff'
                                                               onPress={() => {
                                                                   this.setState({visibleSearch: false,findText:pr.title,selectedCityID:-1,
                                                                       selectedProvinceID:pr.id});
                                                               }
                                                               }><View
                                        style={{width: '100%', paddingVertical: 10, alignItems: 'center'}}>

                                        <View style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#eee',
                                            width: '70%',
                                            marginBottom: 10,
                                        }}/>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontFamily: 'IRANSansMobile'
                                        }}>{pr.title}</Text>
                                    </View>
                                    </TouchableOpacity>;
                                })}


                                <View>
                                    <Text style={{textAlign: 'center', fontFamily: 'IRANSansMobile'}}>شهر ها</Text></View>
                                {data[1].map(c => {
                                    return <TouchableOpacity activeOpacity={0}
                                                               underlayColor='#fff'
                                                               onPress={() => {
                                                                   this.setState({visibleSearch: false,findText:c.title,selectedCityID:c.id,
                                                                       selectedProvinceID:c.province.id});
                                                               }
                                                               }><View
                                        style={{width: '100%', paddingVertical: 10, alignItems: 'center'}}>

                                        <View style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#eee',
                                            width: '70%',
                                            marginBottom: 10,
                                        }}/>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontFamily: 'IRANSansMobile'
                                        }}>{c.title} - {c.province.title}</Text>
                                    </View>
                                    </TouchableOpacity>;
                                })}
                            </View>
                            }
                        </View>
                    </ScrollView>
                </View>
                }
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Image source={require('../../values/files/images/wall1.jpg')}
                           style={villaSearchIndexStyles.topImage}/>
                    <View style={{
                        flexDirection: 'column', flex: 1, justifyContent: 'center',
                        backgroundColor: '#ff0', borderBottomColor: '#fff', borderBottomWidth: 3, zIndex: 0,
                    }} onLayout={event => {
                        this.setState({inputContainerY: event.nativeEvent.layout.y});
                    }}>
                        <View
                            style={{width: '100%', height: '100%', backgroundColor: '#fff', justifyContent: 'center'}}>
                            <Text style={{
                                width: '100%',
                                borderWidth: 0,
                                textAlign: 'center',
                                marginTop: '10%',
                                fontFamily: 'IRANSansMobile',
                            }} onLayout={event => {
                                this.setState({inputy: event.nativeEvent.layout.y});
                            }}>مقصد شما</Text>
                            <TextInput onChangeText={(text) => {
                                if(this.state.findText!==text)
                                    this.setState({findText: text, visibleSearch: true});
                            }} style={{
                                zIndex: 1,
                                width: '100%',
                                borderWidth: 0,
                                textAlign: 'center',
                                fontFamily: 'IRANSansMobile',
                            }} placeholder='شهر/استان' value={this.state.findText}/>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-end',
                        height: Window.height * 0.15,
                    }}>

                        <View style={{flex: 0.5}}>
                            <TouchableOpacity onPress={
                                () => {
                                    this.setState({enddatemodalvisible: true});
                                }
                            }>
                                <View style={{height: '100%', justifyContent: 'center'}}>
                                    <Text style={{fontFamily: 'IRANSansMobile', textAlign: 'center'}}>تاریخ خروج</Text>
                                    <Text style={{
                                        fontFamily: 'IRANSansMobile',
                                        textAlign: 'center',
                                    }}>{this.state.enddate}</Text>
                                </View>
                            </TouchableOpacity >
                            <SweetDatePickerModal onDateChange={this.onEndDateChange}
                                                  visible={this.state.enddatemodalvisible}/>
                        </View>

                        <View style={{flex: 0.5}}>
                            <TouchableOpacity  onPress={() => {
                                this.setState({startdatemodalvisible: true});
                            }}>
                                <View style={{height: '100%', justifyContent: 'center'}}>
                                    <Text style={{fontFamily: 'IRANSansMobile', textAlign: 'center'}}>تاریخ ورود</Text>
                                    <Text style={{
                                        fontFamily: 'IRANSansMobile',
                                        textAlign: 'center',
                                    }}>{this.state.startdate}</Text>
                                </View>
                            </TouchableOpacity >
                            <SweetDatePickerModal onDateChange={this.onStartDateChange}
                                                  visible={this.state.startdatemodalvisible}/>
                        </View>
                    </View>
                    <View style={generalStyles.actionButtonContainer}>
                        <SweetButton title='جستجوی ویلاهای آزاد' style={generalStyles.actionButton}
                                     onPress={(OnEnd) => {
                                         if(this.state.selectedEndTimeStamp<=0 || this.state.selectedStartTimeStamp<=0)
                                         {
                                             SweetAlert.displaySimpleAlert('توجه','لطفا تاریخ شروع و پایان اقامت را وارد نمایید.');
                                         }
                                         else if(this.state.selectedCityID<=0 && this.state.selectedProvinceID<=0)
                                         {
                                             SweetAlert.displaySimpleAlert('توجه','لطفا شهر یا استان را وارد نمایید.');
                                         }
                                         else
                                         {

                                             const dayLength=3600*24*1000;
                                             let Duration=parseInt((this.state.selectedEndTimeStamp-this.state.selectedStartTimeStamp)/dayLength);
                                             this.props.navigation.navigate('trapp_villaList', {name: 'trapp_villaList',
                                                 selectedCityValue:this.state.selectedCityID,
                                                 selectedProvinceValue:this.state.selectedProvinceID,
                                                 selectedStartDate:this.state.startdate,
                                                 days:Duration,
                                             });
                                         }
                                         OnEnd(true);
                                     }}/>
                    </View>
                </View>
            </View>
        );
    }
}

