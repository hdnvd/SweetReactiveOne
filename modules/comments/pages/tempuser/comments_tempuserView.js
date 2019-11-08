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
import comments_tempuserViewController from '../../controllers/tempuser/comments_tempuserViewController';
import comments_tempuserViewStyles from '../../values/styles/tempuser/comments_tempuserViewStyles';

export default class comments_tempuserView extends SweetPage {
    
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        super.componentDidMount();
        this.loadData();
    }
    
    loadData = () => {
        this.setState({isLoading: true},()=>{
            new comments_tempuserViewController().load(global.tempuserID,(data)=>{
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
                                
                            <TextRow title={'نام'} content={this.state.LoadedData.name} />
                            <TextRow title={'نام خانوادگی'} content={this.state.LoadedData.family} />
                            <TextRow title={'موبایل'} content={this.state.LoadedData.mobilenum} />
                            <TextRow title={'ایمیل'} content={this.state.LoadedData.email} />
                            <TextRow title={'تلفن'} content={this.state.LoadedData.telnum} />
                            </ViewBox>
                            </View>
                        </ScrollView>
                     </View>
                }
                </View>
        return (<PageContainer isLoading={this.state.isLoading}>{content}</PageContainer>);
    }
}
    