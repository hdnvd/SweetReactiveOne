// @flow


import SweetFetcher from "../../../classes/sweet-fetcher";
import {AsyncStorage} from "react-native";
import Navigation from "../../../classes/navigation";
import TrappUser from '../../trapp/classes/TrappUser';
import Constants from '../../../classes/Constants';
import User from './User';

export default class UserNavigator {

    static async navigateToUserStartPage(navigation) {
        global.isLoggedIn=false;
        const returnToPrevious=navigation.getParam('returnToPrevious',false);
        if(returnToPrevious)
            navigation.goBack();
        else {
            User.getAsyncUserLoggedInState().then(isLoggedIn=>{
                User._setUserLoginStateInTemporaryGlobal(isLoggedIn);
                if(isLoggedIn)
                    Constants.userIndexNavigationEvent(navigation);
                else
                    Constants.guestIndexNavigationEvent(navigation);
            });
        }
    }

}

