import {authApi} from "api";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import ForgotPwdForm from "../ForgotPwdForm";
import ResetPwdForm from "../ResetPwdForm";
import { makeStyles } from "@mui/styles";
import logo from "assets/img/logo.png";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    paddingTop: 0,
    margin: "0 auto",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    background: "rgba(153, 204, 255, 0.6)",
    padding: "20px",
    border: "1px solid #dcdde1 rounded",
    borderRadius: "10px",
    boxShadow: "0 0 10px 5px #b2bec3",
  },
  success: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#eb3b5a",
    fontSize: "30px",
  },
  submit: {
    display: "flex",
    top: 0,
    justifyContent: "center",
    color: "#ff4757",
  },
});

function ForgotPwd(props) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [mode, setMode] = useState("forgot");
  const [identifier, setIdentifier] = useState("");
  const navigate = useNavigate();
  
  const handleSubmitForgotPwd = async (value) => {
    try {
      await authApi.forgotPwd(value);
      setMode("confirm");
      setIdentifier(value.email);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleSubmitConfirmToken = async (value) => {
    try {
      await authApi.resetPwd({ ...value, email: identifier });
      setMode("success");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      {mode === "forgot" && <ForgotPwdForm onSubmit={handleSubmitForgotPwd} />}
      {mode === "confirm" && (
        <ResetPwdForm onSubmit={handleSubmitConfirmToken} />
      )}
      {mode === "success" && (
        <div className={classes.root}>
          <img src={logo} alt="" />
          <Typography className={classes.success} variant="p">
            Đổi mật khẩu thành công!
          </Typography>
          <Box className={classes.submit}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                color: "#ff4757",
                background: "#99CCFF",
                textTransform: "none",
              }}
              onClick={() => navigate("/auth/login")}
            >
              Quay lại đăng nhập
            </Button>
          </Box>
        </div>
      )}
    </>
  );
}

export default ForgotPwd;
