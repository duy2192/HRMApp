import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import { INSURANCE_TYPES } from "constants";
import React from "react";
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
    loaibh: yup.string().trim().required("Chưa chọn loại bảo hiểm"),
    sothe: yup
      .string()
      .trim()
      .required("Chưa nhập mã thẻ")
      .matches(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/, "Mã thẻ không hợp lệ!")
      ,
    tungay: yup
      .date()
      .max(
        yup.ref("denngay"),
        "Giá trị từ ngày không thể lớn hơn giá trị đến ngày"
      ),
    denngay: yup.date(),
  });

  const form = useForm({
    defaultValues: {
      loaibh: "",
      sothe: "",
      tungay: new Date(),
      denngay: new Date(new Date().getTime() + 31536000000),
      noidk: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;
    const data = {
      ...value,
      tungay: convertMySqlTime(value.tungay),
      denngay: convertMySqlTime(value.denngay),
    };
    onSubmit(data);
    form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">
                Loại bảo hiểm <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <SelectField data={INSURANCE_TYPES} name="loaibh" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">
                Mã thẻ <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <InputField size="small" name="sothe" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">
                Từ ngày <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <CalendarField name="tungay" form={form} size="small" />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">
                Đến ngày <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <CalendarField
                name="denngay"
                label="Đến ngày"
                form={form}
                size="small"
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Nơi đăng ký</p>
            </div>
            <div className="col-md-6">
              <InputField size="small" name="noidk" form={form} />
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
