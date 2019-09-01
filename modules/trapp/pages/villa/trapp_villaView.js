import React from 'react';
import {StyleSheet,View,ScrollView,Dimensions,Text,Image, TouchableHighlight} from 'react-native';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import generalStyles from '../../../../styles/generalStyles';
import Constants from '../../../../classes/Constants';
import TextRow from '../../../../sweet/components/TextRow';
import SweetButton from '../../../../sweet/components/SweetButton';
import SimpleMap from '../../../../components/SimpleMap';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import SweetAlert from "../../../../classes/SweetAlert";
import SweetPage from '../../../../sweet/components/SweetPage';
import VillaViewController from '../../controllers/villaViewController';
import VillaViewStyles from '../../values/styles/villaViewStyles';
import PageContainer from '../../../../sweet/components/PageContainer';
let Window = Dimensions.get('window');
export default class trapp_villaView extends SweetPage {
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading: false,
                activeTab:0,
                isImageViewVisible:false,
                images:[],
            };
    }
    componentDidMount(){
        super.componentDidMount();
        this.loadData();
    }
    loadData = () => {
        this.setState({isLoading: true},()=>{
            new VillaViewController().load(global.villaID,(data)=>{
                let images2=data.villaphotos.map(item=>{
                    return {url: Constants.ServerURL + '/' + item.photoigu,}
                });
                this.setState({LoadedData: {...data}, isLoading: false,images:images2});
            });
        });
    };
    _renderItem = ({item, index}) => {
        return (
            <TouchableHighlight onPress={()=>{this.setState({isImageViewVisible: true});}}>
            <View style={{...StyleSheet.flatten(generalStyles.topimagelistitem),height:Window.width*0.7}}>
                <Image style={generalStyles.topimagelistItemImage}
                       source={{uri: Constants.ServerURL + '/' + item.photoigu}}/>
            </View>
            </TouchableHighlight>
        );
    };
    _openGps = () => {
        if(this.state.LoadedData!=null)
            VillaViewController.openGps(this.state.LoadedData.id,this.state.LoadedData.placemanplaceinfo.latitude,this.state.LoadedData.placemanplaceinfo.longitude);
    };
    render() {
        let i=0;
        let Window = Dimensions.get('window');
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        let Content=<View style={{flex: 1}}>
                {this.state.LoadedData != null &&
                <View style={{height: Window.height - StyleSheet.flatten(generalStyles.SweetButton).height - 80}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.containerWithNoBG}>
                            {this.state.images.length === 0 &&
                            <View style={VillaViewStyles.defaultTopPhotoContainer}>
                                <Image style={VillaViewStyles.defaultTopPhoto}
                                       source={require('../../../../images/LogoGray.png')} resizeMode={'stretch'}/>
                            </View>
                            }
                            {this.state.images.length > 0 &&
                            <View>
                                <Modal visible={this.state.isImageViewVisible} transparent={true}>
                                    <ImageViewer imageUrls={this.state.images} onClick={() => {
                                        this.setState({isImageViewVisible: false})
                                    }}/>
                                </Modal>

                                <Carousel
                                    ref={(c) => {
                                        this._carousel = c;
                                    }}
                                    data={this.state.LoadedData.villaphotos}
                                    renderItem={this._renderItem}
                                    sliderWidth={Window.width}
                                    itemWidth={Window.width}
                                    onSnapToItem={i => this.setState({activeTab: i})}
                                />
                                <Pagination
                                    containerStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.0)',
                                        paddingVertical: 7,
                                        width: '100%',
                                        position: 'absolute',
                                        bottom: 15
                                    }}
                                    inactiveDotOpacity={0.8}
                                    inactiveDotScale={0.8}
                                    dotStyle={{backgroundColor: '#ffffff'}}
                                    activeDotIndex={this.state.activeTab}
                                    dotsLength={this.state.LoadedData.villaphotos.length}
                                />
                            </View>
                            }
                            <View style={VillaViewStyles.viewBox}>
                                <View style={VillaViewStyles.viewBoxTitleBox}>
                                    <Image source={require('../../values/files/images/icon/colored/area.png')}
                                           style={VillaViewStyles.viewBoxLogo}/>
                                    <Text style={VillaViewStyles.viewBoxCaption}>مشخصات ویلا</Text>
                                </View>
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

                            </View>
                            <View style={VillaViewStyles.viewBox}>
                                <View style={VillaViewStyles.viewBoxTitleBox}>
                                    <Image source={require('../../values/files/images/icon/colored/option.png')}
                                           style={VillaViewStyles.viewBoxLogo}/>
                                    <Text style={VillaViewStyles.viewBoxCaption}>امکانات ویلا</Text>
                                </View>
                                {
                                    this.state.LoadedData.options.map(dt => {
                                        if (dt != null) {
                                            i = i + 1;
                                            return <TextRow key={i} style={generalStyles.semiRow}
                                                            title={'تعداد ' + dt.name} content={dt.countnum + ''}/>
                                        }
                                    })}
                            </View>
                            <View style={VillaViewStyles.viewBox}>
                                <View style={VillaViewStyles.viewBoxTitleBox}>
                                    <Image source={require('../../values/files/images/icon/colored/price.png')}
                                           style={VillaViewStyles.viewBoxLogo}/>
                                    <Text style={VillaViewStyles.viewBoxCaption}>هزینه های ویلا</Text>
                                </View>
                                <TextRow style={generalStyles.semiRow} title={'قیمت روز عادی'}
                                         content={this.state.LoadedData.normalpriceprc + ' ریال'}/>
                                <TextRow style={generalStyles.semiRow} title={'قیمت روز تعطیل'}
                                         content={this.state.LoadedData.holidaypriceprc + ' ریال'}/>
                                <TextRow style={generalStyles.semiRow} title={'تخفیف رزرو هفتگی'}
                                         content={this.state.LoadedData.weeklyoffnum + ' درصد'}/>
                                <TextRow style={generalStyles.semiRow} title={'تخفیف رزرو ماهانه'}
                                         content={this.state.LoadedData.monthlyoffnum + ' درصد'}/>
                            </View>
                            <View style={VillaViewStyles.viewBox}>
                                <View style={VillaViewStyles.viewBoxTitleBox}>
                                    <Image source={require('../../values/files/images/icon/colored/location.png')}
                                           style={VillaViewStyles.viewBoxLogo}/>
                                    <Text style={VillaViewStyles.viewBoxCaption}>محل ویلا</Text>
                                </View>
                                <TextRow title={'آدرس:'}
                                         content={this.state.LoadedData.placemanplaceinfo.provinceinfo.title + ' - ' + this.state.LoadedData.placemanplaceinfo.cityinfo.title + ' - ' + this.state.LoadedData.placemanplaceinfo.address}/>

                            </View>


                            <View style={{...StyleSheet.flatten(VillaViewStyles.viewBox), height: Window.height * 0.3}}>
                                <SimpleMap blured={!this.state.LoadedData.reservedbyuser} style={generalStyles.map}
                                           latitude={parseFloat(this.state.LoadedData.placemanplaceinfo.latitude) + 0}
                                           longitude={parseFloat(this.state.LoadedData.placemanplaceinfo.longitude) + 0}/>
                            </View>
                            {this.state.LoadedData.reservedbyuser &&
                            <View style={{...StyleSheet.flatten(VillaViewStyles.viewBox), marginBottom: 20}}>
                                <View style={VillaViewStyles.viewBoxTitleBox}>
                                    <Image source={require('../../values/files/images/icon/colored/host.png')}
                                           style={VillaViewStyles.viewBoxLogo}/>
                                    <Text style={VillaViewStyles.viewBoxCaption}>اطلاعات میزبان</Text>
                                </View>
                                {this.state.LoadedData.villaowner.photoigu != '' &&
                                <Image style={generalStyles.profilePicture}
                                       source={{uri: Constants.ServerURL + '/' + this.state.LoadedData.villaowner.photoigu}}/>
                                }
                                <TextRow title={'نام'} content={this.state.LoadedData.villaowner.name}/>
                                <TextRow title={'تلفن'} content={this.state.LoadedData.villaowner.telbnum}/>
                                <TextRow title={'تلفن همراه شماره ۲'}
                                         content={this.state.LoadedData.villaowner.backupmobilebnum}/>
                            </View>
                            }
                            {!this.state.LoadedData.reservedbyuser &&
                            <View style={{...StyleSheet.flatten(VillaViewStyles.viewBox), marginBottom: 20}}>
                                <View style={VillaViewStyles.viewBoxTitleBox}>
                                    <Image source={require('../../values/files/images/icon/colored/host.png')}
                                           style={VillaViewStyles.viewBoxLogo}/>
                                    <Text style={VillaViewStyles.viewBoxCaption}>اطلاعات میزبان</Text>
                                </View>
                                <TextRow title={''}
                                         content={'اطلاعات میزبان پس از رزرو ویلا قابل مشاهده است.'}/>
                            </View>
                            }

                        </View>
                    </ScrollView>
                </View>
                }
                <View style={VillaViewStyles.footerBar}>
                </View>
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
            </View>;
           return (
            <PageContainer isLoading={this.state.isLoading} content={Content}/>
        )
    }
}
