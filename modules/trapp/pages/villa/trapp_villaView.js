import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Image,
    Text,
    Modal,
    TextInput,
    Button,
    TouchableHighlight, BackHandler,
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import Constants from '../../../../classes/Constants';
import TextRow from '../../../../sweet/components/TextRow';
import SweetButton from '../../../../sweet/components/SweetButton';
import SimpleMap from '../../../../components/SimpleMap';
import SweetAlert from "../../../../classes/SweetAlert";
import SweetPage from '../../../../sweet/components/SweetPage';
import VillaViewController from '../../controllers/villaViewController';
import VillaViewStyles from '../../values/styles/villaViewStyles';
import PageContainer from '../../../../sweet/components/PageContainer';
import SweetTopCarousel from '../../../../sweet/components/SweetTopCarousel';
import ViewBox from '../../../../sweet/components/ViewBox';
import {SceneMap, TabView} from 'react-native-tab-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import StarBox from '../../../../sweet/components/StarBox';
import SwitchRow from '../../../../sweet/components/SwitchRow';
let Window = Dimensions.get('window');
export default class trapp_villaView extends SweetPage {
    componentDidMount(){
        super.componentDidMount();
        this.loadData();
    }

    setBackHandler() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.setState({isCommentSendModalVisible: false, SearchFields: null}, () => {
                this._loadData(true, true);
            });
            return true;
        });
    }
    state = {
        ...super.state,
        tabViewState:{
            index: 2,
            routes: [
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
            { key: 'third', title: 'Third' },
            ],
            },
            userRate:0,
            isCommentSendModalVisible:false,
            };
            loadData = () => {
            this.setState({isLoading: true},()=>{
                new VillaViewController().load(global.villaID,(data)=>{
                    this.setState({LoadedData: {...data}, isLoading: false});
                });
            });
        };
            _openGps = () => {
            if(this.state.LoadedData!=null)
            VillaViewController.openGps(this.state.LoadedData.id,this.state.LoadedData.placemanplaceinfo.latitude,this.state.LoadedData.placemanplaceinfo.longitude);
        };
            render() {
            let i=0;
            let Window = Dimensions.get('window');
            let _FirstRoute=()=>{return <View/>};
            if(this.state.LoadedData!=null)
            _FirstRoute=()=>{
            return <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
            <View style={generalStyles.containerWithNoBG}>
            <ViewBox style={VillaViewStyles.viewBox} title={'مشخصات ویلا'} logo={require('../../values/files/images/icon/colored/area.png')}>
            <TextRow style={generalStyles.semiRow} title={'کد ویلا'}
            content={this.state.LoadedData.id}/>
            <TextRow style={generalStyles.semiRow} title={'تعداد اتاق'}
            content={this.state.LoadedData.roomcountnum}/>
            <TextRow style={generalStyles.semiRow} title={'ظرفیت'}
            content={this.state.LoadedData.capacitynum + ' نفر'}/>
            <TextRow style={generalStyles.semiRow} title={'حداکثر تعداد مهمان'}
            content={this.state.LoadedData.maxguestsnum + ' نفر'}/>
            <TextRow style={generalStyles.semiRow} title={'متراژ بنا'}
            content={this.state.LoadedData.structureareanum + ' متر'}/>
            <TextRow style={generalStyles.semiRow} title={'متراژ کل'}
            content={this.state.LoadedData.totalareanum + ' متر'}/>
            <TextRow style={generalStyles.semiRow} title={'چشم انداز'}
            content={this.state.LoadedData.viewtypeinfo.name}/>
            <TextRow style={generalStyles.semiRow} title={'نوع ساختمان'}
            content={this.state.LoadedData.structuretypeinfo.name}/>
            {/*{this.state.LoadedData.fulltimeservice==1 && <TextRow title={''} content={'تحویل ۲۴ ساعته'} />}*/}
            <TextRow style={generalStyles.semiRow} title={'زمان تحویل/تخلیه'}
            content={' ' + this.state.LoadedData.timestartclk}/>
            <TextRow style={generalStyles.semiRow} title={'نوع اقامتگاه'}
            content={this.state.LoadedData.owningtypeinfo.name}/>
            <TextRow style={generalStyles.semiRow} title={'بافت'}
            content={this.state.LoadedData.areatypeinfo.name}/>
            {/*<TextRow title={'توضیحات'} content={this.state.LoadedData.descriptionte} />*/}
            </ViewBox>
            <ViewBox style={VillaViewStyles.viewBox} title={'هزینه های ویلا'} logo={require('../../values/files/images/icon/colored/price.png')}>
            <TextRow style={generalStyles.semiRow} title={'قیمت روز عادی'}
            content={this.state.LoadedData.normalpriceprc + ' ریال'}/>
            <TextRow style={generalStyles.semiRow} title={'قیمت روز تعطیل'}
            content={this.state.LoadedData.holidaypriceprc + ' ریال'}/>
            <TextRow style={generalStyles.semiRow} title={'تخفیف رزرو هفتگی'}
            content={this.state.LoadedData.weeklyoffnum + ' درصد'}/>
            <TextRow style={generalStyles.semiRow} title={'تخفیف رزرو ماهانه'}
            content={this.state.LoadedData.monthlyoffnum + ' درصد'}/>
            </ViewBox>
            <ViewBox style={VillaViewStyles.viewBox} title={'محل ویلا'} logo={require('../../values/files/images/icon/colored/location.png')}>
            <TextRow title={'آدرس:'}
            content={this.state.LoadedData.placemanplaceinfo.provinceinfo.title + ' - ' + this.state.LoadedData.placemanplaceinfo.cityinfo.title + ' - ' + this.state.LoadedData.placemanplaceinfo.address}/>
            </ViewBox>
            <ViewBox style={{...StyleSheet.flatten(VillaViewStyles.viewBox), height: Window.height * 0.3}}>
            <SimpleMap blured={!this.state.LoadedData.reservedbyuser} style={generalStyles.map}
            latitude={parseFloat(this.state.LoadedData.placemanplaceinfo.latitude) + 0}
            longitude={parseFloat(this.state.LoadedData.placemanplaceinfo.longitude) + 0}/>
            </ViewBox>
            {this.state.LoadedData.reservedbyuser &&
            <ViewBox style={{...StyleSheet.flatten(VillaViewStyles.viewBox), marginBottom: 20}}
                     title={'اطلاعات میزبان'} logo={require('../../values/files/images/icon/colored/host.png')}>
                {this.state.LoadedData.villaowner.photoigu != '' &&
                <Image style={generalStyles.profilePicture}
                       source={{uri: Constants.ServerURL + '/' + this.state.LoadedData.villaowner.photoigu}}/>
                }
                <TextRow title={'نام'} content={this.state.LoadedData.villaowner.name}/>
                <TextRow title={'تلفن'} content={this.state.LoadedData.villaowner.telbnum}/>
                {this.state.LoadedData.villaowner.backupmobilebnum != null && this.state.LoadedData.villaowner.backupmobilebnum.length > 5 &&
                <TextRow title={'تلفن همراه شماره ۲'}
                         content={this.state.LoadedData.villaowner.backupmobilebnum}/>
                }
            </ViewBox>
            }
            {!this.state.LoadedData.reservedbyuser &&
            <ViewBox style={{...StyleSheet.flatten(VillaViewStyles.viewBox), marginBottom: 20}} title={'اطلاعات میزبان'}
                     logo={require('../../values/files/images/icon/colored/host.png')}
            >
                <TextRow title={''}
                         content={'اطلاعات میزبان پس از رزرو ویلا قابل مشاهده است.'}/>
            </ViewBox>
            }

            </View>
            </ScrollView>;
        };
            const _SecondRoute = ()=>{
            return <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
            <View style={generalStyles.containerWithNoBG}>
            <ViewBox style={VillaViewStyles.viewBox} title={'امکانات ویژه ویلا'} logo={require('../../values/files/images/icon/colored/option.png')}>
            {
                this.state.LoadedData.nonfreeoptions.map(dt => {
                    if (dt != null) {
                        i = i + 1;
                        return <SwitchRow key={i} style={generalStyles.semiRow}
                                        title={dt.name} content={dt.maxcountnum>0}/>
                    }
                })}
            </ViewBox>
                <ViewBox style={VillaViewStyles.viewBox} title={'دیگر امکانات ویلا'} logo={require('../../values/files/images/icon/colored/option.png')}>
                    {
                        this.state.LoadedData.options.map(dt => {
                            if (dt != null ) {
                                i = i + 1;
                                return <TextRow key={i} style={generalStyles.semiRow}
                                                title={dt.name} content={dt.countnum + ''}/>
                            }
                        })}
                </ViewBox>
            </View>
            </ScrollView>;
        };
            const _thirdRoute = ()=>{
            return <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
            <View style={generalStyles.containerWithNoBG}>
            <ViewBox style={VillaViewStyles.viewBox} title={'نظرات'} logo={require('../../values/files/images/icon/colored/option.png')}>
                <StarBox/>
            {
                this.state.LoadedData.comments.length>0 &&

                this.state.LoadedData.comments.map(dt => {
                    if (dt != null) {
                        return <TextRow key={i} style={generalStyles.row}
                                        title={dt.user.name + " می گوید: "} content={dt.text + ''}/>
                    }
                })
            }

            {this.state.LoadedData.comments.length==0 &&
            <Text>هیچ نظری برای این ویلا ثبت نشده</Text>
            }
            </ViewBox>

            </View>
            </ScrollView>;
        };
            let Content=<View style={{flex: 1}}>
            {this.state.LoadedData != null &&
            <View style={{height: Window.height - StyleSheet.flatten(generalStyles.SweetButton).height - 80}}>
                <SweetTopCarousel defaultPhoto={require('../../../../images/LogoGray.png')} urlPrefix={Constants.SiteURL+"/"} urlField={'photoigu'} data={this.state.LoadedData.villaphotos}/>
                <TabView
                    renderTabBar = {props =>{
                        return <View style={VillaViewStyles.tabViewTopBar}>
                            <View style={VillaViewStyles.tabViewTopBarItem}>
                                <Text style={VillaViewStyles.tabViewTopBarItemText}>مشخصات</Text>
                                {this.state.tabViewState.index==2 && <View style={VillaViewStyles.tabViewTopBarItemActiveBar}/> }
                            </View>
                            <View style={VillaViewStyles.tabViewTopBarItem}><Text style={VillaViewStyles.tabViewTopBarItemText}>امکانات</Text>
                                {this.state.tabViewState.index==1 && <View style={VillaViewStyles.tabViewTopBarItemActiveBar}/>}
                            </View>
                            <View style={VillaViewStyles.tabViewTopBarItem}><Text style={VillaViewStyles.tabViewTopBarItemText}>نظرات</Text>
                                {this.state.tabViewState.index==0 && <View style={VillaViewStyles.tabViewTopBarItemActiveBar}/>}
                            </View>
                        </View>;
                    }}
                    navigationState={this.state.tabViewState}
                    renderScene={SceneMap({
                        first: _thirdRoute,
                        second: _SecondRoute,
                        third: _FirstRoute,
                    })}
                    onIndexChange={index => this.setState({tabViewState:{...this.state.tabViewState,index:index} })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />

            </View>
            }
            <View style={VillaViewStyles.footerBar}>
            </View>

            {this.state.tabViewState.index != 0 &&
            <View style={VillaViewStyles.footer}>
                {Constants.AppName==='trapp_user' &&
                <SweetButton style={VillaViewStyles.Button1} title={'رزرو'} onPress={(onEnd) => {
                    global.villaId = global.villaID;
                    this.props.navigation.navigate('trapp_villaReserve', {name: 'trapp_villaReserve'});
                    onEnd(true);
                }}/>}
                <SweetButton style={VillaViewStyles.Button3} title={'مسیریابی ویلا'} onPress={(onEnd) => {
                    if(this.state.LoadedData.reservedbyuser || Constants.AppName!=='trapp_user')
                        this._openGps();
                    else
                        SweetAlert.displaySimpleAlert('پیام','این امکان پس از رزرو ویلا قابل دسترسی است.');
                    onEnd(true);
                }}/>
            </View>
            }
            {this.state.tabViewState.index == 0 &&
            <View style={VillaViewStyles.footer}>
                {Constants.AppName === 'trapp_user' &&
                <SweetButton style={VillaViewStyles.ButtonFullComment} title={'ارسال نظر'} onPress={(onEnd) => {
                    this.setState({isCommentSendModalVisible:true});
                    onEnd(true);
                }}/>}

            </View>
            }
                <Modal visible={this.state.isCommentSendModalVisible} transparent={true} animationType={'fade'} onRequestClose={()=>{this.setState({isCommentSendModalVisible:false});}}>
                    <TouchableHighlight activeOpacity={0}
                                        underlayColor='#fff'
                                        onPress={()=>{
                                            this.setState({isCommentSendModalVisible:false});
                                        }}>
                        <View style={{
                            height:'100%',
                            width:'100%',
                            justifyContent: 'center',
                            backgroundColor:'rgba(0,0,0,0.6)',
                            alignItems: 'center'}}>
                            <View style={{backgroundColor:'#fff',borderRadius:10,padding:10,width:'80%',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                                <StarBox rate={this.state.userRate} onValueChange={(rate)=>{this.setState({userRate:rate})}}/>
                                <TextInput style={VillaViewStyles.commentEditText} placeholder={'نظر خود را بنویسید'} value={this.state.commentText==null?'':this.state.commentText} onChangeText={(text) =>{this.setState({commentText:text})}}/>
                                <SweetButton title={'ارسال نظر'} onPress={(onEnd)=>{
                                    let textValidated=this.state.commentText!=null && this.state.commentText.length>2;
                                    let rateValidated=this.state.userRate!=null && this.state.userRate>0;
                                    if(textValidated && rateValidated) {
                                        VillaViewController.sendComment(global.villaID, this.state.commentText, this.state.userRate, (data) => {
                                            SweetAlert.displaySimpleAlert("ارسال شد", 'نظر شما با موفقیت ثبت شد');
                                            this.setState({isCommentSendModalVisible:false});
                                            onEnd(true);
                                        }, (error) => {
                                            onEnd(false)
                                        });
                                    }
                                    else if(!rateValidated) {
                                        SweetAlert.displaySimpleAlert("توجه", 'لطفاامتیاز خود به این ویلا را انتخاب کنید');
                                        onEnd(false);
                                    }
                                    else if(!textValidated) {
                                        SweetAlert.displaySimpleAlert("توجه", 'لطفا متن نظر خود را وارد کنید');
                                        onEnd(false);
                                    }
                                }}/>
                            </View>
                        </View>
                    </TouchableHighlight>
                </Modal>
        </View>;
           return (<PageContainer isLoading={this.state.isLoading}>
               {Content}
           </PageContainer>);
    }
}
