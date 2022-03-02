import { FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import './style.css'
SelectField.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string,
  form:PropTypes.object.isRequired,
  name:PropTypes.string,
  changeValue:PropTypes.func,
  
};

function SelectField(props) {
  const { data = [], form={}, name = '',label="",changeValue=null } = props;
  const option = data.map((item) => ({
    value: item.value || '',
    label: ` ${item.label}` || '',
    code: ` ${item.code}` || '',
  }));
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value, name }, fieldState: { invalid, error } }) => (
        <>
          <Select
            placeholder={<div>{label}</div>}
            onChange={(val) => { if(changeValue) {changeValue(val)};onChange(val.value)}}
            value={option.find((c) => c.value === value)}
            options={option}
            className="select"            
          />
          <FormHelperText style={{ color: 'red',fontWeight:"bold" }}>{error?.message}</FormHelperText>
        </>
      )}
    />
  );
}

export default SelectField;
