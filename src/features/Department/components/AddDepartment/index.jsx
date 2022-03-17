import {departmentApi} from 'api';
import { useSnackbar } from 'notistack';
import React from 'react';
import AddForm from './AddForm';


function AddDepartment({open,handleClose}) {
    const {enqueueSnackbar} =useSnackbar()

    const handleSubmit= async (value)=>{
        try {
            await departmentApi.create(value)
            enqueueSnackbar("Thêm đơn vị thành công!",{variant: 'success'})
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

export default AddDepartment;