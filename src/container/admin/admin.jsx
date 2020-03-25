import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { deleteUserInfo } from '../../redux/actions/login_action'
import Header from './header/header'
import checkLogin from '../check_login/check_login'
import './admin.less'
const {Footer, Sider, Content } = Layout
@connect(
    state => ({ userInfo: state.userinfo }),
    { deleteUserInfo }
)
@checkLogin
class Admin extends Component {

    render() {
       
        return (
            <Layout className='admin'>
                <Sider>left-nav</Sider>
                <Layout>
                    <Header/>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default Admin