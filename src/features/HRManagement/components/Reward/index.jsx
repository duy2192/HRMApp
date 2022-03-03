import { Typography, Box, Button,IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { rewardApi } from "api";
import { convertTime } from "utils";
import { useSnackbar } from "notistack";
import AddForm from "./AddForm";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [rewardList, setRewardList] = useState([]);
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
      renderCell: (e) => {
        const date = e.row.ngayqd;
        return <Typography>{convertTime(date)}</Typography>;
      },
    },
    { field: "hinhthuc", headerName: "Hình thức", width: 250 },
    {
      field: "action",
      headerName: "",
      width: 250,
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

  useEffect(() => {
    (async () => {
      try {
        const result = await rewardApi.getByPersonnel(personnelid);
        setRewardList(result.results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [personnelid,refreshKey]);

  const handleAddClick = () => {
    setMode("add");
  };
  const handleAddReward = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await rewardApi.create(data);
      enqueueSnackbar("Thêm khen thưởng thành công", { variant: "success" });
      setMode("");
      setRefreshKey((state) => state+1);
    } catch (error) {
      enqueueSnackbar("Lỗi", { variant: "error" });
    }
  };
  const handleRemove = async (id) => {
    try {
      await rewardApi.remove(id);
      enqueueSnackbar("Xóa khen thưởng thành công", { variant: "success" });
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
              Thêm khen thưởng
            </Button>
            <DataGrid
          // onPageChange={handlePageChange}
          rows={rewardList}
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
        {mode === "add" && <AddForm onSubmit={handleAddReward} />}
      </Box>
    </>
  );
}
