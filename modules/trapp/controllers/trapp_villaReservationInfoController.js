// @flow
import controller from '../../../sweet/architecture/controller';
import SweetFetcher from '../../../classes/sweet-fetcher';
import Constants from '../../../classes/Constants';
import SweetConsole from '../../../classes/SweetConsole';
import {showLocation} from 'react-native-map-link';
import AccessManager from '../../../classes/AccessManager';
import ComponentHelper from '../../../classes/ComponentHelper';
import Navigation from '../../../classes/navigation';
import SweetAlert from '../../../classes/SweetAlert';
export default class trapp_villaReservationInfoController extends controller{
    static saveRangeServiceState(villaId,rangeStart,duration,isOn,onDone,onError)
    {
            const data = new FormData();
            data.append('id', villaId);
            let method=SweetFetcher.METHOD_GET;
            new SweetFetcher().Fetch('/trapp/villa/reservebyowner/'+villaId+"?datestart="+rangeStart+"&duration="+duration+"&gives_service="+(isOn?"1":"0"), method, data, data => {
                if(data.hasOwnProperty('Data'))
                {
                    SweetAlert.displaySimpleAlert("OK","Reserved");
                    onDone(data.Data);
                }
            },(err)=>{onError(err)},'trapp','villa',null);
    }
}
