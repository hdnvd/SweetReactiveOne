// @flow


import SweetFetcher from "../../../classes/sweet-fetcher";
import {AsyncStorage} from "react-native";
import Navigation from "../../../classes/navigation";
import TrappUser from '../../trapp/classes/TrappUser';

export default class UserNavigator {

    static navigateToUserStartPage(navigation) {
        // TrappUser.navigateToUserStartPage(navigation);
        // navigation.dispatch(Navigation.resetNavigationAndNavigate('carserviceorder_requestIndex'));
        navigation.dispatch(Navigation.resetNavigationAndNavigate('trapp_villaList'));
        // navigation.dispatch(Navigation.resetNavigationAndNavigate('comments_commentManage'));

    }

    static getUserFullInfo(onInfoLoaded) {
        new SweetFetcher().Fetch('/trapp/userfullinfo', SweetFetcher.METHOD_GET, null, data => {
            onInfoLoaded(data.Data);
        });
    }
}

