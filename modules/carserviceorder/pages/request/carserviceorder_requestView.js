import React, {Component} from 'react';
import {StyleSheet,View,ScrollView,Dimensions,Text,Image} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import Constants from '../../../../classes/Constants';
import Common from '../../../../classes/Common';
import TextRow from '../../../../sweet/components/TextRow';
import SweetButton from '../../../../sweet/components/SweetButton';
import SimpleMap from '../../../../components/SimpleMap';
import SweetAlert from '../../../../classes/SweetAlert';
import SweetPage from '../../../../sweet/components/SweetPage';
import PageContainer from '../../../../sweet/components/PageContainer';
import SweetTopCarousel from '../../../../sweet/components/SweetTopCarousel';
import ViewBox from '../../../../sweet/components/ViewBox';
import carserviceorder_requestViewController from '../../controllers/request/carserviceorder_requestViewController';
import carserviceorder_requestViewStyles from '../../values/styles/request/carserviceorder_requestViewStyles';

export default class carserviceorder_requestView extends SweetPage {
    
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        super.componentDidMount();
        this.loadData();
    }
    
    loadData = () => {
        this.setState({isLoading: true},()=>{
            new carserviceorder_requestViewController().load(global.requestID,(data)=>{
                this.setState({LoadedData: {...data}, isLoading: false});
            });
        });
    };


    render() {
        let Window = Dimensions.get('window');
        let content=<View style={{flex: 1}}>
                {this.state.LoadedData != null &&
                    <View>
                        <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                            <View style={generalStyles.containerWithNoBG}>
                            <ViewBox title={'اطلاعات'}>
                                
                            <TextRow title={'مدل خودرو'} content={this.state.LoadedData.carmakeyearnum} />
                            <TextRow title={'خودرو'} content={this.state.LoadedData.carinfo.name} />
                            <View style={generalStyles.mapContainer}>
                                <SimpleMap style={generalStyles.map} latitude={parseFloat(this.state.LoadedData.latitude)+0} longitude={parseFloat(this.state.LoadedData.longitude)+0} />
                            </View>
                            </ViewBox>
                            </View>
                        </ScrollView>
                     </View>
                }
                </View>
        return (<PageContainer isLoading={this.state.isLoading}>{content}</PageContainer>);
    }
}
    