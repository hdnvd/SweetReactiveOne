import controller from '../../../../sweet/architecture/controller';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import Constants from '../../../../classes/Constants';
import SweetConsole from '../../../../classes/SweetConsole';
import SweetAlert from '../../../../classes/SweetAlert';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';


export default class carserviceorder_requestViewController extends controller {
    load(requestId,onLoad)
    {
        new SweetFetcher().Fetch('/trapp/request/' + requestId, SweetFetcher.METHOD_GET, null, data => {
            onLoad(data.Data);
        });
    }
}
    