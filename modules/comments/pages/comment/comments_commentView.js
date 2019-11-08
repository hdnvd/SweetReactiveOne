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
import comments_commentViewController from '../../controllers/comment/comments_commentViewController';
import comments_commentViewStyles from '../../values/styles/comment/comments_commentViewStyles';

export default class comments_commentView extends SweetPage {
    
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        super.componentDidMount();
        this.loadData();
    }
    
    loadData = () => {
        this.setState({isLoading: true},()=>{
            new comments_commentViewController().load(global.commentID,(data)=>{
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
                                
                            <TextRow title={'متن'} content={this.state.LoadedData.text} />
                            <TextRow title={'چگونه نوع'} content={this.state.LoadedData.commenttypeinfo.name} />
                            <TextRow title={'نرخ'} content={this.state.LoadedData.ratenum} />
                            <TextRow title={'نظر مادر'} content={this.state.LoadedData.mothercommentinfo.name} />
                            <TextRow title={'کاربر'} content={this.state.LoadedData.userinfo.name} />
                            <TextRow title={'ذهنیت'} content={this.state.LoadedData.subjectentityinfo.name} />
                            </ViewBox>
                            </View>
                        </ScrollView>
                     </View>
                }
                </View>
        return (<PageContainer isLoading={this.state.isLoading}>{content}</PageContainer>);
    }
}
    