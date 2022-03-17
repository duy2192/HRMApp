import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { insuranceApi } from "api";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import {convertTime} from "utils";
import DeleteIcon from "@mui/icons-material/Delete";
// import Detail from "./Detail";

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
function Insurance({ personnelid }) {
  const classes = useStyles();
  const [contract, setContract] = useState([]);
  const [currentInsurance, setCurrentInsurance] = useState({});
  const [mode, setMode] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await insuranceApi.getAll(personnelid);
        setContract(result.results);
        setLoading(false);
      } catch (error) {}
    })();
  }, [personnelid, refreshKey]);
  const columns = [
    { field: "loaibh", headerName: "Loại bảo hiểm", width: 250 },
    {
      field: "sothe",
      headerName: "Mã thẻ",
      width: 150,
    },
    {
      field: "tungay",
      headerName: "Từ ngày",
      type: "string",
      width: 150,
      renderCell: (e) => {
        const date = e.row.tungay;
        return (
          <Typography>
           {convertTime(date)}
          </Typography>
        );
      },
    },
    {
      field: "denngay",
      headerName: "Đến ngày",
      type: "string",
      width: 150,
      renderCell: (e) => {
        const date = e.row.denngay;
        return (
          <Typography>
           {convertTime(date)}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      width: 50,
      type: "number",
      renderCell: (e) => {
        const id = e.row.id;
        return (
          <IconButton onClick={() => handleRemove(id)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];
  const handleAddClick = () => {
    setMode("add");
  };
  const handleDetailClick = (e) => {
    setMode("detail");
    setCurrentInsurance(e.id)
  };
  const handleAddInsurance = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await insuranceApi.create(data);
      enqueueSnackbar("Thêm bảo hiểm thành công", { variant: "success" });
      setMode("");
      setRefreshKey((state) => state + 1);
    } catch (error) {
      enqueueSnackbar("Lỗi", { variant: "error" });
    }
  };

  const handleRemove = async (id) => {
    try {
      await insuranceApi.remove(id);
      enqueueSnackbar("Xóa bảo hiểm thành công", { variant: "success" });
      setMode("");
      setRefreshKey((state) => state + 1);
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
              Thêm bảo hiểm
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
              loading={loading}
              className={classes.dataGrid}
              hideFooterSelectedRowCount
              onRowDoubleClick={handleDetailClick}
            />
          </>
        )}
        {mode === "add" && <AddForm onSubmit={handleAddInsurance} />}
        {/* {mode === "detail" && <Detail contractid={currentInsurance} />} */}
      </Box>
    </>
  );
}

export default Insurance;
