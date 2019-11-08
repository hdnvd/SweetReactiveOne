// @flow
import controller from '../../../sweet/architecture/controller';
import SweetFetcher from '../../../classes/sweet-fetcher';
import Constants from '../../../classes/Constants';
import SweetConsole from '../../../classes/SweetConsole';
import {showLocation} from 'react-native-map-link';
import AccessManager from '../../../classes/AccessManager';
import ComponentHelper from '../../../classes/ComponentHelper';
export default class VillaManageController extends controller{
    load(villaId,onLoad)
    {
        new SweetFetcher().Fetch('/trapp/villa/' + villaId, SweetFetcher.METHOD_GET, null, data => {
            onLoad(data.Data);

        });
    }
    save(id,data,onSave)
    {
        let method=SweetFetcher.METHOD_POST;
        let Separator='';
        let action=AccessManager.INSERT;
        if(id!==''){
            method=SweetFetcher.METHOD_PUT;
            Separator='/';
            action=AccessManager.EDIT;
            data.append('id', id);
        }
        new SweetFetcher().Fetch('/trapp/villa'+Separator+id, method, data, data => {
            onSave(true,data.Data);
        },error=>{onSave(false,null);},'trapp','villa',this.props.history);
    }
}
