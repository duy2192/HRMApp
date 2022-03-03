import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { levelApi } from "api";
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
  const [depList, setDepList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pagination, setPagination] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  const queryParams = useMemo(() => {
    return {
      _page: page,
      _limit: 16,
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
        const result = await levelApi.getAll(queryParams);
        setDepList(result.results);
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
    // {
    //   field: "diachi",
    //   headerName: "Địa chỉ",
    //   width: 350,
    // },
    {
      field: "nv",
      headerName: "Số lượng nhân viên",
      width: 150,
      renderCell: (e) => {
        const count = e.row.ctlv.length;
        return <Typography>{count}</Typography>;
      },
    },
  ];
  const handlePageChange = (page) => {
    setPage(page + 1);
  };
  const handleAddClick = () => {
    navigate("/don-vi/them");
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
          Thêm đơn vị
        </Button>
      </Box>

      <DataGrid
        onPageChange={handlePageChange}
        rows={depList}
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
