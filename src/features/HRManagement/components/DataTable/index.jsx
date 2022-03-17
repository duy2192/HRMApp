import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { personnelApi } from "api";
import SearchBox from "components/SearchBox";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
export default function DataTable() {
  const navigate = useNavigate();
  const [personnelList, setPersonnelList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pagination, setPagination] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  const queryParams = useMemo(() => {
    return {
      _page: page,
      _limit: 10,
      search: searchKey,
    };
  }, [page, searchKey]);

  const handleOnClick = (e) => {
    navigate(`${e.id}`);
  };
  const handleSearchBox = (value) => {
    setSearchKey(value);
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
  }, [queryParams, searchKey]);
  
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
    setPage(page + 1);
  };
  const handleAddClick = () => {
    navigate("/ho-so/them");
  };
  return (
    <Box className={classes.root}>
      <Box style={{ paddingLeft: "25px", paddingTop: "10px",display:"flex",justifyContent:"space-between" }}>
        <SearchBox handleSearchBox={handleSearchBox} />

        <Button
          variant="contained"
          onClick={handleAddClick}
          size="small"
          sx={{
            color: "#000000",
            background: "#99CCFF",
            textTransform: "none",
            display: "inline",
          }}
        >
          Thêm hồ sơ
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
