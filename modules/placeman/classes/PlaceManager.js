import {Picker} from "react-native";
import generalStyles from "../../../styles/generalStyles";
import React from "react";
export default class  PlaceManager {
    set selectedProvinceValue(value) {
        this._selectedProvinceValue = value;
    }
    _selectedProvinceValue=-1;
    set onProvincesLoaded(value) {
        this._onProvincesLoaded = value;
    }

    set onCitiesLoaded(value) {
        this._onCitiesLoaded = value;
    }

    set onAreasLoaded(value) {
        this._onAreasLoaded = value;
    }
    _onProvincesLoaded=(a)=>{};
    _onCitiesLoaded=(a)=>{};
    _onAreasLoaded=(a)=>{};
    loadProvinceOptions = () => {
        if(global.provinces!=null)
        {
            let placemanareas=global.provinces.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
            this._onProvincesLoaded(placemanareas,global.provinces);
        }
        // new SweetFetcher().Fetch('/placeman/provinces',SweetFetcher.METHOD_GET, null, data => {
        //     let placemanareas=data.Data.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
        //     this._onProvincesLoaded(placemanareas,data.Data);
        // });
    };
    loadCityOptions = (ProvinceID) => {
        if(global.provinces!=null) {
            let Province = global.provinces.filter(a => a.id == ProvinceID)[0];
            let placemanareas = Province.cities.map(dt => {
                return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem}/>
            });
            this._onCitiesLoaded(placemanareas, Province.cities);
        }
        // alert(ProvinceID);
        // new SweetFetcher().Fetch('/placeman/provinces/' + ProvinceID + '',SweetFetcher.METHOD_GET, null, data => {
        //     let placemanareas=data.Data.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
        //     this._onCitiesLoaded(placemanareas,data.Data);
        // });
    };
    loadAreaOptions = (ProvinceID,CityID) => {

        // alert(ProvinceID);
        // alert(CityID);
        if(global.provinces!=null && ProvinceID>0 && CityID>0)
        {

            let Province=global.provinces.filter(a=>a.id==ProvinceID)[0];
            // SweetConsole.log(Province);
            let City=Province.cities.filter(a=>a.id==CityID)[0];
            // SweetConsole.log(City);
            let placemanareas=City.areas.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
            this._onAreasLoaded(placemanareas,City.areas);
        }



        // new SweetFetcher().Fetch('/placeman/provinces/' +ProvinceID + '/' + CityID + "",SweetFetcher.METHOD_GET, null, data => {
        //     let placemanareas=data.Data.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
        //     this._onAreasLoaded(placemanareas,data.Data);
        // });
    };
}
