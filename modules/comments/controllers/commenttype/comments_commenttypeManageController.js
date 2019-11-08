import controller from '../../../../sweet/architecture/controller';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import Constants from '../../../../classes/Constants';
import SweetConsole from '../../../../classes/SweetConsole';
import SweetAlert from '../../../../classes/SweetAlert';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';


export default class comments_commenttypeManageController extends controller {
    load(commenttypeID,onLoad)
    {
        if(commenttypeID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/comments/commenttype/'+commenttypeID,SweetFetcher.METHOD_GET, null, data => {
                onLoad(data.Data);
            });
        }//if
    }
    save(commenttypeID,data,onSave,onError)
    {
        let method=SweetFetcher.METHOD_POST;
        let recordIdentifier='';
        let action=AccessManager.INSERT;
        if(commenttypeID!=null || commenttypeID.length>=1){
            method=SweetFetcher.METHOD_PUT;
            recordIdentifier='/'+requestID;
            action=AccessManager.EDIT;
            data.append('id', commenttypeID);
        }//if
        new SweetFetcher().Fetch('/comments/commenttype'+recordIdentifier, method, data, data => {
            if(data.hasOwnProperty('Data'))
                onSave(data.Data);
            else
                onError(null);
        },error=>{onError(error);},'comments','commenttype',null);
    }
}
    