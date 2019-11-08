import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {AsyncStorage, Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View,TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';
import generalStyles from '../../styles/generalStyles';
import Constants from '../../classes/Constants';
import Navigation from '../../classes/navigation';
import SweetAlert from '../../classes/SweetAlert';

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        });
        this.props.navigation.closeDrawer();
        // this.props.navigation.toggleDrawer();
        this.props.navigation.dispatch(navigateAction);
    };

    render() {
        let onLogout = () => {
            SweetAlert.displayYesNoAlert(() => {
                AsyncStorage.clear().then(() => {
                    this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('Login'));
                });
            }, 'خروج از حساب', 'آیا می خواهید از حساب خود خارج شوید؟');
        };
        return (
            <View style={styles.container}>
                {Constants.DefaultRole === 'trapp_villaowner' &&
                <ImageBackground source={require('../../images/ownersidebar.png')} style={{width: '100%', height: '100%'}}>
                    <View style={styles.container}>
                        <Image style={generalStyles.drawerTopImage} source={Constants.BaseIcon}/>
                        <ScrollView>
                            <View>
                                <MenuItem title={'اطلاعات صاحب ویلا'} icon={require('../../images/icons/drawericons/ownerinfo.png')} onPress={this.navigateToScreen('trapp_villaownerManage')}/>
                                <MenuItem title={'اطلاعات مکان ویلا'} icon={require('../../images/icons/drawericons/locationinfo.png')} onPress={this.navigateToScreen('placeman_placeManage')}/>
                                <MenuItem title={'اطلاعات ویلا'} icon={require('../../images/icons/drawericons/villainfo.png')} onPress={this.navigateToScreen('trapp_villaManageNew')}/>
                                <MenuItem title={'تصاویر ویلا'} icon={require('../../images/icons/drawericons/photos.png')} onPress={this.navigateToScreen('placeman_placePhotoManage')}/>
                                <MenuItem title={'امکانات ویلا'} icon={require('../../images/icons/drawericons/options.png')} onPress={this.navigateToScreen('trapp_villaoptionManage')}/>
                                <MenuItem title={'مدیریت ویلا'} icon={require('../../images/icons/drawericons/management.png')} onPress={this.navigateToScreen('trapp_villaReservationInfo')}/>
                                <MenuItem title={'مشاهده ویلای من'} icon={require('../../images/icons/drawericons/view.png')} onPress={()=>{
                                    if(global.villaID>0)
                                        this.navigateToScreen('trapp_villaView')();
                                }}/>
                                <MenuItem title={'خروج از حساب'} icon={require('../../images/icons/drawericons/logout.png')} onPress={onLogout}/>
                            </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
                }
                {Constants.DefaultRole == 'trapp_user' &&
                <ImageBackground source={require('../../images/sidebar.png')} style={{width: '100%', height: '100%'}}>
                    <View style={styles.container}>
                        <Image style={generalStyles.drawerTopImage} source={Constants.BaseIcon}/>
                        <ScrollView>
                            <View>
                                <MenuItem title={'جستجوی ویلا'} icon={require('../../images/icons/drawericons/find.png')} onPress={this.navigateToScreen('trapp_villaList')}/>
                                <MenuItem title={'رزروها'} icon={require('../../images/icons/drawericons/reservelist.png')} onPress={this.navigateToScreen('trapp_orderList')}/>
                                <MenuItem title={'خروج از حساب'} icon={require('../../images/icons/drawericons/logout.png')} onPress={onLogout}/>
                            </View>

                        </ScrollView>
                    </View>
                </ImageBackground>
                }
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object,
};
class MenuItem extends Component<{}>
{
    render()
    {
        return <TouchableHighlight onPress={this.props.onPress}>
            <View style={styles.navItemBarStyle}>
                <Image style={styles.navItemIconStyle}
                       source={this.props.icon}/>
                <Text style={styles.navItemTextStyle}
                      >
                    {this.props.title}
                </Text>
            </View>
        </TouchableHighlight>
    }
}
export default SideMenu;
