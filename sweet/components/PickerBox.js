/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TouchableOpacity} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import SFMan from "../../classes/SFMan";

export default class PickerBox extends Component<{}> {
    titleFieldName='id';
    valueFieldName='id';
    showEmptyTitle=true;
    init(){
        this.titleFieldName=this.props.titleFieldName;
        this.valueFieldName=this.props.valueFieldName;
        if(this.valueFieldName==null)
            this.valueFieldName='id';
        if(this.props.options!=null && this.props.options.length>0) {
            if (this.titleFieldName == null)
                this.titleFieldName = SFMan.getTitleFieldFromObject(this.props.options[0]);
        }
    };

    getItem=(item,itemTitle,itemValue)=>{
        return <Picker.Item label={itemTitle} value={itemValue}/>;
    };
    constructor(props) {
        super(props);
    }
    getItemViews()
    {
        this.init();
        let OptionViews=null;
        let Options=this.props.options;
        if(Options!=null && Options.length>0) {
            OptionViews = Options.map(data => {
                return this.getItem(data,data[this.titleFieldName],data[this.valueFieldName]);
            });
        }
        let EmptyItemTitle=this.props.emptyItemTitle;
        if(EmptyItemTitle==null)
            EmptyItemTitle='انتخاب کنید';
        if(this.showEmptyTitle && Options!=null)
        {
            OptionViews=[this.getItem({},EmptyItemTitle,'-1'),...OptionViews];
        }
        else if(Options==null) {
            OptionViews = [this.getItem({},this.props.title,'-1')];
        }
        return OptionViews;
    }
    render() {
        let OptionViews=this.getItemViews();
        return (
            <View>
                <Text style={generalStyles.inputLabel}>{this.props.title}</Text>
                <Picker
                        name={this.props.name}
                        selectedValue ={this.props.selectedValue}
                        onValueChange={this.props.onValueChange}
                >
                    {OptionViews}
                </Picker>
            </View>);
    }
}

