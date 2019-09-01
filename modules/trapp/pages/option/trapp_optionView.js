import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import TextRow from '../../../../sweet/components/TextRow';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';

export default class  trapp_optionView extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات option'} />
        };
    };

    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                name:'',
                },

            };

        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/trapp/option/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
        });

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>

                        <View style={generalStyles.container}>

                            <TextRow title={'نام'} content={this.state.LoadedData.name} />
                            {this.state.LoadedData.free==1 && <TextRow title={''} content={'is_free'} />}
                            {this.state.LoadedData.countable==1 && <TextRow title={''} content={'is_countable'} />}
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
