import React from "react";
import { Grid, Paper, Box } from "@mui/material";
import FilterByDepartment from "./FilterByDepartment";
import FilterByGender from "./FilterByGender";
import FilterBySort from "./FilterBySort";
import FilterBySearchName from "./FilterBySearchName";
import FiltersViewer from "./FiltersViewer";

function Filters({ onChange, current, onChangeFiltersViewer }) {
  const handleDepartmentChange = (newSortValue) => {
    onChange({
      department: newSortValue.split("/")[0],
      departmentLabel: newSortValue.split("/")[1],
    });
  };
  const handleGenderChange = (newSortValue) => {
    onChange({ gender: newSortValue == 0 ? "" : newSortValue });
  };
  const handleSortChange = (newSortValue) => {
    onChange({ _sort: newSortValue == 0 ? "" : newSortValue });
  };
  const handleSearchChange = (newSortValue) => {
    onChange({ search: newSortValue });
  };
  const handleFilterViewerChange = (newFilters) => {
    if (onChangeFiltersViewer) onChangeFiltersViewer(newFilters);
  };
  return (
    <>
      <Paper>
        <Grid container>
          <Grid item xl={3} md={3} sm={3} xs={6}>
            <FilterBySearchName onChange={handleSearchChange} />
          </Grid>
          <Grid item xl={3} md={3} sm={3} xs={6}>
            <FilterByDepartment
              current={current.department + "/" + current.departmentLabel}
              onChange={handleDepartmentChange}
            />
          </Grid>
          <Grid item xl={3} md={3} sm={3} xs={6}>
            <FilterByGender
              current={current.gender === "" ? 0 : current.gender}
              onChange={handleGenderChange}
            />
          </Grid>
          <Grid item xl={3} md={3} sm={3} xs={6}>
            <FilterBySort current={current._sort} onChange={handleSortChange} />
          </Grid>
        </Grid>
        <Box sx={{paddingBottom:"30px"}}>
          <FiltersViewer
            filters={current}
            onChange={handleFilterViewerChange}
          />
        </Box>
      </Paper>
    </>
  );
}

export default Filters;
