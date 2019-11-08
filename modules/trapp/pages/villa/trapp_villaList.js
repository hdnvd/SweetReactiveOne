import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import Constants from '../../../../classes/Constants';
import Trapp_villaSearch from './Trapp_villaSearch';
import TextRow from '../../../../sweet/components/TextRow';
import Localization from '../../../../classes/Localization';
import VillaListController from '../../controllers/villaListController';
import PageContainer from '../../../../sweet/components/PageContainer';
import villaListStyles from '../../values/styles/villaListStyles';
import SweetListPage from '../../../../sweet/components/SweetListPage';

export default class trapp_villaList extends SweetListPage {
    state =
        {
            ...super.state,
            villas: [],
            sortField: VillaListController.SORTFIELD_NORMALPRICE,
            location: {
                'coords':
                    {
                        'longitude': 51,
                        'latitude': 35,
                    },
            },
            SearchFields:{
                selectedCityValue:this.props.navigation.getParam('selectedCityValue',-1),
                selectedProvinceValue:this.props.navigation.getParam('selectedProvinceValue',-1),
                selectedStartDate:this.props.navigation.getParam('selectedStartDate',-1),
                days:this.props.navigation.getParam('days',-1),
            }
        };
    static onFindClick: trapp_villaList.onFindClick;
    async componentDidMount() {
        this._loadData(true, false);

        this._findCoordinates();
        this.props.navigation.setParams({
            onFindClick: () => {
                this.setState({displaySearchPage: true});
            },
            onReserveListClick: () => {
                this.props.navigation.navigate('trapp_orderList', {name: 'trapp_orderList'});
            },
        });

    }

    _findCoordinates = () => {
        VillaListController.findCoordinates((position) => {
            this.setState({location: position}, () => {
                this._loadData(true, false);
            });
        });
    };
    _loadData = (isRefreshing, forceHideSearchPage) => {
        let {nextStartRow, villas} = this.state;
        if (isRefreshing) {
            villas = [];
            nextStartRow = 0;
        }
        this.setState({isRefreshing: isRefreshing, isLoading: isRefreshing}, () => {
            new VillaListController().loadData(this.state.SearchText, this.state.SearchFields, nextStartRow, this.state.sortField, this.state.location.coords.latitude, this.state.location.coords.longitude, (data) => {
                if (forceHideSearchPage)
                    this.removeBackHandler();
                this.setState({
                    villas: [...villas, ...data],
                    nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                    isLoading: false,
                    isRefreshing: false,
                    displaySearchPage: forceHideSearchPage ? false : this.state.displaySearchPage,
                });
            });
        });
    };

    render() {
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
        const renderListItem=({item})=>{
            return <TouchableWithoutFeedback onPress={() => {
                global.villaID = item.id;
                this.props.navigation.navigate('trapp_villaView', {name: 'trapp_villaView'});
            }}>
                <View style={generalStyles.ListItem}>
                    <View style={{
                        justifyContent: Localization.getFlexStart(),
                        flexDirection: Localization.getRowReverseDirection(),
                        flexWrap: 'wrap',
                        width: this.Window.width * 0.45,
                        height: StyleSheet.flatten(generalStyles.listitemthumbnail).width + 50,
                    }}>
                        <View style={villaListStyles.itemTopBar}>
                            <View style={villaListStyles.itemTopBarItem}>
                                <Image
                                    source={require('../../values/files/images/icon/colored/room.png')}
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
                                <Image
                                    source={require('../../values/files/images/icon/colored/area.png')}
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
                           source={item.photo != '' ? {uri: 'data:image/jpeg;base64,' + item.photo} : require('../../../../images/Logo.png')}/>
                </View>
            </TouchableWithoutFeedback>
        };
        const content=<View style={{flex: 1}}>
             {this.state.displaySearchPage &&
            <Trapp_villaSearch
                dataLoader={SearchFields => {
                    this.setState({SearchFields: SearchFields}, () => {
                        this._loadData(true, true);
                    });

                }}
            />
            }
            {!this.state.displaySearchPage &&
            <View style={generalStyles.listcontainer}>
                {this._getTopBar([{id: VillaListController.SORTFIELD_NORMALPRICE,name: 'مبلغ'}, {id: VillaListController.SORTFIELD_DISTANCE, name: 'فاصله از من'}])}
                <PageContainer isLoading={this.state.isLoading}
                               isEmpty={this.state.villas == null || this.state.villas.length == 0}>
                    <View style={generalStyles.listcontainer}>
                        {this._getFlatList(this.state.villas,renderListItem)}
                    </View>
                </PageContainer>

            </View>
                }
            </View>;

        return this.renderPage(content);
    }
}
