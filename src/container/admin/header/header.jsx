import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import screenfull from 'screenfull'
import {reqWeatherData} from '../../../api'
import { deleteUserInfo } from '../../../redux/actions/login_action'
import {saveMenuTitle} from '../../../redux/actions/menu_action'
import menuList from '../../../config/menuConfig'
import dayjs from 'dayjs'
import './header.less'
const {confirm} = Modal
@connect(
    state=>({userInfo:state.userinfo.user,title:state.title}),
    {deleteUserInfo,saveMenuTitle}
)
@withRouter
class Header extends Component {
    state={
        isFull:false,
        date:dayjs().format('YYYY年MM月DD日HH:mm:ss'),
        weatherData:{}
        
    }

    //全屏切换
    switchFullScreen=()=>{
        screenfull.toggle()
    }
    //获取天气(测试上限)
    getWeatherData=async()=>{
        let result=await reqWeatherData()
        console.log(result)
        this.setState({
            weatherData:{
                img:result.dayPictureUrl,
                temperature:result.temperature,
				weather:result.weather
            }
        })
    }
    getTitle=(menuKey)=>{
        console.log('----redux中没有title，只能靠getTitle计算---------')
        let title=''
        menuList.forEach((item)=>{
            if(item.children instanceof Array){
                let result=item.children.find((menuChildrenObj)=>{
                    return menuChildrenObj.key === menuKey
                })
                if(result) title=result.title
            }else{
                if(item.key===menuKey) title=item.title
            }
        })
        this.props.saveMenuTitle(title)
        return title
    }
    componentDidMount(){
        screenfull.on('change',()=>{
            let {isFull}=this.state
            this.setState({isFull:!isFull})
        })
        this.timerId=setInterval(()=>{
            this.setState({date:dayjs().format('YYYY年MM月DD日HH:mm:ss')})
        },1000)
        // this.getWeatherData()
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    //退出登录
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
        const menuKey=this.props.history.location.pathname.split('/').reverse()[0]
        // const {img,weather,temperature} = this.state.weatherData
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
                        {this.props.title ||this.getTitle(menuKey)}
                    </div>
                    <div className="header-bottom-right">
                        <span>{this.state.date}</span>
                        {/* <img src={img} alt="实时天气"/>
                        <span>{weather}  温度：{temperature}</span> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default Header