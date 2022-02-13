import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, FormHelperText, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
    root: {
    },

    box: {
        display: 'flex',
        flexFlow: 'row nowrap',
        // maxWidth: '200px',
        alignItems: 'center',
    },
    quantity:{
        width:'50px'
    },

})

function QuantityField(props) {
    const classes = useStyles()
    const {form, name} = props;
    const {control, setValue} = form;
   

    return (
        <div>
            <Controller
                name={name}
                control={control}
                className={classes.root}
                render={({field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, error }
                }) => (
                    <>
                        <FormControl error={isTouched && invalid} fullWidth size="small" margin="normal" variant="outlined">
                            <Box className={classes.box}>
                                <IconButton onClick={() => setValue(name, Number.parseInt(value)>1 ? Number.parseInt(value) - 1 : 1)}>
                                    <RemoveCircleOutline fontSize='small'></RemoveCircleOutline>
                                </IconButton>
                                <TextField
                                className={classes.quantity}
                                    id={name}
                                    error={invalid}
                                    type="number"
                                    value={value<1?1:value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    inputProps={{min: 1, style: { textAlign: 'center' }}}   
                                    variant='standard'                                 
                                />
                                <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
                                    <AddCircleOutline fontSize='small'></AddCircleOutline>
                                </IconButton>
                            </Box>
                        </FormControl>
                        <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                    </>
                )}  
            />
        </div>)
}

export default QuantityField;