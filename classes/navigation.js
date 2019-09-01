import {AsyncStorage, Alert, Linking} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import SweetConsole from './SweetConsole';
export default class Navigation {
    static resetNavigationAndNavigate = (Destination) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Destination })],
        });
        return resetAction;
    };
    static openURL = (URL) => {
        Linking.canOpenURL(URL).then(supported => {
            if (supported) {
                Linking.openURL(URL);
            } else {
                SweetConsole.log("Don't know how to open URI: " + URL);
            }
        });
    };
};
