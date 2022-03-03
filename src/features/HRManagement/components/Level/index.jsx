import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { personnelApi } from "api";
import ConfirmBox from "components/ConfirmBox";
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
export default function Level({ personnelid }) {
  const classes = useStyles();
  const [levelList, setLevelList] = useState([]);
  const [mode, setMode] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [refreshKey, setRefreshKey] = useState(0);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      type: "number",
    },
    {
      field: "trinhdo",
      headerName: "Trình độ",
      width: 80,
      type: "number",
      renderCell: (e) => {
        const name = e.row.lv.ten;
        return <Typography>{name}</Typography>;
      },
    },
    { field: "chuyennganh", headerName: "Chuyên ngành", width: 250 },
    {
      field: "tungay",
      headerName: "Từ ngày",
      width: 150,
    },
    {
      field: "denngay",
      headerName: "Đến ngày",
      type: "string",
      width: 150,
    },
    {
      field: "ketqua",
      headerName: "Kết quả",
      type: "string",
      width: 100,
    },
    {
      field: "action",
      headerName: "",
      type: "string",
      width: 150,
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
  useEffect(() => {
    (async () => {
      try {
        const result = await personnelApi.getLevel(personnelid);
        setLevelList(result.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [personnelid, refreshKey]);
  const handleAddClick = () => {
    setMode("add");
  };
  const handleAddLevel = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await personnelApi.addLevel(data);
      enqueueSnackbar("Thêm trình độ thành công", { variant: "success" });
      setMode("");
      setRefreshKey((state) => state + 1);
    } catch (error) {
      enqueueSnackbar("Lỗi", { variant: "error" });
    }
  };
  const handleRemove = async (id) => {
    try {
      await personnelApi.removeLevel(id);
      enqueueSnackbar("Xóa trình độ thành công", { variant: "success" });
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
              Thêm trình độ
            </Button>
            <ConfirmBox />
            <DataGrid
              // onPageChange={handlePageChange}
              rows={levelList}
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
        {mode === "add" && <AddForm onSubmit={handleAddLevel} />}
      </Box>
    </>
  );
}
