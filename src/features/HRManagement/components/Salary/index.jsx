import { Typography, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { salaryApi } from "api";
import {formatPrice } from "utils"
import AddForm from "./AddForm";
import { useSnackbar } from "notistack";
import {convertTime} from "utils"

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
export default function Salary({ personnelid }) {
  const classes = useStyles();
  const [salaryList, setSalaryList] = useState([]);
  const [mode, setMode] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [refreshKey, setRefreshKey] = useState(0);
  const columns = [
    { field: "id", headerName: "ID", width: 80, type: "number" },
    { field: "ngaybatdau", headerName: "Ngày bắt đầu", width: 250,
    renderCell: (e) => {
      const date = e.row.luongcb;
      return <Typography>{convertTime(date)}</Typography>;
    }, },
    {
      field: "hsl",
      headerName: "Hệ số lương",
      width: 150,
    },
    {
      field: "hspc",
      headerName: "Hệ số phụ cấp",
      type: "string",
      width: 150,
    },
    {
      field: "luongcb",
      headerName: "Lương cơ bản",
      type: "string",
      width: 150,
      renderCell: (e) => {
        const money = e.row.luongcb;
        return <Typography>{formatPrice(money)}</Typography>;
      },
     
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const result = await salaryApi.get(personnelid);
        setSalaryList(result.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [personnelid,refreshKey]);

  const handleAddClick = () => {
    setMode("add");
  };
  const handleAddPosition = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await salaryApi.create(data);
      enqueueSnackbar("Cập nhật lương thành công", { variant: "success" });
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
              Cập nhật lương
            </Button>
            <DataGrid
          // onPageChange={handlePageChange}
          rows={salaryList}
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
        {mode === "add" && <AddForm onSubmit={handleAddPosition} />}
      </Box>
    </>
  );
}
