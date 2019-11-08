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
import carserviceorder_carViewController from '../../controllers/car/carserviceorder_carViewController';
import carserviceorder_carViewStyles from '../../values/styles/car/carserviceorder_carViewStyles';

export default class carserviceorder_carView extends SweetPage {
    
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        super.componentDidMount();
        this.loadData();
    }
    
    loadData = () => {
        this.setState({isLoading: true},()=>{
            new carserviceorder_carViewController().load(global.carID,(data)=>{
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
                                
                          <Image style={generalStyles.topimage} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.photoigu}}/>

                            <TextRow title={'عنوان'} content={this.state.LoadedData.title} />
                            <TextRow title={'حداکثر مدل'} content={this.state.LoadedData.maxmodelnum} />
                            <TextRow title={'حداقل مدل'} content={this.state.LoadedData.minmodelnum} />
                            <TextRow title={'خودروساز'} content={this.state.LoadedData.carmakerinfo.name} />
                            </ViewBox>
                            </View>
                        </ScrollView>
                     </View>
                }
                </View>
        return (<PageContainer isLoading={this.state.isLoading}>{content}</PageContainer>);
    }
}
    