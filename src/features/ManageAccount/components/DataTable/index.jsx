import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { authApi } from "api";
import SearchBox from "components/SearchBox";
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Account from "../Account";

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
  addButton: {
    marginLeft: "20px",
    background: "#0984e3",
    borderRadius: "10px",
    fontSize: "20px",
    padding: "5px",
    color: "#f5f6fa",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
  },
});
export default function DataTable() {
  const navigate = useNavigate();
  const [accountList, setAccountList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pagination, setPagination] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState({});
  const [refreshKey, setRefreshKey] = React.useState({});
  const classes = useStyles();
  const {enqueueSnackbar} =useSnackbar()

  const queryParams = useMemo(() => {
    return {
      _page:  page,
      _limit: 16,
      search:searchKey
    };
  }, [page, searchKey]);

  const handleOnClick = (e) => {
    setCurrentAccount(e.row)
    setOpen(true)
  };
  const handleSearchBox=(value)=>{
    setSearchKey(value)
  }
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await authApi.getAll(queryParams);
        setAccountList(result.results);
        setPagination(result.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [queryParams, searchKey,refreshKey]);
  const columns = [
    { field: "id", headerName: "ID", width: 80, type: "number" },
    { field: "name", headerName: "Họ Tên", width: 250 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "username",
      headerName: "Tên tài khoản",
      type: "string",
      width: 150,
    },
    {
      field: "role",
      headerName: "Vai trò",
      type: "string",
      width: 150,
      renderCell: (e) => {
        let role = e.row.role;
        if(role==1) role="Nhân viên"
        if(role==2) role="Quản lý"
        if(role==3) role="Quản trị viên"
        return <Typography>{role}</Typography>;
      },
    },

  ];
  const handlePageChange = (page) => {
    setPage(page + 1);
  };
  const handleAddClick = () => {
    navigate("/tai-khoan/them");
  };
  const handleClose=()=>{
    setOpen(false)
    setRefreshKey(refreshKey+1)

  }
  const handleChangeRole=async(value)=>{
    try {
      await authApi.changeRole({...value,id:currentAccount.id})
      enqueueSnackbar("Thành công!",{variant: 'success'})
    } catch (error) {
      enqueueSnackbar("Lỗi!",{variant: 'error'})

    }
  }
  const handleBlockAccount=async(value)=>{
      enqueueSnackbar("Thử lại sau!!!",{variant: 'error'})
  }

  return (
    <Box className={classes.root}>
            <Box style={{ paddingLeft: "25px", paddingTop: "10px",display:"flex",justifyContent:"space-between" }}>

      <SearchBox handleSearchBox={handleSearchBox}/>
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
          Thêm tài khoản
        </Button>
        </Box>
      <DataGrid
        onPageChange={handlePageChange}
        rows={accountList}
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
      <Account open={open} account={currentAccount} handleClose={handleClose} onSubmit={handleChangeRole} onBlock={handleBlockAccount}/>
    </Box>
  );
}
