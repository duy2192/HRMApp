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
ChangePwdForm.propTypes = {
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
    color:"#3ae374"
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

function ChangePwdForm(props) {
  const classes = useStyles();
  const navigate=useNavigate()
  const schema = yup.object().shape({
    password: yup.string().required("Chưa nhập Email hoặc Tên tài khoản!"),
    newpwd: yup.string().required("Chưa nhập mật khẩu!").min(6, 'Mật khẩu phải lớn hơn 6 ký tự!'),
    confirmPwd: yup.string().required("Chưa xác nhận mật khẩu!").oneOf([yup.ref('newpwd')], 'Mật khẩu xác nhận chưa đúng!'),
  });
  const form = useForm({
    defaultValues: {
      password: "",
      newpwd:"",
      confirmPwd:""
    },
    reValidateMode: "onSubmit",

    resolver: yupResolver(schema),
  });
  const handleSubmit = async (value) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(value);
    }
    form.reset()
  };
  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>

      <PasswordField
          name="password"
          label="Mật Khẩu Cũ"
          form={form}
          disabled={isSubmitting}
        />
        <PasswordField
          name="newpwd"
          label="Mật Khẩu Mới"
          form={form}
          disabled={isSubmitting}
        />
                <PasswordField
          name="confirmPwd"
          label="Xác Nhận Mật Khẩu"
          form={form}
          disabled={isSubmitting}
        />
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

export default ChangePwdForm;
