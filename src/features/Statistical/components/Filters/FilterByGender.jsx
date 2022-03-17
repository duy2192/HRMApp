import { MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

FilterByGender.propTypes = {
  currentGender: PropTypes.string,
  onChange: PropTypes.func,
};

function FilterByGender(props) {
  const { current=0, onChange } = props;
  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue.props.value);
  };
  return (
    <Select
        style={{margin:'20px',borderBottom:'1px solid #353b48'}}
      value={current}
      onChange={handleSortChange}
      variant="standard"
    >
    <MenuItem value="0" style={{borderBottom:'1px solid #353b48'}}>Chọn giới tính</MenuItem>
      <MenuItem value="Nam">Nam</MenuItem>
      <MenuItem value="Nữ">Nữ</MenuItem>
    </Select>
  );
}

export default FilterByGender;
