// @flow
import controller from '../../../sweet/architecture/controller';
import SweetFetcher from '../../../classes/sweet-fetcher';
import Constants from '../../../classes/Constants';
import SweetConsole from '../../../classes/SweetConsole';
import {showLocation} from 'react-native-map-link';
export default class VillaViewController extends controller{
    load(villaId,onLoad)
    {
        new SweetFetcher().Fetch('/trapp/villa/' + villaId, SweetFetcher.METHOD_GET, null, data => {
            onLoad(data.Data);

        });
    }
    static sendComment(villaId,commentText,rate,onSend,onError)
    {
        let data=new FormData();
        data.append('text',commentText);
        data.append('ratenum',rate);
        data.append('subjectentity',villaId);
        data.append('commenttype','1');
        new SweetFetcher().Fetch('/comments/comment', SweetFetcher.METHOD_POST, data, data => {
            if(data.hasOwnProperty('Data'))
                onSend(data.Data);
            else
                onError(null);
        },error=>{onError(error);},'comments','comment',null);
    }
    static openGps(villaId,latitude,longitude)
    {
            const label = 'ویلای کد '+villaId;
            showLocation({
                latitude: latitude,
                longitude: longitude,
                title: label,  // optional
                googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
                dialogTitle: 'نمایش در نقشه', // optional (default: 'Open in Maps')
                dialogMessage: 'از کدام نرم افزار می خواهید استفاده کنید؟', // optional (default: 'What app would you like to use?')
                cancelText: 'هیچکدام', // optional (default: 'Cancel')
            });
    };
}
