// @flow
import Constants from "./Constants";
import {AsyncStorage,Alert} from "react-native";
import Common from "./Common";
import SweetAlert from "./SweetAlert";
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import axiosRetry from 'axios-retry';
import SweetConsole from './SweetConsole';


class SweetFetcher {
    static METHOD_GET='get';
    static METHOD_POST='post';
    static METHOD_PUT='put';
    static METHOD_DELETE='delete';

    _Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history,SessionKey){
        // NetInfo.fetch().then(state => {
        //     SweetConsole.log(state)
        // });
        let runAfterFetchFunction=(data)=>{
            try{
                AfterFetchFunction(data);
            }
            catch (error) {
                if(Constants.Debugging)
                    console.log(error);
                this._sendErrorReport(URL,Method,PostingData,data,error);
            }
        };

        let theBaseURL = Constants.SiteURL + "/api";
        SweetConsole.log("Loading URL:" + theBaseURL + URL);
        SweetConsole.log("Session Key: " + SessionKey);
        NetInfo.fetch().then(state => {
            if ( state.isInternetReachable ) {

                // Run your API call
                // alert("net available");
                // this._isNetAvailable(Constants.SiteURL).then(response=>{
                //     SweetConsole.log(response);
                //     alert("after net available");
                Method = Method.toString().trim().toLowerCase();
                let PostData = null;
                if (PostingData != null) {
                    if (Constants.ServerMode === Constants.SERVERMODE_LARAVEL) {
                        if (Method === "put") {
                            PostingData.append('_method', 'put');
                            Method = SweetFetcher.METHOD_POST;
                        }
                        PostData = PostingData;
                    }
                    else if (Constants.ServerMode === Constants.SERVERMODE_ASP) {
                        PostData = new URLSearchParams(PostingData);
                    }
                }
                // alert("43");
                let Fetched = null;
                let Prefix = '';
                if (Constants.ServerMode === Constants.SERVERMODE_LARAVEL)
                    Prefix = 'Bearer ';
                axiosRetry(axios, { retries: 3 });
                let ax = axios.create({
                    baseURL: theBaseURL,
                    headers: {
                        Accept: 'application/json',
                        Authorization: Prefix + SessionKey,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode: 'cors',
                    crossDomain: true,
                });
                    // alert("58");
                if (Method === SweetFetcher.METHOD_GET) {
                    Fetched = ax.get(URL);
                }
                else if (Method === SweetFetcher.METHOD_POST) {
                    Fetched = ax.post(URL, PostData);
                }
                else if (Method === SweetFetcher.METHOD_PUT) {
                    Fetched = ax.put(URL, PostData);
                }
                else if (Method === SweetFetcher.METHOD_DELETE) {
                    Fetched = ax.delete(URL);
                }
                    // alert("71");
                Fetched.then(response => {
                    try {
                        SweetConsole.log(response,"RESPONSE OF URL:"+URL);
                    } catch (e) {

                    }

                    // alert("78");
                    let data = response.data;
                    if (data != null) {
                        SweetConsole.log(data,"RESPONSE DATA OF URL:"+URL);
                        if (Array.isArray(data.Data)) {
                            for (let i = 0; i < data.Data.length; i++) {
                                data.Data[i] = Common.convertObjectPropertiesToLowerCase(data.Data[i]);
                            }
                        }
                        else if (data.Data != null) {
                            data.Data = Common.convertObjectPropertiesToLowerCase(data.Data);
                        }
                        // alert("91");
                        runAfterFetchFunction(data);
                    }

                }).catch(function (error) {
                    // alert("96");
                    if (OnErrorFunction != null)
                        OnErrorFunction(error);
                    if (error.response != null) {
                        // alert("102");
                        // alert(error.response.status);
                        if (error.response.status !== 200 && error.response.status !== 201 && error.response.status !== 202 && error.response.status !== 203) {

                            let status = error.response.status;
                            SweetConsole.log(status.toString().trim());
                            if (status.toString().trim() === "403"){

                                if (OnErrorFunction != null)
                                    OnErrorFunction(null);
                                SweetAlert.displaySimpleAlert("خطای عدم دسترسی", 'شما دسترسی کافی برای انجام این درخواست را ندارید');
                            }
                            if (status.toString().trim() === "401")
                            {

                                if (OnErrorFunction != null)
                                    OnErrorFunction(null);
                                SweetAlert.displaySimpleAlert("خطای اطلاعات کاربری", 'اطلاعات کاربری صحیح نمی باشد');
                            }
                            if (status.toString().trim() === "422")
                            {
                                if (OnErrorFunction != null)
                                    OnErrorFunction(null);
                                let displayDefaultMessage=true;
                                if(error.response.hasOwnProperty('data')) {
                                    let data = error.response.data;
                                    if(data.hasOwnProperty('errors') && data.errors!=null)
                                    {
                                        displayDefaultMessage=false;
                                        let message='';
                                        SweetConsole.log(data.errors);
                                        Object.keys(data.errors).forEach(function(key, index) {
                                            let item=data.errors[key];
                                            Object.keys(item).forEach(function(key, index) {
                                                let itemMessage=item[key];
                                                message=message+"\r\n"+itemMessage;
                                            });
                                        });
                                        SweetAlert.displaySimpleAlert("خطای اطلاعات ورودی",message);

                                    }
                                    else if (data.hasOwnProperty('message'))
                                    {
                                        displayDefaultMessage=false;
                                        if(data.message!=='')
                                            SweetAlert.displaySimpleAlert("خطای اطلاعات ورودی",data.message);

                                    }
                                }
                                if(displayDefaultMessage)
                                    SweetAlert.displaySimpleAlert("خطای اطلاعات ورودی", 'لطفا اطلاعات را به صورت صحیح وارد کنید');

                            }
                            if (status.toString().trim() === "500")
                            {
                                if (OnErrorFunction != null)
                                    OnErrorFunction(null);
                                let displayDefaultMessage=true;
                                let data = error.response.data;
                                if (Constants.Debugging && data.hasOwnProperty('message'))
                                {
                                    displayDefaultMessage=false;
                                    if(data.message!=='')
                                        SweetAlert.displaySimpleAlert("خطای سرور",data.message);
                                }
                                if(Constants.Debugging && displayDefaultMessage)
                                    SweetAlert.displaySimpleAlert("خطای سرور", 'خطایی در سمت سرور رخ داد، لطفا این مشکل را به پشتیبانی اطلاع دهید.');
                            }


                            if (status.toString().trim() === "400")
                            {
                                if (OnErrorFunction != null)
                                    OnErrorFunction(null);
                                SweetAlert.displaySimpleAlert("خطای موقتی سرور", 'لطفا دوباره تلاش کنید.');

                            }
                            if (status.toString().trim() === "405")
                            {
                                if (OnErrorFunction != null)
                                    OnErrorFunction(null);
                                SweetAlert.displayAccessDeniedAlert();

                            }
                            if (status.toString().trim() === "429")
                            {
                                if (OnErrorFunction != null)
                                    OnErrorFunction(null);
                                SweetAlert.displaySimpleAlert("خطای محافظت امنیتی", 'تعداد درخواست های شما بیش از حد مجاز است و به دلایل امنیتی دسترسی شما تا چند دقیقه بعد مسدود شد. لطفا چند دقیقه دیگر مراجعه نمایید');


                            }
                        }
                    }
                    else {
                        if (OnErrorFunction != null)
                            OnErrorFunction(null);
                        console.log(error);
                        if(Constants.Debugging) {
                            if (error.toString().toLowerCase().includes("network error")) {
                                SweetAlert.displaySimpleAlert('خطا', 'لطفا اتصال اینترنت خود را بررسی کنید');

                            } else {
                                SweetAlert.displaySimpleAlert('خطا', error.toString());

                            }
                        }
                        else
                            SweetAlert.displaySimpleAlert("خطا", 'خطایی پیش بینی نشده ای به وجود آمد، لطفا چند دقیقه دیگر مراجعه نمایید ');
                    }

                    SweetConsole.log(error.response,'Error Response');
                    SweetConsole.log(error,'Error');
                });

                // }).catch(
                //     error=>{
                //         SweetConsole.log(error);
                //         if (OnErrorFunction != null)
                //             OnErrorFunction(null);
                //         if(Constants.Debugging)
                //             SweetAlert.displaySimpleAlert('خطای دسترسی به سرور',error.toString());
                //         else
                //             SweetAlert.displaySimpleAlert("خطا", 'اتصال به سرور برقرار نیست.');
                //     }
                // )
            }
            else
            {
                if (OnErrorFunction != null)
                    OnErrorFunction(null);
                SweetAlert.displaySimpleAlert("خطا", 'اتصال به اینترنت برقرار نیست.');

            }
        });
    }
    _sendErrorReport(URL,Method,PostingData,data,error)
    {
        try{
            NetInfo.fetch().then(state => {
                try{

                    if (state.isInternetReachable) {

                        const theBaseURL = Constants.SiteURL + "/api";
                        const url='/support/report-error';
                        const data=new FormData();
                        data.append('type','after-fetch');
                        data.append('url',URL);
                        data.append('method',Method);
                        data.append('posting-data',JSON.stringify(PostingData));
                        data.append('received-data',JSON.stringify(data));
                        data.append('error',error.toString());
                        // data.append('error-stack',JSON.stringify(error.stack));
                        data.append('app',Constants.AppName);
                        let ax = axios.create({
                            baseURL: theBaseURL,
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            mode: 'cors',
                            crossDomain: true,
                        });
                        if(Constants.Debugging){
                            console.log(JSON.stringify(error));
                            // console.log(JSON.stringify(error.stack));
                            console.log(error.toString());
                            console.log('error report sending');
                        }
                        ax.post(url, data).then(response=>{
                            if(Constants.Debugging){
                                console.log('error report sent');
                                console.log(response);
                            }
                        });
                    }
                }catch (e) {
                    if(Constants.Debugging){
                        console.log('error sending report');
                        console.log(e.toString());
                    }
                }
            });
        }
        catch (e) {

        }
    }
    Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history){

        AsyncStorage.getItem('sessionkey').then((SessionKey)=> {
            this._Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history,SessionKey);
            // alert("227");
        }).catch(E=>{
            // alert("229");
            this._Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history,'')

        });
    }
    _isNetAvailable = (URLToCheck) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 10000, 'Request timed out');
        });
        const request = fetch(URLToCheck);

        return Promise
            .race([timeout, request]);
    }
}
export default SweetFetcher;
