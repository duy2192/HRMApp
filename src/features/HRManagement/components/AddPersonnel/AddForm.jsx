import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, FormLabel, IconButton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { departmentApi, levelApi, positionApi, uploadApi, utilsApi } from "api";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import { CONTRACT_TYPES } from "constants/index";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { convertMySqlTime } from "utils/convertTime";
import * as yup from "yup";
import "./styles.css";

const useStyles = makeStyles({
  submit: {
    paddingRight: "100px",
    right: 100,
    // color: "#ff4757",
  },
  inputFile: {
    cursor: "pointer",
    background: "#74b9ff",
    color: "#2f3542",
    border: "none",
    borderRadius: "10px",
    padding: "5px",
    marginTop: "15px",
  },
  form: {
    // background: "#FFF",
    // overflow: "auto",
  },
});

const gender = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

function AddForm({ onSubmit }) {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [file, setFile] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const [provinces, dep, level, position] = await Promise.all([
          utilsApi.getProvinces(),
          departmentApi.getAll(),
          levelApi.getAll(),
          positionApi.getAll(),
        ]);
        setCityList(provinces.results);
        setDepartmentList(
          dep.results.map((dep) => ({
            value: dep.id,
            label: dep.ten,
          }))
        );
        setLevelList(
          level.results.map((lv) => ({
            value: lv.id,
            label: lv.ten,
          }))
        );
        setPositionList(
          position.results.map((pos) => ({
            value: pos.id,
            label: pos.ten,
          }))
        );
      } catch (error) {}
    })();
  }, []);

  const schema = yup.object().shape({
    ten: yup.string().required("Chưa nhập tên"),
    cv: yup.string().required("Chưa chọn chức vụ"),
    lv: yup.string().required("Chưa chọn trình độ"),
    dv: yup.string().required("Chưa chọn đơn vị"),
    email: yup.string().email().required('Chưa nhập tên nhân sự!'),

    gioitinh: yup.string().required("Chưa chọn giới tính!"),
    cccd: yup
      .number("Sai định dạng!")
      .typeError("Sai định dạng")
      .required("Chưa nhập CMND/CCCD!"),
    tp: yup.string().required("Chưa chọn Tỉnh/TP!"),
    quan: yup.string().required("Chưa chọn Quận/Huyện!"),
    phuong: yup.string().required("Chưa chọn Phường/Xã!"),
    sdt: yup
      .string()
      .typeError("Sai định dạng")
      .required("Chưa nhập số điện thoại!"),
    hsl: yup
      .number("Chưa nhập hệ số lương!")
      .typeError("Sai định dạng")
      .required("Chưa nhập hệ số lương!"),
    hspc: yup
      .number("Chưa nhập hệ số phụ cấp")
      .typeError("Sai định dạng")
      .required("Chưa nhập hệ số phụ cấp!"),
    luongcb: yup
      .number("Chưa nhập lương cơ bản")
      .typeError("Sai định dạng")
      .required("Chưa nhập lương cơ bản!"),
  });

  const form = useForm({
    defaultValues: {
      lv: "",
      dv: "",
      ten: "",
      gioitinh: "",
      ngaysinh: new Date("2000-01-01"),
      nguyenquan: "",
      dantoc: "",
      tongiao: "",
      quoctich: "",
      cccd: "",
      ngaycap: new Date("2000-01-01"),
      noicap: "",
      tdvh: "",
      tddt: "",
      noidaotao: "",
      namtotnghiep: "",
      xeploai: "",
      email: "",
      sdt: "",
      quocgia: "",
      tp: "",
      quan: "",
      phuong: "",
      diachi: "",
      loaihd: "",
      ngayky: new Date(),
      ngaykt: new Date(),
      file: "",
      hsl: "",
      hspc: "",
      luongcb: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;
    const data = {
      ...value,
      ngaysinh: convertMySqlTime(value.ngaysinh),
      ngaycap: convertMySqlTime(value.ngaycap),
      file: file,
    };
    onSubmit(data);
    // form.reset();
  };

  const { isSubmitting } = form.formState;

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

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const result = await uploadApi.uploadFile(formData);
      setFile(result.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFile = () => {
    setFile("");
  };
  return (
    <>
      <div className="profile-title">
        <h3 className="">Thêm mới hồ sơ</h3>
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
              form="myform"
            >
              Lưu
            </Button>
          )}
        </Box>
      </div>
      <div className="thongtin p-5">
        <div className="list-thongtin">
          <form onSubmit={form.handleSubmit(handleSubmit)} id="myform">
            <Box className={classes.form}>
              <h5>Thông tin chung</h5>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Họ Tên <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    label="Họ tên"
                    size="small"
                    name="ten"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Giới tính</p>
                </div>
                <div className="col-md-6">
                  <SelectField data={gender} name="gioitinh" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Ngày sinh </p>
                </div>
                <div className="col-md-6">
                  <CalendarField
                    name="ngaysinh"
                    label="Ngày sinh"
                    form={form}
                    size="small"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Nguyên quán </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Nguyên quán"
                    name="nguyenquan"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Dân tộc </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    label="Dân tộc"
                    size="small"
                    name="dantoc"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Tôn giáo </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Tôn giáo"
                    name="tongiao"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Quốc tịch</p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Quốc tịch"
                    name="quoctich"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Email </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Email"
                    name="email"
                    form={form}
                  />
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
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Số CMND / CCCD <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Số CMND / CCCD"
                    name="cccd"
                    form={form}
                    type="number"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Ngày cấp</p>
                </div>
                <div className="col-md-6">
                  <CalendarField
                    name="ngaycap"
                    label="Ngày cấp"
                    form={form}
                    size="small"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Nơi cấp </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Nơi cấp"
                    name="noicap"
                    form={form}
                  />
                </div>
              </div>
              <h5 className="pt-4">Trình độ</h5>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Trình độ văn hóa </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Trình độ văn hóa"
                    name="tdvh"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Trình độ đào tạo </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Trình độ đào tạo"
                    name="tddt"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Nơi đào tạo </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Nơi đào tạo"
                    name="noidaotao"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Năm tốt nghiệp </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    label="Năm tốt nghiệp"
                    type="number"
                    name="namtotnghiep"
                    form={form}
                    size="small"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Xếp loại </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Xếp loại"
                    name="xeploai"
                    form={form}
                  />
                </div>
              </div>

              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Đơn vị </p>
                </div>
                <div className="col-md-6">
                  <SelectField data={departmentList} name="dv" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Trình độ</p>
                </div>
                <div className="col-md-6">
                  <SelectField data={levelList} name="lv" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Chức vụ </p>
                </div>
                <div className="col-md-6">
                  <SelectField data={positionList} name="cv" form={form} />
                </div>
              </div>
              <h5 className="pt-4">Hợp đồng</h5>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Loại hợp đồng </p>
                </div>
                <div className="col-md-6">
                  <SelectField
                    data={CONTRACT_TYPES}
                    name="loaihd"
                    form={form}
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Ngày ký</p>
                </div>
                <div className="col-md-6">
                  <CalendarField
                    name="ngayky"
                    label="Ngày ký"
                    form={form}
                    size="small"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Ngày kết thúc</p>
                </div>
                <div className="col-md-6">
                  <CalendarField
                    name="ngaykt"
                    label="Ngày kết thúc"
                    form={form}
                    size="small"
                  />
                </div>
              </div>

              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">File đính kèm</p>
                </div>
                <div className="col-md-6">
                  {!!file ? (
                    <>
                      <Typography style={{ paddingTop: "15px" }}>
                        <CloudUploadIcon />
                        {file.split("/")[3]}
                        <IconButton onClick={handleRemoveFile}>
                          <CloseIcon />
                        </IconButton>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <input
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleUpload}
                        style={{ display: "none" }}
                      />
                      <FormLabel
                        htmlFor="raised-button-file"
                        className={classes.inputFile}
                      >
                        File đính kèm
                      </FormLabel>
                    </>
                  )}
                </div>
              </div>

              <h5 className="pt-4">Lương</h5>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Hệ số lương </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Hệ số lương"
                    name="hsl"
                    form={form}
                  />{" "}
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Hệ số phụ cấp</p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    label="Hệ số phụ cấp"
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
                    label="Lương cơ bản"
                    name="luongcb"
                    form={form}
                  />
                </div>
              </div>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddForm;
