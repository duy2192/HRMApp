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
    ngayqd: yup.string().required("Chưa ngày quyết định"),
    hinhthuc: yup.string().required("Chưa hình thức"),
    noidung: yup.string().required("Chưa nhập nội dung"),
  });

  const form = useForm({
    defaultValues: {
      ngayqd: new Date(),
      hinhthuc: "",
      noidung: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;
    const data = {
      ...value,
      ngayqd: convertMySqlTime(value.ngayqd),
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
              <p className="label">Ngày quyết định </p>
            </div>
            <div className="col-md-6">
            <CalendarField
                name="ngayqd"
                label="Ngày quyết định"
                form={form}
                size="small"
              />            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Hình thức </p>
            </div>
            <div className="col-md-6">
            <InputField
                size="small"
                label="Hình thức"
                name="hinhthuc"
                form={form}
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Nội dung</p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Nội dung"
                name="noidung"
                form={form}
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
