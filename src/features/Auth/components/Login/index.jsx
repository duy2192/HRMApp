import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import {login} from 'features/Auth/authSlice'
import {useDispatch} from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

Login.propTypes = {
    closeDialog: PropTypes.func, 
};


function Login(props) {
    const dispatch=useDispatch()
    const {enqueueSnackbar} =useSnackbar()
    const {closeDialog}=props
    const navigate = useNavigate()

    const handleSubmit= async (value)=>{
        try {
            const action=  login(value)
            const resultAction= await dispatch(action)
            unwrapResult(resultAction) 
            if(closeDialog){
                closeDialog()
            }
            navigate('/')
        } catch (error) {
            enqueueSnackbar(error.message,{variant: 'error'})
        }
    
    }
    return (
        <>
            <LoginForm onSubmit={handleSubmit}/>
        </>
    );
}

export default Login;