// @flow
import controller from '../../../sweet/architecture/controller';
import SweetFetcher from '../../../classes/sweet-fetcher';
import Constants from '../../../classes/Constants';
import SweetConsole from '../../../classes/SweetConsole';
import {showLocation} from 'react-native-map-link';
export default class VillaManageController extends controller{
    load(villaId,onLoad)
    {
        new SweetFetcher().Fetch('/trapp/villa/' + villaId, SweetFetcher.METHOD_GET, null, data => {
            onLoad(data.Data);

        });
    }
}
