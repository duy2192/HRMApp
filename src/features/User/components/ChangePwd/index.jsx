import { authApi } from 'api';
import { useSnackbar } from 'notistack';
import React from 'react';
import ChangePwdForm from '../ChangePwdForm';




function ChangePwd({user}) {
      const {enqueueSnackbar} =useSnackbar()

    const handleSubmit= async (value)=>{
        try {
            const data={
                ...value,
                identifier:user.id
            }
            await authApi.changePwd(data)
            enqueueSnackbar("Đổi mật khẩu thành công",{variant: 'success'})

        } catch (error) {
            enqueueSnackbar(error.message,{variant: 'error'})
        }
    
    }
    return (
        <>
            <ChangePwdForm onSubmit={handleSubmit}/>
        </>
    );
}

export default ChangePwd;