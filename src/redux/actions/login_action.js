import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'

export const seveUserInfo=(value)=>{
    localStorage.setItem('user',JSON.stringify(value))
    return {type:SAVE_USERINFO,data:value}
}
export const deleteUserInfo=()=>{
    localStorage.removeItem('user')
    return {type:DELETE_USERINFO,data:''}
}