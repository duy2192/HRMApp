import  authReducer from '../features/Auth/authSlice';
import {configureStore} from '@reduxjs/toolkit'
const rootReducer={
    user:authReducer,

}
const store=configureStore({
    reducer:rootReducer
})
export default store;