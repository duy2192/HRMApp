import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import logo from "assets/img/logo.png";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

ResetPwdForm.propTypes = {
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
  confirmtoken: {
    cursor: "pointer",
    paddingBottom: "20px",
    paddingLeft: "20px",
  },
  checkEmail: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#000000",
    fontSize: "20px",
  },
});

function ResetPwdForm(props) {
  const classes = useStyles();
  const navigate=useNavigate()
  const schema = yup.object().shape({
    key: yup.string().required("Chưa nhập mã xác nhận!"),
    password: yup.string().required("Chưa nhập mật khẩu!").min(6, 'Mật khẩu phải lớn hơn 6 ký tự!'),
    confirmPwd: yup.string().required("Chưa xác nhận mật khẩu!").oneOf([yup.ref('password')], 'Mật khẩu xác nhận chưa đúng!'),
  });
  const form = useForm({
    defaultValues: {
      key: "",
      password: "",
      confirmPwd: "",
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
        <Typography className={classes.checkEmail} variant="p">
            Kiểm tra Email để nhận mã xác minh!
          </Typography>
        <InputField
          name="key"
          label="Mã xác minh"
          form={form}
          disabled={isSubmitting}
        />

<PasswordField
          name="password"
          label="Mật Khẩu"
          form={form}
          disabled={isSubmitting}
        />
         <PasswordField
          name="confirmPwd"
          label="Xác nhận mật khẩu"
          form={form}
          disabled={isSubmitting}
        />
                <Typography className={classes.confirmtoken} >
          <i onClick={()=>navigate("/user/login")}>Quay lại đăng nhập</i>
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
              Xác nhận
            </Button>
          </Box>
        )}
      </form>
    </div>
  );
}

export default ResetPwdForm;
