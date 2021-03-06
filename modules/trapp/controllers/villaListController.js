// @flow
import controller from '../../../sweet/architecture/controller';
import SweetFetcher from '../../../classes/sweet-fetcher';
import Constants from '../../../classes/Constants';
import SweetHttpRequest from '../../../classes/sweet-http-request';
import SweetConsole from '../../../classes/SweetConsole';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import SweetAlert from '../../../classes/SweetAlert';
export default class VillaListController extends controller{

    static SORTFIELD_NORMALPRICE = 'normalpriceprc';
    static SORTFIELD_MAXNORMALPRICE = 'maxnormalpriceprc';
    static SORTFIELD_MOSTPOPULAR = 'ordercountnum';
    static SORTFIELD_MOSTDISCOUNT = 'discountnum';
    static SORTFIELD_RATE = 'ratenum';
    static SORTFIELD_DISTANCE = 'distance';
    loadData = (SearchText, SearchFields,nextStartRow,sortField,latitude,longitude,onLoad) => {

        SweetConsole.log(SearchFields);
        let Request = new SweetHttpRequest();
        Request.appendVariablesFromObjectKeys(SearchFields,true);
        Request.appendVariable('__pagesize', Constants.DEFAULT_PAGESIZE);
        if (sortField === VillaListController.SORTFIELD_NORMALPRICE)
            Request.appendVariable('normalpriceprc__sort', '1');
        if (sortField === VillaListController.SORTFIELD_MAXNORMALPRICE)
            Request.appendVariable('maxnormalpriceprc__sort', '1');
        else if (sortField === VillaListController.SORTFIELD_RATE)
            Request.appendVariable('ratenum__sort', '1');
        else if (sortField === VillaListController.SORTFIELD_MOSTPOPULAR)
            Request.appendVariable('ordercountnum__sort', '1');
        else if (sortField === VillaListController.SORTFIELD_MOSTDISCOUNT)
            Request.appendVariable('discountnum__sort', '1');
        else
            Request.appendVariable('distance__sort', '1');
        // if (sortField === VillaListController.SORTFIELD_DISTANCE)
        try {

            Request.appendVariable('userlatitude',latitude,true);
            Request.appendVariable('userlongitude',longitude,true);
        }
        catch (e) {
        }
        Request.appendVariable('__startrow', nextStartRow);
        Request.appendVariable('searchtext', SearchText,true);
        let filterString = Request.getParamsString();
        if (filterString != '') filterString = '?' + filterString;
        let url = '/trapp/villa' + filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, data => {
            onLoad(data.Data);
        });
    };
    static findCoordinates = (onPrepared) => {

        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
                Geolocation.getCurrentPosition(
                    position => {
                        // const location = JSON.stringify(position);
                        // SweetConsole.log(location);
                        onPrepared(position);

                    },
                    error => {
                        SweetConsole.log(error);
                        // SweetAlert.displaySimpleAlert('پیام','خطایی در دریافت موقعیت مکانی شما به وجود آمد.');
                    },
                    {enableHighAccuracy: false, timeout: 20000}
                );
            }).catch(err => {
            SweetAlert.displaySimpleAlert('پیام','لطفا برای مشاهده فاصله ویلاها GPS گوشی خود را روشن کنید.');

        });

    };
}
