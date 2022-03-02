import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { levelApi } from "api";
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
  const [levelList, setLevelList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await levelApi.getAll();
        setLevelList(result.results.map((item)=>({
          value:item.id,
          label:item.ten
        })));
      } catch (error) {}
    })();
  }, []);

  const schema = yup.object().shape({
    lv: yup.string().required("Chưa chọn trình độ"),
  });

  const form = useForm({
    defaultValues: {
      lv: "",
      chuyennganh: "",
      tungay: new Date(),
      denngay: new Date(),
      ketqua: "",
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
    // form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Trình độ </p>
            </div>
            <div className="col-md-6">
              <SelectField data={levelList} name="lv" form={form} />{" "}
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Chuyên ngành </p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Chuyên ngành"
                name="chuyennganh"
                form={form}
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Từ ngày</p>
            </div>
            <div className="col-md-6">
              <CalendarField
                name="tungay"
                label="Từ ngày"
                form={form}
                size="small"
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Đến ngày </p>
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
              <p className="label">Kết quả </p>
            </div>
            <div className="col-md-6">
              <InputField size="small" label="Kết quả" name="ketqua" form={form} />{" "}
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
