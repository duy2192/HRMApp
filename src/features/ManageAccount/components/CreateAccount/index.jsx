import {authApi} from 'api';
import { useSnackbar } from 'notistack';
import React from 'react';
import CreateAccountForm from '../CreateAccountForm';



function CreateAccount(props) {
    const {enqueueSnackbar} =useSnackbar()

    const handleSubmit= async (value)=>{
        try {
            await authApi.register(value)
            enqueueSnackbar("Đăng ký thành công!",{variant: 'success'})

        } catch (error) {
            enqueueSnackbar(error.message,{variant: 'error'})
        }
    
    }
    return (
        <>
            <CreateAccountForm onSubmit={handleSubmit}/>
        </>
    );
}

export default CreateAccount;