import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { exportApi, personnelApi } from "api";
import { useSnackbar } from 'notistack';
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
      outline: "none !important",
    },
    height: "650px",
    width: "100%",
  },
  dataGrid: {
    cursor: "pointer",
    background: "#fff",
    marginTop: "10px",
  },
});
export default function HRStatPage() {
  const navigate = useNavigate();
  const [personnelList, setPersonnelList] = useState([]);
  const [pagination, setPagination] = React.useState(0);

  const [refreshKey, setRefreshKey] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const location = useLocation();

  const {enqueueSnackbar} =useSnackbar()

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      _sort: params._sort,
      department: params.department,
      search:params.search,
      gender: params.gender,
    };
  }, [location.search]);

  const handleOnClick = (e) => {
    navigate(`${e.id}`);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await personnelApi.getAll(queryParams);
        setPersonnelList(result.results);
        setPagination(result.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [queryParams, refreshKey]);

  const columns = [
    { field: "id", headerName: "ID", width: 80, type: "number" },
    { field: "ten", headerName: "Họ Tên", width: 250 },
    {
      field: "gioitinh",
      headerName: "Giới tính",
      width: 100,
    },
    {
      field: "sdt",
      headerName: "Số điện thoại",
      type: "string",
      width: 150,
    },
    {
      field: "email",
      headerName: "email",
      type: "string",
      width: 200,
    },
    {
      field: "tuoi",
      headerName: "Tuổi",
      type: "string",
      width: 200,
      renderCell: (e) => {
        const age = new Date().getFullYear()- new Date(e.row.ngaysinh).getFullYear();
        return <Typography>{age}</Typography>;
      },
    },
    {
      field: "dv",
      headerName: "Đơn vị",
      width: 150,
      renderCell: (e) => {
        const name = e.row.dv.ten;
        return <Typography>{name}</Typography>;
      },
    },
  ];

  const handlePageChange = (page) => {
    const filters = {
      ...queryParams,
      _page: page + 1,
    };
    navigate(`?${queryString.stringify(filters)}`);
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigate(`?${queryString.stringify(filters)}`);
  };
  const onChangeFiltersViewer = (newFilters) => {
    navigate(`?${queryString.stringify(newFilters)}`);
  };
  
  const handleDownload = async () => {
    try {
      await exportApi.exportStatisticalPersonnel(queryParams);
      enqueueSnackbar("In thống kê thành công!",{variant: 'success'})

    } catch (error) {
      enqueueSnackbar("Lỗi!",{variant: 'error'})

    }
  };

  return (
    <Box className={classes.root}>
      <Filters onChange={handleFiltersChange} current={queryParams} onChangeFiltersViewer={onChangeFiltersViewer}/>
      <Box
        style={{
          paddingLeft: "25px",
          paddingTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            color: "#000000",
            background: "#99CCFF",
            textTransform: "none",
            display: "inline",
            marginLeft: "20px",
          }}
          onClick={handleDownload}
        >
          In thống kê
        </Button>
      </Box>
      <DataGrid
        onPageChange={handlePageChange}
        rows={personnelList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.id}
        rowCount={pagination.total}
        pagination
        paginationMode="server"
        loading={loading}
        className={classes.dataGrid}
        hideFooterSelectedRowCount
        onRowDoubleClick={handleOnClick}
      />
    </Box>
  );
}
