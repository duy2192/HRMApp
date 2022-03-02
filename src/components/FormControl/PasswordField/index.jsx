import  FormHelperText  from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { makeStyles } from "@mui/styles";

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles({
    input: {
        background:"#fff",
        zIndex:"0"
    },
  });
function PasswordField(props) {
    const {form, name, label,disabled} = props;
    const {control} = form;
    const classes=useStyles()
    return (
        <div>
            <Controller
                name={name}
                control={control}
                
                render={({field: { onChange, onBlur, value='', name, ref },
                    fieldState: { invalid, isTouched, error }
                }) => (
                    <>
                        <FormControl error={isTouched && invalid} fullWidth margin="normal" >
                            <TextField
                                type="password"
                                id={name}
                                variant="outlined"
                                error={invalid}
                                label={label}
                                labelwidth={70}
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                disabled={disabled}
                                InputProps={{
                                    className: classes.input
                                  }}
                            />
                        </FormControl>
                        <FormHelperText style={{color:"red",fontWeight:"bold"}} error={invalid}>{error?.message}</FormHelperText>
                    </>
                )}  
            />
        </div>)
}

export default PasswordField;