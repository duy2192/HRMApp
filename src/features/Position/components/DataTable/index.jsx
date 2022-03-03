import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { positionApi } from "api";
import SearchBox from "components/SearchBox";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPosition from "../AddPosition";
import UpdatePosition from "../UpdatePosition";
import EditIcon from '@mui/icons-material/Edit';

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
  const [openFormAdd, setOpenFormAdd] = React.useState(false);
  const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
  const [positionDetail, setPositionDetail] = React.useState({});
  const [refreshKey, setRefreshKey] = React.useState({});
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
        const result = await positionApi.getAll(queryParams);
        setDepList(result.results);
        setPagination(result.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [queryParams, searchKey,refreshKey]);
  const columns = [
    { field: "id", headerName: "ID", width: 80, type: "number" },
    { field: "ten", headerName: "Họ Tên", width: 250 },
    {
      field: "nv",
      headerName: "Số lượng nhân viên",
      width: 150,
      renderCell: (e) => {
        const count = e.row.ns.length;
        return <Typography>{count}</Typography>;
      },
    },
    {
      field: 'update',
      headerName: 'Cập nhật',
      sortable: false,
      renderCell: (e) => {
        const handleOnClick = () => {
          setOpenUpdateForm(true);
          setPositionDetail(e.row);
        };
        return (
          <IconButton onClick={handleOnClick}>
            <EditIcon />
          </IconButton>
        );
      },
    },
  ];
  const handlePageChange = (page) => {
    setPage(page + 1);
  };
  const handleAddClick = () => {
    setOpenFormAdd(true)
  };
  const handleClose = (e,r) => {
    if (r !== 'backdropClick') {
      setOpenFormAdd(false);
      setOpenUpdateForm(false);
      setPositionDetail({})
      setRefreshKey(refreshKey+1)
    }
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
          Thêm chức vụ
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
      <AddPosition open={openFormAdd} handleClose={handleClose}/>
      <UpdatePosition open={openUpdateForm} handleClose={handleClose} position={positionDetail}/>
    </Box>
  );
}
