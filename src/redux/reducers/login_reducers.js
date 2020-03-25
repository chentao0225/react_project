import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'
let _user=JSON.parse(localStorage.getItem('user'))
let initState={
    user:_user || '',
    isLogin:_user?true:false
}
export default function(preState=initState,action){
    const {type,data} =action
    let newState
    switch (type) {
        case SAVE_USERINFO:
            newState={user:data,isLogin:true}
            return newState
        case DELETE_USERINFO:
            newState={user:'',isLogin:false}
            return newState
        default:
            return preState
    }
}