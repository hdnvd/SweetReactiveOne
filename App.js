/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { Dimensions  } from 'react-native';

import React, {Fragment} from 'react';
import { createDrawerNavigator } from 'react-navigation';
import SideMenu from './components/sidemenu/SideMenu'
import stackNav from './components/sidemenu/stackNav';

import { YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
YellowBox.ignoreWarnings(['Warning: ReactNative.IsMounted']);

console.disableYellowBox = true;
const App = createDrawerNavigator({
    Item1: {
        screen: stackNav,
    }
}, {
    drawerPosition: 'right',
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});
global.usertype = 1;//Branch Admins
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
export default App;
