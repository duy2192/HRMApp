import React from "react";
import AddForm from "./AddForm";
import { personnelApi } from "api";
import { useSnackbar } from "notistack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {  Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  back: {
    cursor:"pointer",
    fontSize:"20px",
    fontWeight:"600"
  },
});

function AddPersonnel(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate()
  const classes = useStyles();
  const handleSubmit = async (value) => {
    try {
      await personnelApi.create(value);
      enqueueSnackbar("Thêm hồ sơ thành công", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div className="section-profile pt-5 pb-5">
      <div className="container">
        {/* <Typography className={classes.back} onClick={()=>{navigate("/ho-so")}}>
          <ArrowBackIcon />
          Quản lý hồ sơ
        </Typography> */}
        <div className="">
          <AddForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default AddPersonnel;
