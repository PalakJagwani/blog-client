import axios from 'axios'
import {API_NOTIFICATION_MESSAGES, SERVICE_URLS} from './config.js'
import { getAccessToken, getType } from './utils/commonutils.js'

const API_URL = 'https://blog-server-beta-seven.vercel.app'

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout : 10000
})

axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params = config.TYPE.params
        }else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response)
    },
    function(error){
        return Promise.reject(processError(error))
    }
)

const processResponse = (response) => {
    if(response?.status === 200){
        return {isSuccess : true, data : response.data}
    }else{
        return {
            isSuccess : false,
            status : response?.status,
            msg : response?.message,
            code : response?.statusCode
        }
    }
}

const processError = (error) => {
    if(error.response){
        console.log("Response Error!")
        return {
            isFailure : true,
            mssg : API_NOTIFICATION_MESSAGES.responseFailures.message,
            code : error.response.status
        }
    }else if(error.request){
        console.log("Request error!")
        return {
            isFailure : true,
            mssg : API_NOTIFICATION_MESSAGES.requestFailures.message,
            code : ""
        }
    }else{
        console.log("Network Error!")
        return {
            isFailure : true,
            mssg : API_NOTIFICATION_MESSAGES.networkErrors.message,
            code : ""
        }
    }
} 

const API = {};

for(const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method : value.method,
            url : value.url,
            data : value.method === 'DELETE' ? {} : body,
            responseType : value.responseType,
            headers : {
                authorization : getAccessToken()
            },
            TYPE : getType(value, body), 
            onUploadProgress : function (progressEvent){
                if(showUploadProgress){
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentCompleted)
                }
            },
            onDownloadProgress : function (progressEvent){
                if(showDownloadProgress){
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentCompleted)
                }
            }
        })
}

export {API}

