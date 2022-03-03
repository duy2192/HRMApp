import {positionApi} from 'api';
import { useSnackbar } from 'notistack';
import React from 'react';
import AddForm from './AddForm';



function AddPersonnel({open,handleClose}) {
    const {enqueueSnackbar} =useSnackbar()

    const handleSubmit= async (value)=>{
        try {
            await positionApi.create(value)
            enqueueSnackbar("Thêm chức vụ thành công!",{variant: 'success'})
        } catch (error) {
            enqueueSnackbar(error.message,{variant: 'error'})
        }
    }
    return (
        <>
            <AddForm onSubmit={handleSubmit} open={open}handleClose={handleClose}/>
        </>
    );
}

export default AddPersonnel;