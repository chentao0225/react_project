import React, { Component } from 'react'
import { Menu } from 'antd'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import menuList from '../../../config/menuConfig'
import {saveMenuTitle} from '../../../redux/actions/menu_action'
import logo from '../../../static/images/logo.png'
import './left_nav.less'
const { SubMenu } = Menu
@connect(
    state=>({}),
    {saveMenuTitle}
)
@withRouter
class LeftNav extends Component {
    getMenuList=(menuList)=>{
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} onClick={()=>{this.props.saveMenuTitle(item.title)}}>
                        <Link to={item.path}>
                            <item.icon/>
                            <span>{item.title}</span>
                        </Link>  
                    </Menu.Item>
                ))
            }else{
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <item.icon/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                    {this.getMenuList(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    render() {
        
        const {pathname}=this.props.history.location
        // console.log(pathname.split('/').splice(2))
        return (
            <div className='left-nav'>
                <div className="left-nav-top">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <Menu
                    selectedKeys={[pathname.split('/').reverse()[0]]}
                    defaultOpenKeys={pathname.split('/').splice(2)}
                    mode="inline"
                    theme="dark"
                >    
                {this.getMenuList(menuList)}
                </Menu>
            </div>
        )
    }
}
export default LeftNav