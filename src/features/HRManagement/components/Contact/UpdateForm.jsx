import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { utilsApi } from "api";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

function UpdateForm({ onSubmit, personnel }) {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const provinces = await utilsApi.getProvinces();
        setCityList(provinces.results);
      } catch (error) {}
    })();
  }, []);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Sai định dạng email!")
      .required("Chưa nhập email!"),
    sdt: yup.string().required("Chưa nhập số điện thoại!"),
    tp: yup.string().required("Chưa chọn Tỉnh/TP!"),
    quan: yup.string().required("Chưa chọn Quận/Huyện!"),
    phuong: yup.string().required("Chưa chọn Phường/Xã!"),
  });

  const form = useForm({
    defaultValues: {
      email: personnel.email,
      sdt: personnel.sdt,
      tp: personnel.tp,
      quan: personnel.quan,
      phuong: personnel.phuong,
      diachi: personnel.diachi,
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;

    onSubmit(value);
    // form.reset();
  };
  const selectCity = async (value) => {
    form.setValue("quan", "");
    try {
      const result = await utilsApi.getProvinces({ city: value.code });
      setDistrictList(result.results);
      setCity(value.code);
    } catch (e) {
      console.log(e);
    }
  };
  const selectDistrict = async (value) => {
    form.setValue("phuong", "");
    try {
      const result = await utilsApi.getProvinces({
        city,
        district: value.code,
      });
      setWardList(result.results);
    } catch (e) {
      console.log(e);
    }
  };
  const { isSubmitting } = form.formState;
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Email </p>
            </div>
            <div className="col-md-6">
              <InputField size="small" label="Email" name="email" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Số điện thoại </p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Số điện thoại"
                name="sdt"
                form={form}
                type="number"
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Tỉnh/TP</p>
            </div>
            <div className="col-md-6">
              <SelectField
                data={cityList}
                name="tp"
                form={form}
                changeValue={selectCity}
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Quận/Huyện </p>
            </div>
            <div className="col-md-6">
              <SelectField
                data={districtList}
                name="quan"
                form={form}
                changeValue={selectDistrict}
              />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Phường/Xã </p>
            </div>
            <div className="col-md-6">
              <SelectField data={wardList} name="phuong" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Địa chỉ </p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Địa chỉ "
                name="diachi"
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

export default UpdateForm;
