import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import logo from "assets/img/logo.png";
import { useNavigate } from "react-router-dom";
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles({
  root: {
    paddingTop: 0,
    margin: "0 auto",
  },
  submit: {
    display: "flex",
    top: 0,
    justifyContent: "center",
    color:"#ff4757"
  },
  progress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    background: "rgba(153, 204, 255, 0.6)",
    padding: "20px",
    border: "1px solid #dcdde1 rounded",
    borderRadius: "10px",
    boxShadow: "0 0 10px 5px #b2bec3",
  },
  forgot: {
    cursor: "pointer",
    paddingBottom: "20px",
    paddingLeft: "20px",
  },
});

function LoginForm(props) {
  const classes = useStyles();
  const navigate=useNavigate()
  const schema = yup.object().shape({
    identifier: yup.string().required("Chưa nhập Email hoặc Tên tài khoản!"),
    password: yup.string().required("Chưa nhập mật khẩu!"),
  });
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    reValidateMode: "onSubmit",

    resolver: yupResolver(schema),
  });
  const handleSubmit = async (value) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(value);
    }
  };
  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
        <img src={logo} alt="" />

        <InputField
          name="identifier"
          label="Tên tài khoản hoặc địa chỉ email"
          form={form}
          disabled={isSubmitting}
        />
        <PasswordField
          name="password"
          label="Mật Khẩu"
          form={form}
          disabled={isSubmitting}
        />
        <Typography className={classes.forgot} >
          <i onClick={()=>navigate("/auth/forgot")}>Quên mật khẩu?</i>
        </Typography>
        {isSubmitting ? (
          <Box className={classes.progress}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className={classes.submit}>
            <Button
              disabled={isSubmitting}
              variant="contained"
              type="submit"
              size="large"
              sx={{
                color:"#ff4757",
                background:"#99CCFF",
                textTransform:"none"
              }}
            >

              Đăng nhập
            </Button>
          </Box>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
