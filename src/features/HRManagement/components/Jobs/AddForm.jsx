import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { departmentApi } from "api";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import React, { useEffect, useState } from "react";
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
  const [depList, setDepartmentList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await departmentApi.getAll();
        setDepartmentList(
          result.results.map((item) => ({
            value: item.id,
            label: item.ten,
          }))
        );
      } catch (error) {}
    })();
  }, []);

  const schema = yup.object().shape({
    dv: yup.string().required("Chưa chọn Chức vụ"),
    ngaybatdau: yup.string().required("Chưa chọn đơn vị"),
  });

  const form = useForm({
    defaultValues: {
      dv: "",
      ngaybatdau: new Date(),
      ghichu: "",
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
              <p className="label">Đơn vị </p>
            </div>
            <div className="col-md-6">
              <SelectField data={depList} name="dv" form={form} />{" "}
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Ngày bắt đầu </p>
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
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Ghi chú</p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Ghi chú"
                name="ghichu"
                form={form}
              />{" "}
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
