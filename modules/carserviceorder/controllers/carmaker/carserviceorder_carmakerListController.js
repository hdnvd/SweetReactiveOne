import controller from '../../../../sweet/architecture/controller';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import Constants from '../../../../classes/Constants';
import SweetConsole from '../../../../classes/SweetConsole';
import SweetAlert from '../../../../classes/SweetAlert';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';


export default class carserviceorder_carmakerListController extends controller {
    static SORTFIELD_ID = 'id';
    loadData = (SearchText, SearchFields,nextStartRow,sortField,onLoad) => {
            let Request=new SweetHttpRequest();
            Request.appendVariablesFromObjectKeys(SearchFields,true);
            Request.appendVariable('__pagesize', Constants.DEFAULT_PAGESIZE);
            if (sortField === carserviceorder_carmakerListController.SORTFIELD_ID)
                Request.appendVariable('id__sort', '1');
            Request.appendVariable('__startrow', nextStartRow);
            Request.appendVariable('searchtext', SearchText,true);
            let filterString = Request.getParamsString();
            if(filterString!='') filterString='?'+filterString;
            let url='/carserviceorder/carmaker'+filterString;
            new SweetFetcher().Fetch(url,SweetFetcher.METHOD_GET, null, data => {
                onLoad(data.Data);
            });
    };
}
    