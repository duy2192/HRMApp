import { MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import React,{useEffect,useState} from 'react';
import {departmentApi } from "api";

FilterByDepartment.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func,
};

function FilterByDepartment(props) {
  const { current='', onChange } = props;
  const [department,setDepartment]=useState([])
  const handleFiltersChange = (e, newValue) => {
    if (onChange) onChange(newValue.props.value);
  };
  useEffect(()=>{
    (async()=>{
     try {
         const department=await departmentApi.getAll()
         setDepartment(department.results)
     } catch (error) {
         
     }
    })() 
 },[])
  return (
    <Select
        style={{margin:'20px',borderBottom:'1px solid #353b48',width:"150px"}}
      value={current}
      onChange={handleFiltersChange}
      variant="standard"
    >
    <MenuItem value="" style={{borderBottom:'1px solid #353b48'}}>Chọn đơn vị</MenuItem>
    {department.map((item)=>(
        <MenuItem key={item.id} value={item.id+'/'+item.ten}>{item.ten}</MenuItem>
    ))}
      
    </Select>
  );
}

export default FilterByDepartment;
