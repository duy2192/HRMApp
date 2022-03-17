import { Box } from '@mui/material';
import SearchBox from "components/SearchBox";
import PropTypes from 'prop-types';
import React from 'react';

FilterBySearchName.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func,
};

function FilterBySearchName(props) {
  const { onChange } = props;

  const handleSearchBox = (value) => {
    if (onChange) onChange(value);
  };
  return (
    <Box style={{ paddingTop: "20px",display:"flex",justifyContent:"space-between" }}>
    <SearchBox handleSearchBox={handleSearchBox} />
  </Box>
  );
}

export default FilterBySearchName;
