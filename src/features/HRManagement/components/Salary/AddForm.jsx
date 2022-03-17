import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
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
    ngaybatdau: yup.date().typeError("Ngày không hợp lệ"),
    hsl: yup
      .number("Chưa nhập hệ số lương!")
      .required("Chưa nhập hệ số lương!")
      .typeError((value)=>{
        if(value.originalValue.trim()==="") return "Chưa nhập hệ số phụ lương"
        return "Sai hệ số phụ lương!"
      })
      .test(
        "Is positive?",
        "Hệ số lương phải lớn hơn 0!",
        (value) => value > 0
      )      ,
    hspc: yup
      .number("Chưa nhập hệ số phụ cấp")
      .required("Chưa nhập hệ số phụ cấp!")
      .typeError((value)=>{
        if(value.originalValue.trim()==="") return "Chưa nhập hệ số phụ cấp"
        return "Sai hệ số phụ cấp!"
      })
      .test(
        "Is positive?",
        "Hệ số phụ cấp phải lớn hơn 0!",
        (value) => value > 0
      ),
    luongcb: yup
      .number("Chưa nhập lương cơ bản")
      .required("Chưa nhập lương cơ bản!")
      .typeError((value)=>{
        if(value.originalValue.trim()==="") return "Chưa nhập lương cơ bản"
        return "Sai lương cơ bản!"
      }).test(
        "Is positive?",
        "Lương cơ bản phải lớn hơn 0!",
        (value) => value > 0
      ),
  });

  const form = useForm({
    defaultValues: {
      hsl: "",
      hspc: "",
      luongcb: "",
      ngaybatdau: new Date(),
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
                Hệ số lương <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <InputField size="small" name="hsl" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">
                Hệ số phụ cấp <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <InputField size="small" name="hspc" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">
                Lương cơ bản <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <InputField size="small" name="luongcb" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Ngày bắt đầu</p>
            </div>
            <div className="col-md-6">
              <CalendarField name="ngaybatdau" form={form} size="small" />
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
