// @flow
import Constants from './Constants';
export default class SweetConsole{
    static log(data,title)
    {
        if(Constants.Debugging){
            if(title!=null)
                console.log(title);
            console.log(data);
        }
    }
}
