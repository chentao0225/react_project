import React, { Component } from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import screenfull from 'screenfull'
import {reqWeatherData} from '../../../api'
import { deleteUserInfo } from '../../../redux/actions/login_action'
import dayjs from 'dayjs'
import './header.less'
const {confirm} = Modal
@connect(
    state=>({userInfo:state.userinfo.user}),
    {deleteUserInfo}
)
class Header extends Component {
    state={
        isFull:false,
        date:dayjs().format('YYYY年MM月DD日HH:mm:ss'),
        weatherData:{}
    }
    switchFullScreen=()=>{
        screenfull.toggle()
    }
    getWeatherData=async()=>{
        let result=await reqWeatherData()
        this.setState({
            weatherData:{
                img:result.dayPictureUrl,
                temperature:result.temperature,
				weather:result.weather
            }
        })
    }
    componentDidMount(){
        screenfull.on('change',()=>{
            let {isFull}=this.state
            this.setState({isFull:!isFull})
        })
        this.timerId=setInterval(()=>{
            this.setState({date:dayjs().format('YYYY年MM月DD日HH:mm:ss')})
        },1000)
        this.getWeatherData()
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    logout=()=>{
        confirm({
            title: '确定退出吗?',
            icon: <ExclamationCircleOutlined />,
            content: '退出后要重新登录',
            cancelText:'取消',
            okText:'确定',
            onOk:()=> {
              this.props.deleteUserInfo()
            }
          })
    }
    render() {
        const {username}=this.props.userInfo
        const {isFull}=this.state
        const {img,weather,temperature} = this.state.weatherData
        return (
            <div className='header'>
                <div className="header-top">
                    <Button size='small' onClick={this.switchFullScreen}>
                        {isFull?<FullscreenExitOutlined />:<FullscreenOutlined />}
                    </Button>
                    <span className='header-top-font'>欢迎，{username}</span>
                    <Button type='link' size='small' onClick={this.logout}>
                        退出登录
                    </Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.date}</span>
                        <img src={img} alt="实时天气"/>
                        <span>{weather}  温度：{temperature}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header