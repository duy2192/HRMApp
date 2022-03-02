import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { personnelApi } from "api";
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
export default function Position({ personnelid }) {
  const classes = useStyles();
  const [positionList, setPositionList] = useState([]);
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
      field: "cv",
      headerName: "Chức vụ",
      width: 250,
      type: "number",
      renderCell: (e) => {
        const name = e.row.cv.ten;
        return <Typography>{name}</Typography>;
      },
    },
    { field: "ngaybonhiem", headerName: "Ngày bổ nhiệm", width: 250 },
  ];

  useEffect(() => {
    (async () => {
      try {
        const result = await personnelApi.getPosition(personnelid);
        setPositionList(result.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [personnelid, refreshKey]);
  const handleAddClick = () => {
    setMode("add");
  };
  const handleAddPosition = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await personnelApi.addPosition(data);
      enqueueSnackbar("Thêm chức vụ thành công", { variant: "success" });
      setMode("");
      setRefreshKey((state) => state+1);
    } catch (error) {
      enqueueSnackbar("Nhân viên đang đảm nhiệm chức vụ này!", { variant: "error" });
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
              Thêm chức vụ
            </Button>
            <DataGrid
              // onPageChange={handlePageChange}
              rows={positionList}
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
