import {combineReducers} from 'redux'
import LoginReducers from './login_reducers'
export default combineReducers({
    userinfo:LoginReducers,
})