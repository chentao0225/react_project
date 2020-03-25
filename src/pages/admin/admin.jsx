import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteUserInfo} from '../../redux/actions/login_action'
class Admin extends Component {
    logout=()=>{
        this.props.deleteUserInfo()
    }
    render() {
        const{username}=this.props.userinfo.user
        if(!this.props.userinfo.isLogin){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                欢迎，{username}
                <button onClick={this.logout}>退出登录</button>
            </div>
        )
    }
}
export default connect(
    state=>({userinfo:state.userinfo}),
    {deleteUserInfo}
)(Admin)