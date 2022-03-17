import {levelApi} from 'api';
import { useSnackbar } from 'notistack';
import React from 'react';
import AddForm from './AddForm';



function AddLevel({open,handleClose}) {
    const {enqueueSnackbar} =useSnackbar()

    const handleSubmit= async (value)=>{
        try {
            await levelApi.create(value)
            enqueueSnackbar("Thêm trình độ thành công!",{variant: 'success'})
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }
    return (
        <>
            <AddForm onSubmit={handleSubmit} open={open}handleClose={handleClose}/>
        </>
    );
}

export default AddLevel;