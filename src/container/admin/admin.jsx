import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { deleteUserInfo } from '../../redux/actions/login_action'
import Header from './header/header'
import LeftNav from './left_nav/left_nav'
import Home from '../../components/home/home'
import Catetory from '../catetory/catetory'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
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
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content className='content'>
                        <Switch>
                            <Route path='/admin/home' component={Home}/>
                            <Route path='/admin/prod_about/category' component={Catetory}/>
                            <Route path='/admin/prod_about/product' component={Product}/>
                            <Route path='/admin/user' component={User}/>
                            <Route path='/admin/role' component={Role}/>
                            <Route path='/admin/charts/bar' component={Bar}/>
                            <Route path='/admin/charts/line' component={Line}/>
                            <Route path='/admin/charts/pie' component={Pie}/>
                            <Redirect to='/admin/home'/>
                        </Switch>
                    </Content>
                    <Footer className='footer'>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default Admin