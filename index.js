/**
 * @format
 */

import {AppRegistry,Dimensions,Text} from 'react-native';
import {name as appName} from './app.json';
import { createDrawerNavigator ,createAppContainer} from 'react-navigation';
import SideMenu from './components/sidemenu/SideMenu'
import stackNav from './components/sidemenu/stackNav';
import Localization from "./classes/Localization";
import { YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
YellowBox.ignoreWarnings(['Warning: ReactNative.IsMounted']);
global.usertype = 1;//Branch Admins
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
console.disableYellowBox = true;
const drawernav = createDrawerNavigator({
    Item1: {
        screen: stackNav,
    }
}, {
    drawerPosition: Localization.isPhoneRTL()?'left':'right',
    // drawerPosition: 'right',
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});
const app=createAppContainer(drawernav);
AppRegistry.registerComponent(appName, () => app);
