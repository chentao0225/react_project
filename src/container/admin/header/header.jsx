import React, { Component } from 'react'
import {Button,Modal} from 'antd'
import {FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import screenfull from 'screenfull'
import { deleteUserInfo } from '../../../redux/actions/login_action'
import './header.less'
const {confirm} = Modal
@connect(
    state=>({userInfo:state.userinfo.user}),
    {deleteUserInfo}
)
class Header extends Component {
    state={
        isFull:false,
    }
    switchFullScreen=()=>{
        screenfull.toggle()
    }
    componentDidMount(){
        screenfull.on('change',()=>{
            let {isFull}=this.state
            this.setState({isFull:!isFull})
        })
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
                        <span>2020年3月25日21:35:30</span>
                        <img src="" alt="实时天气"/>
                        <span>多云 </span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header