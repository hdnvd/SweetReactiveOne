 import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Image,
    Text,
    TextInput,
    ScrollView,TouchableOpacity ,StyleSheet,
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetButton from '../../../../sweet/components/SweetButton';
import villaSearchIndexStyles from '../../../trapp/values/styles/villaSearchIndexStyles';
import SweetAlert from '../../../../classes/SweetAlert';
import carserviceorder_requestManageController from '../../controllers/request/carserviceorder_requestManageController';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import TextBox from '../../../../sweet/components/TextBox';
 import Common from '../../../../classes/Common';
 import SweetPickerBox from '../../../../sweet/components/SweetPickerBox';

export default class carserviceorder_requestIndex extends Component<{}> {
    state =
        {
            formData:{},
            visibleSearch: false,
            inputy: 0,
            inputContainerY: 0,
            findText: '',
            selectedCityID:-1,
            selectedCarID:-1,
            cars:[],
        };
    render() {
        let Window = Dimensions.get('window');
        return (<View style={{flex: 1}}>
                {this.state.visibleSearch &&
                    <SweetPickerBox
                        onValueChange={(item)=>{
                            this.setState({
                                visibleSearch: false,
                                findText: item.title,
                                selectedCarID: item.id
                            })
                        }}
                        options={this.state.cars}
                        top= {this.state.inputy + this.state.inputContainerY - 180}


                    />
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
                            style={{width: '100%', height: '100%', backgroundColor: '#fff', justifyContent: 'center',alignItems:'center'}}>
                            <Text style={{
                                width: '100%',
                                borderWidth: 0,
                                textAlign: 'center',
                                marginTop: '10%',
                                fontFamily: 'IRANSansMobile',
                            }} onLayout={event => {
                                this.setState({inputy: event.nativeEvent.layout.y});
                            }}>نوع خودرو</Text>
                            <TextInput onChangeText={(text) => {
                                this.setState({findText:text},()=> {
                                    carserviceorder_requestManageController.getCars(text, (cars) => {
                                        this.setState({cars: cars, visibleSearch: true});
                                    }, () => {
                                    });
                                });
                            }} style={{
                                zIndex: 1,
                                width: '100%',
                                borderWidth: 0,
                                textAlign: 'center',
                                fontFamily: 'IRANSansMobile',
                            }} placeholder='نام خودرو' value={this.state.findText}/>
                            <View style={{width:'30%'}}>
                                <TextBox
                                    placeholder='سال تولید خودرو'
                                    labelStyle={{...StyleSheet.flatten(generalStyles.inputLabel),textAlign:'center',
                                        fontSize: 14,}}
                                    textStyle={{...StyleSheet.flatten(generalStyles.input),textAlign:'center',borderWidth:0,
                                        fontSize: 12,}}
                                    keyboardType='numeric' title={'مدل خودرو'} value={this.state.formData.carmakeyearnum} onChangeText={(text) => {this.setState({formData:{...this.state.formData,carmakeyearnum: text}});}}/></View>
                            <LocationSelector title='انتخاب محل خودرو' navigation={this.props.navigation}/>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-end',
                        height: Window.height * 0.15,
                    }}>


                    </View>
                    <View style={generalStyles.actionButtonContainer}>
                        <SweetButton title='ارسال درخواست' style={generalStyles.actionButton}
                                     onPress={(OnEnd) => {
                                         let formIsValid=true;
                                         if(formIsValid)
                                         {
                                             const data =Common.appendObject2FormData(this.state.formData,new FormData());
                                             if(global.SelectedLocation!=null){
                                                 data.append('latitudeflt', global.SelectedLocation.latitude);
                                                 data.append('longitudeflt', global.SelectedLocation.longitude);
                                             }
                                             data.append('car', this.state.selectedCarID);
                                             new carserviceorder_requestManageController().save(null,data,(data)=>{
                                                 SweetAlert.displaySimpleAlert('پیام','درخواست با موفقیت ارسال شد. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت');
                                                 OnEnd(true);
                                             },(error)=>{OnEnd(false)});

                                         }
                                         else
                                             OnEnd(false);
                                     }}/>
                    </View>
                </View>
            </View>
        );
    }
}

