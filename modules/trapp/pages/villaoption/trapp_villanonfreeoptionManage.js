import React from 'react'

import {View, Alert, ScrollView, Dimensions, Switch, TouchableOpacity} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import AccessManager from '../../../../classes/AccessManager';
import TextBox from '../../../../sweet/components/TextBox';
import SweetButton from '../../../../sweet/components/SweetButton';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';
import SweetConsole from '../../../../classes/SweetConsole';
import ViewBox from '../../../../sweet/components/ViewBox';
import TrappUser from '../../classes/TrappUser';

export default class  trapp_villanonfreeoptionManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'امکانات ویژه ویلا'} />
        };
    };

    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            // OptionItems:[],
            Options:{},
            data:[],
        };

    }
    componentDidMount()
    {

        this.loadData();
    }
    getOption(id)
    {
      return this.state.Options[id];
    };
    loadData=()=>{
        if(global.villaID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/villanonfreeoption/byvilla/'+global.villaID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                let Options=this.state.Options;
                data.Data.forEach(dt=>{Options[dt.id]=dt;});
                this.setState({data:data.Data,Options:Options});

            });
        }//IF
    };
    render() {
        SweetConsole.log(this.state.Options);
        let Window = Dimensions.get('window');
        return (
            <View style={{flex:1}}  >
                <View  style={{flex:1}}>
                    <ScrollView contentContainerStyle={{minHeight: this.height || Window.height}}>
                        <View style={generalStyles.container}><TouchableOpacity><View>
                            {/*{this.state.OptionItems}*/}
                            {this.state.data.map(dt=>{
                                return <MyOptionBox name={dt.name} value={this.getOption(dt.id).pricenum+""} onChangeText={(text) => {
                                    let newOptions=this.state.Options;
                                    newOptions[dt.id]={...newOptions[dt.id],pricenum:text};
                                    this.setState({Options:newOptions});
                                }} onDisableSwitchValueChange={(value)=>{

                                    let newOptions=this.state.Options;
                                    newOptions[dt.id]={...newOptions[dt.id],maxcountnum:value?1:0};
                                    this.setState({Options:newOptions});
                                }} enabled={this.getOption(dt.id).maxcountnum>0}
                                />
                            })}


                        </View></TouchableOpacity></View>
                    </ScrollView>
                </View>
                <View style={generalStyles.actionButtonContainer}>
                    <SweetButton title='ذخیره' style={generalStyles.actionButton} onPress={(OnEnd) => {
                        let formIsValid=true;
                        if(formIsValid)
                        {

                            SweetConsole.log(this.state.Options);
                            const data = new FormData();
                            let id = global.villaID;
                            let method=SweetFetcher.METHOD_PUT;
                            let Separator='';
                            let action=AccessManager.EDIT;
                            Separator='/';
                            data.append('villaid', id);
                            console.log(this.state.Options);
                            Object.keys(this.state.Options).forEach(Item=>{
                                data.append('optionprice'+Item, this.state.Options[Item].pricenum);
                                data.append('optionmaxcount'+Item, this.state.Options[Item].maxcountnum);
                            });
                            new SweetFetcher().Fetch('/trapp/villanonfreeoption/byvilla/'+global.villaID, method, data, data => {
                                if(data.hasOwnProperty('Data'))
                                {
                                    TrappUser.navigateToNextPage(this.props.navigation,TrappUser.PAGE_VILLA_NON_FREE_OPTIONS_MANAGE,true);

                                    // if(global.villaID<=0)
                                    // this.props.navigation.navigate('placeman_placePhotoManage', { name: 'placeman_placePhotoManage' });
                                    // else
                                    // {
                                    //     this.props.navigation.navigate('trapp_villaReservationInfo', { name: 'trapp_villaReservationInfo' });
                                    // }
                                    // Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                    OnEnd(true);
                                }
                            },(error)=>{OnEnd(false)},'trapp','villaoption',this.props.history);
                        }
                        else
                            OnEnd(false);
                    }}/>
                </View>
                </View>
            )
    }
}
class MyOptionBox extends React.Component<{}>{
    render() {
       return(<ViewBox title={this.props.name} showDisableSwitch={true} enabled={this.props.enabled} onDisableSwitchValueChange={this.props.onDisableSwitchValueChange}>
           <TextBox selectTextOnFocus={true} keyboardType='numeric'
                    title={'قیمت هر شب به ریال '} value={this.props.value}
                    onChangeText={this.props.onChangeText}/>
       </ViewBox>);
    }
}
