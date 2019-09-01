
import Common from './Common';
class SweetHttpRequest {
    _Variables=[];
    constructor()
    {
        this._Variables=[];
    };
    appendVariable(Name, Value,skipNullValues)
    {
        if(skipNullValues===null)
            skipNullValues=false;
        if(!skipNullValues || (Value!==null && (Value+'').length>0))
            this._Variables.push({id:Name,value:Value});
    }
    appendVariables(Variables,NameField,ValueField,skipNullValues)
    {
        this.appendVariablesWithPostFix(Variables,NameField,ValueField,'',skipNullValues);
    }
    appendVariablesAsArray(Variables,ArrayName,ValueField,skipNullValues)
    {
        for(let i=0;Variables!=null && i<Variables.length;i++)
        {
            // console.log(Variables[i][ValueField]);
            this.appendVariable(ArrayName+"[]",Variables[i][ValueField],skipNullValues);
        }
    }
    appendVariablesWithPostFix(Variables,NameField,ValueField,PostFix,skipNullValues)
    {
        for(let i=0;Variables!=null && i<Variables.length;i++)
        {
            // console.log(Variables[i][NameField]+PostFix);
            this.appendVariable(Variables[i][NameField]+PostFix,Variables[i][ValueField],skipNullValues);
        }

    }
    appendVariablesFromObjectKeys(VariablesObject,skipNullValues)
    {
        return this.appendVariablesWithPostFixFromObjectKeys(VariablesObject,"",skipNullValues);
    }
    appendVariablesWithPostFixFromObjectKeys(VariablesObject,PostFix,skipNullValues)
    {
        if(VariablesObject==null)
            return;
        let KeyValueArray=Common.ObjectToIdValueArray(VariablesObject);
        return this.appendVariablesWithPostFix(KeyValueArray,"id","value",PostFix,skipNullValues);
    }
    getParamsString()
    {
        return SweetHttpRequest.getHttpGetParamsFromArray(this._Variables);
    }
    static getHttpGetParamsFromArray(filtered)
    {
        let CurrentString='';
        for(let i=0;filtered!=null && i<filtered.length;i++)
            CurrentString=this.appendHttpParamToString(CurrentString,filtered[i]['id'],Common.getStringValue(filtered[i]['value']));
        return CurrentString;
    }

    static appendHttpParamToString(CurrentString,VariableName,VariableValue)
    {
        if(CurrentString!=='')
            CurrentString=CurrentString+"&";
        CurrentString+=VariableName+'='+VariableValue;
        return CurrentString;
    }
}
export default SweetHttpRequest;
