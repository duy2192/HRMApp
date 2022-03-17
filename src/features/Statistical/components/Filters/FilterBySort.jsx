import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
FilterByCity.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func,
};

function FilterByCity(props) {
  const { current=0, onChange } = props;
  const handleFiltersChange = (e, newValue) => {
    if (onChange) onChange(newValue.props.value);
  };
  return (
    <Select
        style={{margin:'20px',borderBottom:'1px solid #353b48',width:"150px"}}
      value={current}
      onChange={handleFiltersChange}
      variant="standard"
    >
    <MenuItem value="0" style={{borderBottom:'1px solid #353b48'}}>------Sắp xếp------</MenuItem>
    <MenuItem value="ten:ASC" >Tên<ArrowUpwardIcon/></MenuItem>
    <MenuItem value="ten:DESC" >Tên<ArrowDownwardIcon/></MenuItem>
    <MenuItem value="ngaysinh:ASC" >Tuổi<ArrowDownwardIcon/></MenuItem>
    <MenuItem value="ngaysinh:DESC" >Tuổi<ArrowUpwardIcon/></MenuItem>

      
    </Select>
  );
}

export default FilterByCity;
