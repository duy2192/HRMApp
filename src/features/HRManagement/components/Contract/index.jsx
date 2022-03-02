import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { contractApi } from "api";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
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
    minHeight: "500px",
  },
});
function Contract({ personnelid }) {
  const classes = useStyles();
  const [contract, setContract] = useState([]);
  const [mode, setMode] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    (async () => {
      try {
        const result = await contractApi.get(personnelid);
        setContract(result.results);
      } catch (error) {}
    })();
  }, [personnelid,refreshKey]);
  const columns = [
    { field: "id", headerName: "ID", width: 80, type: "number" },
    { field: "loaihd", headerName: "Loại hợp đồng", width: 250 },
    {
      field: "ngayky",
      headerName: "Ngày ký",
      width: 150,
    },
    {
      field: "ngaykt",
      headerName: "Ngày kết thúc",
      type: "string",
      width: 150,
    },
    {
      field: "trangthai",
      headerName: "Trạng thái",
      type: "string",
      width: 150,
      renderCell: (e) => {
        const status = e.row.trangthai;
        return (
          <Typography>
            {status == 1 ? "Còn hiệu lực" : "Hết hiệu lực"}
          </Typography>
        );
      },
    },
  ];
  const handleAddClick = () => {
    setMode("add");
  };
  const handleAddContract = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await contractApi.create(data);
      enqueueSnackbar("Thêm hợp đồng thành công", { variant: "success" });
      setMode("");
      setRefreshKey(state => state+1);
    } catch (error) {
      enqueueSnackbar("Lỗi", { variant: "error" });
    }
  };
  return (
    <>
      <Box className={classes.root}>
        {mode === "" && (
          <>
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
              Thêm hợp đồng
            </Button>
            <DataGrid
              // onPageChange={handlePageChange}
              rows={contract}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id}
              // rowCount={pagination.total}
              pagination
              paginationMode="server"
              // loading={loading}
              className={classes.dataGrid}
              hideFooterSelectedRowCount
              // onRowDoubleClick={handleOnClick}
            />
          </>
        )}
        {mode === "add" && <AddForm onSubmit={handleAddContract} />}
      </Box>
    </>
  );
}

export default Contract;
