import React, { Component } from 'react'
import { Form, Input, Button,message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {reqLogin} from '../../api'
import checkLogin from '../check_login/check_login'
import {seveUserInfo} from '../../redux/actions/login_action'
import './css/login.less'
import logo from './images/logo.png'
@connect(
    state=>({userInfo:state.userinfo}),
    {seveUserInfo}
)
@checkLogin
class Login extends Component {
    onFinish = async(values) => {
        let result=await reqLogin(values)
        const {status,msg,data}=result
        if(status===0){
            message.success('登录成功',1)
            this.props.history.replace('/admin')
            this.props.seveUserInfo(data)
        }else{
            message.warning(msg)
        }
    }
    pwdVlidator=(rule, value)=>{
        if(!value){
            return Promise.reject('密码不能为空')
        }else if(value.length<4){
            return Promise.reject('密码不能小于4位')
        }else if(value.length>12){
            return Promise.reject('密码不能大于12位')
        }else if(!(/^[a-zA-Z0-9_]+$/).test(value)){
            return Promise.reject('密码必须是字母、数字或下划线组成')
        }
        return Promise.resolve()
    }
    render() {
        
        return (
            <div id='login'>
               <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>管理系统</h1>
               </div>
               <div className="login-content">
                   <h2>用户登录</h2>
                   <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                whitespace:true,
                                message: '用户名不能为空',
                            },
                            {
                                min:4,
                                message:'用户名不能小于4位',
                            },
                            {
                                max:12,
                                message:'用户名不能大于12位',
                            },
                            {
                                pattern:/^[a-zA-Z0-9_]+$/,
                                message:'用户名必须是字母、数字或下划线组成',
                            }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{validator:this.pwdVlidator},]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
               </div>
            </div>
        )
    }
}
export default Login
