// @flow

class Constants {
    static SERVERMODE_LARAVEL=1;
    static SERVERMODE_ASP=2;
    static DefaultPageSize=2;
    // static SiteURL="http://77.104.83.68:813";
    // static SiteURL="http://192.168.1.2";
    static SiteURL="http://trapptest.sweetsoft.ir";
    // static SiteURL="http://37.228.139.68";
    // static SiteURL="http://192.168.43.97";
    // static SiteURL="http://192.168.43.2";
    // static SiteURL="http://10.0.2.2";
    static ServerURL=Constants.SiteURL;
    // static SiteURL="http://localhost";
    // static SiteURL="http://contact.sweetsoft.ir";
    // static ServerMode=Constants.SERVERMODE_ASP;
    static DEFAULT_PAGESIZE=7;
    static UserBaseColor='#15be29';
    static OwnerBaseColor='#1a2e46';
    static UserBaseBGColor='#ffffff';
    static OwnerBaseBGColor='#1a2e46';
    static UserBaseTextColor='#1a2e46';
    static OwnerBaseTextColor='#ffffff';
    static ServerMode=Constants.SERVERMODE_LARAVEL;
    static Debugging=true;
    static AppName="trapp_user";
    // static AppName="trapp_villaowner";
    static DefaultRole="trapp_user";
    // static DefaultRole="trapp_villaowner";
    static BaseColor=Constants.UserBaseColor;
    // static BaseColor=Constants.OwnerBaseColor;
    static BaseBGColor=Constants.UserBaseBGColor;
    // static BaseBGColor=Constants.OwnerBaseBGColor;
    static BaseTextColor=Constants.UserBaseTextColor;
    // static BaseTextColor=Constants.OwnerBaseTextColor;
    static BasePureIcon=require('../images/LogoWhiteNoText.png');
    // static BasePureIcon=require('../images/ownerIconNoText.png');
    static BaseIcon=require('../images/LogoWhite.png');
    // static BaseIcon=require('../images/OwnerIcon.png');
    static BaseIconText=require('../images/LogoText.png');
    // static BaseIconText=require('../images/ownerLogoText.png');

}
export default Constants;
