// @flow


import SweetFetcher from "../../../classes/sweet-fetcher";
import {AsyncStorage} from "react-native";
import SweetNavigation from "../../../classes/sweetNavigation";

export default class TrappUser {

    static navigateToUserStartPage(navigation) {
        AsyncStorage.getItem('userroles').then((roles) => {
            if (roles == 'trapp_villaowner') {
                console.log("trapp_villaowner:" + roles);
                TrappUser.getUserFullInfo((data => {
                    let {places, villas,owners} = data;
                    // console.log("owners:" + owners);
                    if (owners == null || owners.length == 0)
                    {
                        // console.log("owners");
                        SweetNavigation.resetAndNavigateToNormalPage(navigation,'trapp_villaownerManage');
                    }
                    else if (places == null || places.length == 0)
                    {
                        global.ownerId=owners[0].id;
                        SweetNavigation.resetAndNavigateToNormalPage(navigation,'placeman_placeManage');
                    }
                    else if (villas == null || villas.length == 0)
                    {
                        global.placeId=places[0].id;
                        global.ownerId=owners[0].id;
                        SweetNavigation.resetAndNavigateToNormalPage(navigation,'trapp_villaManage');
                    }
                    else
                    {
                        global.placeId=places[0].id;
                        global.itemID=villas[0].id;
                        global.villaID=villas[0].id;
                        global.ownerId=owners[0].id;
                        // navigation.dispatch(SweetNavigation.resetNavigationAndNavigate('placeman_placePhotoManage'));
                        SweetNavigation.resetAndNavigateToNormalPage(navigation,'trapp_villaReservationInfo');
                    }
                }));
            }
        });

    }
    static PAGE_OWNER_MANAGE=1;
    static PAGE_PLACE_MANAGE=2;
    static PAGE_VILLA_MANAGE=3;
    static PAGE_VILLA_OPTIONS_MANAGE=4;
    static PAGE_VILLA_NON_FREE_OPTIONS_MANAGE=5;
    static PAGE_VILLA_PHOTO_MANAGE=6;
    static PAGE_VILLA_RESERVATION_INFO=7;
    static navigateToNextPage(navigation,currentPage,isAdding){
        if(isAdding){
            switch (currentPage) {
                case this.PAGE_OWNER_MANAGE:
                    SweetNavigation.navigateToNormalPage(navigation,"placeman_placeManage");
                    break;
                case this.PAGE_PLACE_MANAGE:
                    SweetNavigation.navigateToNormalPage(navigation,'trapp_villaManage');
                    break;
                case this.PAGE_VILLA_MANAGE:
                    SweetNavigation.navigateToNormalPage(navigation,'trapp_villaoptionManage');
                    break;
                case this.PAGE_VILLA_OPTIONS_MANAGE:
                    SweetNavigation.navigateToNormalPage(navigation,'trapp_villanonfreeoptionManage');
                    break;
                case this.PAGE_VILLA_NON_FREE_OPTIONS_MANAGE:
                    SweetNavigation.navigateToNormalPage(navigation,'placeman_placePhotoManage');
                    break;
                default:
                    SweetNavigation.navigateToNormalPage(navigation,'trapp_villaReservationInfo');
            }
        }
        else
            SweetNavigation.navigateToNormalPage(navigation,'trapp_villaReservationInfo');



    }
    static getUserFullInfo(onInfoLoaded) {
        new SweetFetcher().Fetch('/trapp/userfullinfo', SweetFetcher.METHOD_GET, null, data => {
            onInfoLoaded(data.Data);
        });
    }
}

