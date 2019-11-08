/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import generalStyles from '../../styles/generalStyles';
import PlaceManager from '../../modules/placeman/classes/PlaceManager';

export default class CityAreaSelector extends Component<{}> {
    placemanager = new PlaceManager();
    constructor(props) {
        super(props);
        this.state =
            {
                infoLoaded: false,
                provinceOptions: [<Picker.Item label='استان' value='-1' style={generalStyles.pickerItem}/>],
                cityOptions: [<Picker.Item label='شهر' value='-1' style={generalStyles.pickerItem}/>],
                areaOptions: [<Picker.Item label='منطقه' value='-1' style={generalStyles.pickerItem}/>],
                selectedProvinceValue: -1,
                selectedCityValue: -1,
                selectedAreaValue: -1,
            };

        this.placemanager.onProvincesLoaded = (ProvinceOptions, Provinces) => {
            const provinceID = (Provinces != null && Provinces.length > 0) ? Provinces[0].id : -1;
            this.setState({
                provinceOptions: ProvinceOptions,
                selectedProvinceValue: provinceID,
                selectedCityValue: -1,
            }, () => {
                this.placemanager.loadCityOptions(provinceID);
            });
        };
        this.placemanager.onCitiesLoaded = (CityOptions, Cities) => {
            const cityID = (Cities != null && Cities.length > 0) ? Cities[0].id : -1;
            this.setState({cityOptions: CityOptions, selectedCityValue: cityID, selectedAreaValue: -1}, () => {
                this.placemanager.loadAreaOptions(this.state.selectedProvinceValue, cityID);
                if (this.props.onCitySelected != null) {
                    this.props.onCitySelected(cityID);
                }
            });
        };
        this.placemanager.onAreasLoaded = (AreaOptions, Areas) => {
            const AreaID = (Areas != null && Areas.length > 0) ? Areas[0].id : -1;
            this.setState({areaOptions: AreaOptions, selectedAreaValue: AreaID}, () => {
                if (this.props.onAreaSelected != null) {
                    this.props.onAreaSelected(AreaID);
                }
            });
        };
    }
    loadData = () => {
        this.placemanager.loadProvinceOptions();
    };
    componentDidMount() {
        this.loadData();
    }

    render() {
        return (<View>
            <View>
                <Text style={generalStyles.inputLabel}>استان</Text>
                <Picker style={generalStyles.select}
                        name='placemanprovinces'
                        selectedValue={this.state.selectedProvinceValue}
                        onValueChange={
                            (ProvinceID, index) => {
                                this.setState({
                                    selectedProvinceValue: ProvinceID,
                                    selectedCityValue: -1,
                                    selectedAreaValue: -1,
                                }, () => {
                                    this.placemanager.loadCityOptions(ProvinceID);
                                });
                            }
                        }
                >
                    {this.state.provinceOptions}
                </Picker>
            </View>
            <View>
                <Text style={generalStyles.inputLabel}>شهر</Text>
                <Picker style={generalStyles.select}
                        name='placemancities'
                        selectedValue={this.state.selectedCityValue}
                        onValueChange={(CityID, index) => {
                            this.setState({selectedCityValue: CityID, selectedAreaValue: -1}, () => {
                                this.placemanager.loadAreaOptions(this.state.selectedProvinceValue, CityID);
                                if (this.props.onCitySelected != null) {
                                    this.props.onCitySelected(CityID);
                                }
                            });
                        }}
                >
                    {this.state.cityOptions}
                </Picker>
            </View>
            {(this.props.displayAreaSelect == null || this.props.displayAreaSelect == true) &&
            <View>
                <Text style={generalStyles.inputLabel}>منطقه</Text>
                <Picker style={generalStyles.select}
                        name='placemanareas'
                        selectedValue={this.state.selectedAreaValue}
                        onValueChange={(AreaID, index) => {
                            this.setState({selectedAreaValue: AreaID}, () => {
                                this.props.onAreaSelected(AreaID);
                            });

                        }}
                >
                    {this.state.areaOptions}
                </Picker>
            </View>
            }
        </View>);
    }
}

