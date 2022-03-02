import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, FormLabel, IconButton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { uploadApi } from "api";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import { CONTRACT_TYPES } from "constants";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { convertMySqlTime } from "utils";
import * as yup from "yup";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  submit: {
    display: "flex",
    justifyContent: "center",
  },
  form: {},
});

function AddForm({ onSubmit }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    hsl: yup.string().required("Chưa nhập hệ số lương"),
    hspc: yup.string().required("Chưa nhập hệ số phụ cấp"),
    luongcb: yup.string().required("Chưa nhập lương cơ bản"),
  });

  const form = useForm({
    defaultValues: {
      hsl: "",
      hspc:"",
      luongcb:"",
      ngaybatdau:  new Date(),
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;
    const data = {
      ...value,
      ngaybatdau: convertMySqlTime(value.ngaybatdau),
    };
    onSubmit(data);
    // form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Hệ số lương </p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Hệ số lương "
                name="hsl"
                form={form}
              />{" "}
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Hệ số phụ cấp </p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Hệ số phụ cấp "
                name="hspc"
                form={form}
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Lương cơ bản</p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Lương cơ bản "
                name="luongcb"
                form={form}
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Ngày bắt đầu</p>
            </div>
            <div className="col-md-6">
              <CalendarField
                name="ngaybatdau"
                label="Ngày bắt đầu"
                form={form}
                size="small"
              />
            </div>
          </div>

          <Box className={classes.submit}>
            {isSubmitting ? (
              <Box className={classes.progress}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                disabled={isSubmitting}
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  color: "#000000",
                  background: "rgba(153, 204, 255, 0.6)",
                  textTransform: "none",
                }}
              >
                Lưu
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
}

export default AddForm;
