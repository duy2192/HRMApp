import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ROLE_ACCOUNT } from "constants";
CreateAccountForm.propTypes = {
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
    color: "#ff4757",
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
  },
});

function CreateAccountForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("Chưa nhập Email!")
      .email("Sai định dạng email!"),
    name: yup
      .string()
      .trim()
      .required("Chưa nhập tên người đăng ký!")

      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Sai định dạng!"
      ),
    username: yup
      .string()
      .trim()
      .required("Chưa nhập tên người đăng ký!")

      .matches(
        /^[a-zA-Z\s]+$/,
        "Sai định dạng!"
      ),
    role: yup
      .number()
      .required("Chưa chọn vai trò!")
      .typeError("Chưa chọn vai trò!"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      role: "",
      username:""
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
    <Paper>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
        <InputField
          name="email"
          label="Email"
          form={form}
          disabled={isSubmitting}
        />
        <InputField
          name="name"
          label="Họ tên"
          form={form}
          disabled={isSubmitting}
        />
        <InputField
          name="username"
          label="Tên tài khoản"
          form={form}
          disabled={isSubmitting}
        />
        <SelectField data={ROLE_ACCOUNT} name="role" form={form} />
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
                color: "#000",
                background: "#99CCFF",
                textTransform: "none",
              }}
            >
              Đăng ký
            </Button>
          </Box>
        )}
      </form>
    </Paper>
  );
}

export default CreateAccountForm;
