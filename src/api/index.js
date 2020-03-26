import ajax from './ajax'
import {message} from 'antd'
import jsonp from 'jsonp'
import {WEATHER_BASE_URL,WEATHER_CITY,WEATHER_AK} from '../config'
//请求登录
export const reqLogin=(loginObj)=>ajax.post('/login',loginObj)
//请求天气信息
export const reqWeatherData=()=>{
    return new Promise((resolve,reject)=>{
        jsonp(`${WEATHER_BASE_URL}?location=${WEATHER_CITY}&output=json&ak=${WEATHER_AK}`,{},(err,data)=>{
            if(!err){
                resolve(data.results[0].weather_data[0])
            }else{
                message.error('请求天气数据失败，请联系管理员')
            }
        })
    })
}