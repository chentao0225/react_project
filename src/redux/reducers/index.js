import {combineReducers} from 'redux'
import LoginReducers from './login_reducers'
import MenuReducers from './menu_reducers'
export default combineReducers({
    userinfo:LoginReducers,
    title:MenuReducers
})