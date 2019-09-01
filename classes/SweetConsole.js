// @flow
import Constants from './Constants';
export default class SweetConsole{
    static log(data)
    {
        if(Constants.Debugging)
            console.log(data);
    }
}
