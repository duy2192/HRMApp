import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import InputField from "components/FormControl/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
      .email("Sai định dạng email!")
      .required("Chưa nhập Email!"),
    name: yup.string().required("Nhập tên người đăng ký!"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
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
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={classes.form}
        >
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
                  color: "#ff4757",
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
