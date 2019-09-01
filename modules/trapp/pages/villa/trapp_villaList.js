import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Text,
    FlatList,
    TouchableHighlight, BackHandler,
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import Constants from '../../../../classes/Constants';
import Trapp_villaSearch from './Trapp_villaSearch';
import TextRow from "../../../../sweet/components/TextRow";
import Localization from "../../../../classes/Localization";
import Geolocation from '@react-native-community/geolocation';
import SweetPage from '../../../../sweet/components/SweetPage';
import SweetAlert from '../../../../classes/SweetAlert';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import SweetConsole from '../../../../classes/SweetConsole';
import VillaListController from '../../controllers/villaListController';
import PageContainer from '../../../../sweet/components/PageContainer';
import villaListStyles from '../../values/styles/villaListStyles';
export default class trapp_villaList extends SweetPage {
    SORTFIELD_NORMALPRICE = 'normalpriceprc';
    SORTFIELD_DISTANCE = 'distance';
    state =
        {
            villas: [],
            nextStartRow: 0,
            SearchText: '',
            SearchFields:null,
            isLoading: false,
            isRefreshing: false,
            displaySearchPage: false,
            sortField: this.SORTFIELD_NORMALPRICE,
            location: {
                "coords":
                    {
                        "longitude": 51,
                        "latitude": 35
                    }
            }
        };
    constructor(props) {
        super(props);
    }
    static onFindClick: trapp_villaList.onFindClick;

    setBackHandler(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{
            this.setState({SearchText:'',SearchFields:null},()=>{this._loadData(true,true);});
            return true;
        });
    }
    async componentDidMount() {
        this._loadData(true,false);

        this._findCoordinates();
        this.props.navigation.setParams({
            onFindClick: () => {
                this.setState({displaySearchPage: true});
            },
            onReserveListClick: () => {
                this.props.navigation.navigate('trapp_orderList', {name: 'trapp_orderList'});
            }
        });

    }

    _findCoordinates = () => {
        VillaListController.findCoordinates((position)=>{
            this.setState({location: position}, () => {
                this._loadData(true,false);
            });
        });
    };
    _loadData = (isRefreshing,forceHideSearchPage) => {
        let {nextStartRow, villas} = this.state;
        if (isRefreshing) {
            villas = [];
            nextStartRow = 0;
        }
        this.setState({isRefreshing: isRefreshing, isLoading: isRefreshing},()=>{
            new VillaListController().loadData(this.state.SearchText, this.state.SearchFields,nextStartRow,this.state.sortField,this.state.location.coords.latitude,this.state.location.coords.longitude,(data)=>{
                if(forceHideSearchPage)
                    this.removeBackHandler();
                this.setState({
                    villas: [...villas, ...data],
                    nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                    isLoading: false,
                    isRefreshing: false,
                    displaySearchPage: forceHideSearchPage?false:this.state.displaySearchPage
                });
            })
        });
    };
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        let Window = Dimensions.get('window');
        let captionStyle = {
            ...StyleSheet.flatten(generalStyles.caption),
            color: '#333333',
            fontSize: 10,
        };
        let contentStyle = {
            ...StyleSheet.flatten(generalStyles.content),
            color: '#333333',
            fontSize: 10,
        };
        let ItemStyle = {width: '100%', marginTop: 10};
        return (<View style={{flex: 1}}>
                {this.state.displaySearchPage &&
                <Trapp_villaSearch
                    dataLoader={SearchFields => {
                        this.setState({SearchFields:SearchFields},()=>{this._loadData(true,true)});

                    }}
                />
                }
                {!this.state.displaySearchPage &&
                    <View style={generalStyles.listcontainer}>
                    <View style={generalStyles.listTopBar}>
                        <TouchableHighlight onPress={() => {
                            this.setState({sortField: this.state.sortField === this.SORTFIELD_NORMALPRICE ? this.SORTFIELD_DISTANCE : this.SORTFIELD_NORMALPRICE}, () => {
                                this._loadData(true,false);
                            })
                        }}
                                            activeOpacity={0.3}
                                            underlayColor='#ffffff'>
                            <View style={generalStyles.listTopBarItem}>
                                <View
                                    style={this.state.sortField === this.SORTFIELD_DISTANCE ? generalStyles.listTopBarItemButtonIconContainerSelected : generalStyles.listTopBarItemButtonIconContainer}>
                                    <Image source={require('../../../../images/distance.png')}
                                           style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                                </View>
                                <View
                                    style={this.state.sortField === this.SORTFIELD_NORMALPRICE ? generalStyles.listTopBarItemButtonIconContainerSelected : generalStyles.listTopBarItemButtonIconContainer}>
                                    <Image source={require('../../../../images/dollar.png')}
                                           style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                                </View>
                                <Text style={generalStyles.listTopBarItemText}>مرتب سازی</Text>
                                <Image source={require('../../../../images/sort.png')}
                                       style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.setState({displaySearchPage: true});
                            this.setBackHandler();
                        }}
                                            activeOpacity={0.3}
                                            underlayColor='#eee'>
                            <View style={generalStyles.listTopBarItem}>

                                <Text style={generalStyles.listTopBarItemText}>جستجو</Text>
                                <Image source={require('../../../../images/filter.png')}
                                       style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                        {this.state.SearchFields != null &&
                        <View style={generalStyles.searchTitleTopBar}>
                            <Text style={generalStyles.searchTitleTopBarText}>نتایج جستجو</Text>
                            <TouchableHighlight style={generalStyles.searchTitleTopBarCancelIconContainer}
                                                onPress={() => {

                                                    this.setState({
                                                        displaySearchPage: false,
                                                        SearchText: '',
                                                        SearchFields: null
                                                    }, () => {
                                                        this._loadData(true, false)
                                                    });
                                                }}
                                                activeOpacity={0}
                                                underlayColor='#fff'>
                                <Image source={require('../../../../images/cancel.png')}
                                       style={generalStyles.searchTitleTopBarCancelIcon} resizeMode={'stretch'}/>
                            </TouchableHighlight>
                        </View>
                        }
                        <PageContainer content={<View style={generalStyles.listcontainer}>
                        <FlatList
                            data={this.state.villas}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => this._loadData(false,false)}
                            onRefresh={() => this._loadData(true,false)}
                            refreshing={this.state.isRefreshing}
                            keyExtractor={item => item.id}
                            onEndReachedThreshold={0.3}
                            renderItem={({item}) =>
                                <TouchableWithoutFeedback onPress={() => {
                                    global.villaID = item.id;
                                    this.props.navigation.navigate('trapp_villaView', {name: 'trapp_villaView'});

                                }}>
                                    <View style={generalStyles.ListItem}>
                                        <View style={{
                                            justifyContent: Localization.getFlexStart(),
                                            flexDirection: Localization.getRowReverseDirection(),
                                            flexWrap: 'wrap',
                                            width: Window.width * 0.45,
                                            height: StyleSheet.flatten(generalStyles.listitemthumbnail).width + 50
                                        }}>
                                            <View style={villaListStyles.itemTopBar}>
                                                <View style={villaListStyles.itemTopBarItem}>
                                                    <Image source={require('../../values/files/images/icon/colored/room.png')}
                                                           style={villaListStyles.itemTopBarItemLogo}/>
                                                    <Text
                                                        style={villaListStyles.itemTopBarItemContent}>{item.roomcountnum + ' خوابه'}</Text>
                                                </View>
                                                <View style={villaListStyles.itemTopBarItem}>
                                                    <Image
                                                        source={require('../../values/files/images/icon/colored/person.png')}
                                                        style={villaListStyles.itemTopBarItemLogo}/>
                                                    <Text
                                                        style={villaListStyles.itemTopBarItemContent}>{item.capacitynum + ' نفر'}</Text>
                                                </View>
                                                <View style={villaListStyles.itemTopBarItem}>
                                                    <Image source={require('../../values/files/images/icon/colored/area.png')}
                                                           style={villaListStyles.itemTopBarItemLogo}/>
                                                    <Text
                                                        style={villaListStyles.itemTopBarItemContent}>{item.structureareanum + ' متر'}</Text>
                                                </View>
                                            </View>
                                            {item.hasOwnProperty('distance') &&
                                            <TextRow style={{width: '100%', marginTop: 10}}
                                                     logo={require('../../values/files/images/icon/colored/distance.png')}
                                                     captionStyle={captionStyle} contentStyle={contentStyle} title={''}
                                                     content={Math.round(item.distance * 100) / 100 + ' کیلومتر'}/>
                                            }
                                            <TextRow style={ItemStyle} captionStyle={captionStyle}
                                                     contentStyle={contentStyle} title={''}
                                                     content={item.placemanplacecontent}
                                                     logo={require('../../values/files/images/icon/colored/location.png')}/>
                                            <TextRow style={ItemStyle} captionStyle={captionStyle}
                                                     contentStyle={contentStyle} title={''}
                                                     content={item.normalpriceprc + ' ریال'}
                                                     logo={require('../../values/files/images/icon/colored/price.png')}/>
                                        </View>
                                        <Image style={generalStyles.listitemthumbnail}
                                               source={item.photo!=''?{uri: 'data:image/jpeg;base64,'+item.photo}:require('../../../../images/Logo.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                        />
                    </View>} isLoading={this.state.isLoading} isEmpty={this.state.villas==null || this.state.villas.length==0}/>

                    </View>
                }
            </View>
        );
    }
}
