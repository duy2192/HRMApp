import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { positionApi } from "api";
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
  const [positionList, setPositionList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await positionApi.getAll();
        setPositionList(
          result.results.map((item) => ({
            value: item.id,
            label: item.ten,
          }))
        );
      } catch (error) {}
    })();
  }, []);

  const schema = yup.object().shape({
    cv: yup.string().required("Chưa chọn Chức vụ"),
  });

  const form = useForm({
    defaultValues: {
      cv: "",
      ngaybonhiem: new Date(),
      ghichu: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;
    const data = {
      ...value,
      ngaybonhiem: convertMySqlTime(value.ngaybonhiem),
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
              <p className="label">Chức vụ </p>
            </div>
            <div className="col-md-6">
              <SelectField data={positionList} name="cv" form={form} />{" "}
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Ngày bổ nhiệm </p>
            </div>
            <div className="col-md-6">
              <CalendarField
                name="ngaybonhiem"
                label="Ngày bổ nhiệm"
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
