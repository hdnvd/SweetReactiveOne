import controller from '../../../../sweet/architecture/controller';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import Constants from '../../../../classes/Constants';
import SweetConsole from '../../../../classes/SweetConsole';
import SweetAlert from '../../../../classes/SweetAlert';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';


export default class carserviceorder_requestManageController extends controller {
    load(requestID,onLoad)
    {
        if(requestID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/carserviceorder/request/'+requestID,SweetFetcher.METHOD_GET, null, data => {
                onLoad(data.Data);
            });
        }//if
    }

    static getCars = (searchText,afterFind,onError) => {
        new SweetFetcher().Fetch('/carserviceorder/car?title='+searchText,SweetFetcher.METHOD_GET, null, data => {
            if(data!=null)
                afterFind(data.Data);
            else
                onError();
        });
    };
    save(requestID,data,onSave,onError)
    {
        let method=SweetFetcher.METHOD_POST;
        let recordIdentifier='';
        let action=AccessManager.INSERT;
        if(requestID!=null && requestID.length>=1){
            method=SweetFetcher.METHOD_PUT;
            recordIdentifier='/'+requestID;
            action=AccessManager.EDIT;
            data.append('id', requestID);
        }//if
        new SweetFetcher().Fetch('/carserviceorder/request'+recordIdentifier, method, data, data => {
            if(data.hasOwnProperty('Data'))
                onSave(data.Data);
            else
                onError(null);
        },error=>{onError(error);},'carserviceorder','request',null);
    }
}
