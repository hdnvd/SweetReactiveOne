import { NativeModules, Platform } from 'react-native'
import SweetConsole from './SweetConsole';

export default class Localization{
    static isPhoneRTL()
    {
        const isIOS = Platform.OS === 'ios';
        let lang = isIOS ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;
        lang=lang.toLowerCase();
        let isRTL=false;
        // SweetConsole.log(lang);
        // if(lang!=null)
        //     isRTL=lang.includes('fa');
        global.isRTL=isRTL;
        // alert(isRTL);
        return isRTL;
    }
    static getRowDirection()
    {
        if(Localization.isPhoneRTL())
            return 'row-reverse';
        // alert('ltr');
        return 'row';
    }
    static getRowReverseDirection()
    {
        if(Localization.isPhoneRTL())
            return 'row';
        // alert('ltr');
        return 'row-reverse';
    }
    static getFlexStart()
    {
        if(Localization.isPhoneRTL())
            return 'flex-end';

        // alert('ltr');
        return 'flex-start';
    }
    static getFlexEnd()
    {
        if(Localization.isPhoneRTL())
            return 'flex-start';
        // alert('ltr');
        return 'flex-end';
    }

}
