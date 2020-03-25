import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function(CurrentComponent){
    @connect(
        state=>({isLogin:state.userinfo.isLogin})
    )
    class NewComponent extends Component{
        render(){
            const {...params} =this.props
            const {pathname}=this.props.history.location
            if(pathname==='/login'&&this.props.isLogin) return <Redirect to='/admin'/>
            if(pathname!=='/login'&&!this.props.isLogin)return <Redirect to='/login'/>
            return <CurrentComponent {...params}/>
        }
    }
    return NewComponent
}