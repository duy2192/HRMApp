import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import { jobApi } from "api";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { convertTime } from "utils";
import AddForm from "./AddForm";
import { convertMySqlTime } from "utils";

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
function Jobs({ personnelid }) {
  const classes = useStyles();
  const [jobList, setJobList] = useState([]);
  const [mode, setMode] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const result = await jobApi.get(personnelid);
        setJobList(result.results);

      } catch (error) {
        console.log(error);
      }
    })();
  }, [personnelid,refreshKey]);
  const columns = [
    {
      field: "ngaybatdau",
      headerName: "Ngày bắt đầu",
      width: 250,
      renderCell: (e) => {
        const date = e.row.ngaybatdau;
        return <Typography>{convertTime(date)}</Typography>;
      },
    },
    {
      field: "id",
      headerName: "Công việc",
      width: 300,
      renderCell: (e) => {
        const name = e.row.dv.ten;
        return <Typography>{"Làm việc tại " + name}</Typography>;
      },
    },
    {
      field: "trangthai",
      headerName: "Trạng thái",
      type: "string",
      width: 200,
      renderCell: (e) => {
        const status = e.row.trangthai;
        return <Typography>{status == 1 ? "Đang làm" : "Đã nghỉ"}</Typography>;
      },
    },
  ];

  const handleAddClick = () => {
    setMode("add");
  };
  const handleAddPosition = async (value) => {
    try {
      const data = {
        ...value,
        ns: personnelid,
      };
      await jobApi.create(data);
      enqueueSnackbar("Thuyên chuyển nhân sự thành công", {
        variant: "success",
      });
      setMode("");
      setRefreshKey(state => state+1);

    } catch (error) {
      enqueueSnackbar("Nhân viên đang làm tại đây!", { variant: "error" });
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
              Thuyên chuyển nhân sự
            </Button>
            <DataGrid
              // onPageChange={handlePageChange}
              rows={jobList}
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

export default Jobs;
