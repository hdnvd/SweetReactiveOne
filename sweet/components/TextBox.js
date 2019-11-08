/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput} from 'react-native';
import generalStyles from "../../styles/generalStyles";

export default class TextBox extends Component<{}> {
    render() {
        return (
            <View>
                <Text style={this.props.labelStyle!=null?this.props.labelStyle:generalStyles.inputLabel}>{this.props.title}</Text>
                <TextInput keyboardType={this.props.keyboardType} placeholder=''  underlineColorAndroid={'transparent'} style={this.props.textStyle!=null?this.props.textStyle:generalStyles.input} onChangeText={(text) =>{this.props.onChangeText(text)} }
                           allowFontScaling={false}
                           value={this.props.value} {...this.props} />
            </View>);
    }
}

