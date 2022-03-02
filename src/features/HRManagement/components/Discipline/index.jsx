import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { disciplineApi } from "api";
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
export default function Reward({ personnelid }) {
  const classes = useStyles();
  const [disciplineList, setDisciplineList] = useState([]);
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
      field: "ngayqd",
      headerName: "Ngày quyết định",
      width: 250,
      type: "number",
    //   renderCell: (e) => {
    //     const name = e.row.cv.ten;
    //     return <Typography>{name}</Typography>;
    //   },
    },
    { field: "hinhthuc", headerName: "Hình thức", width: 250 },
  ];

  useEffect(() => {
    (async () => {
      try {
        const result = await disciplineApi.getByPersonnel(personnelid);
        setDisciplineList(result.results);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [personnelid,refreshKey]);
  const handleAddClick = () => {
    setMode("add");
  };
  const handleAddDiscipline = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await disciplineApi.create(data);
      enqueueSnackbar("Thêm kỷ luật thành công", { variant: "success" });
      setMode("");
      setRefreshKey((state) => state+1);
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
              Thêm kỷ luật
            </Button>
            <DataGrid
          // onPageChange={handlePageChange}
          rows={disciplineList}
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
        {mode === "add" && <AddForm onSubmit={handleAddDiscipline} />}
      </Box>
    </>
  );
}
