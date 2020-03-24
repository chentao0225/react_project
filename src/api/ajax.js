import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'
// axios.defaults.baseURL=''
//请求拦截器
axios.interceptors.request.use((config)=>{
    const {method,data}=config
    if(method.toLowerCase()==='post'&&data instanceof Object){
        config.data=qs.stringify(data)
    }
    return config
})
//响应拦截器
axios.interceptors.response.use(
    (response)=>{
        return response.data
    },
    (err)=>{
        message.error('请求出错')
        return new Promise(()=>{})
    }
)


export default axios