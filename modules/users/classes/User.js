// @flow
import AsyncStorage from "@react-native-community/async-storage";
import Common from '../../../classes/Common';
import SweetConsole from '../../../classes/SweetConsole';

export default class User {

    static saveToken = (token) => {
        try {
            AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log(error);
        }
    };
    static saveUserData(roles,accesses,sessionKey)
    {

        let RolePart = ['userroles', ''];
        if (!roles.empty)
            RolePart = ['userroles', roles[0]];

        let AsyncStorageObject = [['token',sessionKey],['sessionkey',sessionKey], RolePart];

        let access = Common.convertObjectPropertiesToLowerCase(accesses);
        let key, keys = Object.keys(access);
        let n = keys.length;
        while (n--) {
            key = keys[n];
            SweetConsole.log('access.' + access[key].name);
            AsyncStorageObject.push(['access.' + access[key].name, "1"]);
        }
        return AsyncStorage.multiSet(AsyncStorageObject);
    }
    static async getAsyncUserLoggedInState()
    {
        let result=false;
        await AsyncStorage.getItem('token').then((value)=>{result=( value!=null && value.length>2)});
        return result;
    }
    static isUserLoggedIn(){
        return global.isUserLoggedIn===true;
    }
    static _setUserLoginStateInTemporaryGlobalFromToken=(sessionKey)=>{
        global.isUserLoggedIn=sessionKey!=null && sessionKey.length>2;
    };
    static _setUserLoginStateInTemporaryGlobal=(isUserLoggedIn)=>{
        global.isUserLoggedIn=isUserLoggedIn;
    };
}

