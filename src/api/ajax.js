import axios from 'axios'
import {message} from 'antd'
import qs from 'querystring'
import {BASE_URL} from '../config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
axios.defaults.baseURL=BASE_URL
//请求拦截器
axios.interceptors.request.use((config)=>{
    NProgress.start()
    const {method,data}=config
    if(method.toLowerCase()==='post'&&data instanceof Object){
        config.data=qs.stringify(data)
    }
    return config
})
//响应拦截器
axios.interceptors.response.use(
    (response)=>{
        NProgress.done()
        return response.data
    },
    (err)=>{
        NProgress.done()
        message.error('请求出错')
        return new Promise(()=>{})
    }
)


export default axios