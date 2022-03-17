import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import ArticleIcon from '@mui/icons-material/Article';
import { Button, Grid, IconButton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { departmentApi, levelApi, positionApi, uploadApi, utilsApi } from "api";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import { CONTRACT_TYPES } from "constants/index";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { convertMySqlTime } from "utils/convertTime";
import * as yup from "yup";
import "./styles.css";
import { isDateBeforeToday } from "utils";
import LinearProgress from "@mui/material/LinearProgress";

const useStyles = makeStyles({
  inputFile: {
    display: "inline",
    cursor: "pointer",
    background: "#74b9ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
    marginTop: "15px",
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
  const [uploadMode, setUploadMode] = useState("none");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef(null);
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
    ten: yup
      .string()
      .trim()
      .required("Bạn chưa nhập thông tin họ tên")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Họ tên không hợp lệ!"
      ),
    cv: yup.string().trim().required("Chưa chọn chức vụ"),
    lv: yup.string().trim().required("Chưa chọn trình độ"),
    dv: yup.string().trim().required("Chưa chọn đơn vị"),
    email: yup
      .string()
      .trim()
      .email("Sai định dạng email")
      .required("Chưa nhập Email!"),

    gioitinh: yup.string().trim().required("Chưa chọn giới tính!"),
    ngaysinh: yup
      .string()
      .trim()
      .required("Chưa nhập ngày sinh!")
      .test("checkBirthday", "Ngày sinh không hợp lệ!", (value) => {
        return isDateBeforeToday(value);
      }),
    cccd: yup
      .number("Sai định dạng!")
      .typeError("Sai CMND/CCCD")
      .required("Chưa nhập CMND/CCCD!"),
    tp: yup.string().trim().required("Chưa chọn Tỉnh/TP!"),
    quan: yup.string().trim().required("Chưa chọn Quận/Huyện!"),
    phuong: yup.string().trim().required("Chưa chọn Phường/Xã!"),
    diachi: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,

        "Địa chỉ không hợp lệ!"
      ),
    nguyenquan: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Không hợp lệ!"
      ),
    dantoc: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,

        "Không hợp lệ!"
      ),
    tongiao: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Không hợp lệ!"
      ),
    noicap: yup
      .string()
      .trim()
      .required("Chưa nhập nơi cấp")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Nơi cấp không hợp lệ!"
      ),
    sdt: yup
      .string()
      .trim()
      .typeError("Sai số điện thoại")
      .required("Chưa nhập số điện thoại!")
      .test("tel", "Không hợp lệ", (value) => Number.parseInt(value) > 0),
    hsl: yup
      .number("Chưa nhập hệ số lương!")
      .required("Chưa nhập hệ số lương!")
      .typeError("Chưa nhập hệ số lương!")
      .test(
        "Is positive?",
        "Hệ số lương phải lớn hơn 0!",
        (value) => value > 0
      ),
    hspc: yup
      .number("Chưa nhập hệ số phụ cấp")
      .required("Chưa nhập hệ số phụ cấp!")
      .typeError("Chưa nhập hệ số phụ cấp!")
      .test(
        "Is positive?",
        "Hệ số phụ cấp phải lớn hơn 0!",
        (value) => value > 0
      ),
    luongcb: yup
      .number("Chưa nhập lương cơ bản")
      .required("Chưa nhập lương cơ bản!")
      .typeError("Chưa nhập lương cơ bản!")
      .test(
        "Is positive?",
        "Lương cơ bản phải lớn hơn 0!",
        (value) => value > 0
      ),
    ngayky: yup
      .date()
      .max(
        yup.ref("ngaykt"),
        "Giá trị ngày ký không thể lớn hơn giá trị ngày kết thúc"
      ),
    ngaykt: yup.date(),
    tdvh: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,

        "Không hợp lệ!"
      ),
    tddt: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Không hợp lệ!"
      ),
    noidaotao: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Không hợp lệ!"
      ),
    xeploai: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,

        "Không hợp lệ!"
      ),
    quoctich: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Không hợp lệ!"
      ),
    tungay: yup
      .date()
      .max(
        yup.ref("denngay"),
        "Giá trị ngày bắt đầu không thể lớn hơn giá trị kêt thúc"
      ),
    denngay: yup.date(),
    chuyennganh: yup
      .string()
      .trim()
      .required("Chưa nhập chuyên ngành")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,

        "Không hợp lệ!"
      ),
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
      tungay: new Date(),
      denngay: new Date(),
      chuyennganh: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;
    const data = {
      ...value,
      ngayky: convertMySqlTime(value.ngayky),
      ngaykt: convertMySqlTime(value.ngaykt),
      ngaysinh: convertMySqlTime(value.ngaysinh),
      ngaycap: convertMySqlTime(value.ngaycap),
      tungay: convertMySqlTime(value.tungay),
      denngay: convertMySqlTime(value.denngay),

      file: file,
    };
    onSubmit(data);
  };
  const handleResetForm = (value) => {
    form.reset();
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
  const handleOnProgressUpload = (progress) => {
    setUploadProgress(progress);
  };
  const handleUpload = async () => {
    try {
      const mime=["pdf","doc","docx"]
      if(!mime.includes(fileRef.current.value.split('.').pop())) return
      const file = fileRef.current.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setUploadMode("pending");
      const result = await uploadApi.uploadFile(
        formData,
        handleOnProgressUpload
      );
      setUploadMode("success");

      setFile(result.results.originalname);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFile = () => {
    setFile("");
    setUploadMode("none");
  };

  return (
    <>
      <div className="profile-title">
        <Grid container sx={{ paddingTop: "20px", paddingBottom: "30px" }}>
          <Grid item xl={7} md={6} sm={6} xs={6}>
            <h3 className="">Thêm mới hồ sơ</h3>
          </Grid>
          <Grid item xl={5} md={6} sm={6} xs={6}>
            <Box className={classes.submit}>
              {isSubmitting ? (
                <Box className={classes.progress}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
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
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    size="large"
                    sx={{
                      color: "#000000",
                      background: "#f5f6fa",
                      textTransform: "none",
                      marginLeft: "20px",
                    }}
                    onClick={handleResetForm}
                  >
                    Xóa
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
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
                  <InputField size="small" name="ten" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Giới tính <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <SelectField data={gender} name="gioitinh" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Ngày sinh <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <CalendarField name="ngaysinh" form={form} size="small" />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Nguyên quán </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="nguyenquan" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Dân tộc </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="dantoc" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Tôn giáo </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="tongiao" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Quốc tịch</p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="quoctich" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Email <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="email" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Số điện thoại <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    name="sdt"
                    form={form}
                    type="number"
                    min="0"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Tỉnh/TP <span className="text-danger">*</span>
                  </p>
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
                  <p className="label">
                    Quận/Huyện <span className="text-danger">*</span>
                  </p>
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
                  <p className="label">
                    Phường/Xã <span className="text-danger">*</span>
                  </p>
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
                  <InputField size="small" name="diachi" form={form} />
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
                    name="cccd"
                    form={form}
                    type="number"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Ngày cấp <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <CalendarField name="ngaycap" form={form} size="small" />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Nơi cấp <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="noicap" form={form} />
                </div>
              </div>
              <h5 className="pt-4">Trình độ</h5>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Trình độ văn hóa </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="tdvh" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Trình độ đào tạo </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="tddt" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Nơi đào tạo </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="noidaotao" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Chuyên ngành <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="chuyennganh" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Từ ngày</p>
                </div>
                <div className="col-md-6">
                  <CalendarField name="tungay" form={form} size="small" />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Đến ngày </p>
                </div>
                <div className="col-md-6">
                  <CalendarField name="denngay" form={form} size="small" />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">Xếp loại </p>
                </div>
                <div className="col-md-6">
                  <InputField size="small" name="xeploai" form={form} />
                </div>
              </div>

              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Đơn vị <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <SelectField data={departmentList} name="dv" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Trình độ <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <SelectField data={levelList} name="lv" form={form} />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Chức vụ <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <SelectField data={positionList} name="cv" form={form} />
                </div>
              </div>
              <h5 className="pt-4">Hợp đồng</h5>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Loại hợp đồng <span className="text-danger">*</span>
                  </p>
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
                  <p className="label">
                    Ngày ký <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <CalendarField name="ngayky" form={form} size="small" />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Ngày kết thúc <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <CalendarField name="ngaykt" form={form} size="small" />
                </div>
              </div>

              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">File đính kèm</p>
                </div>
                <div className="col-md-6">
                  {uploadMode !== "none" && (
                    <Box
                      sx={{
                        background: "#dfe6e9",
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    >
                      {uploadMode === "pending" && (
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress}
                        />
                      )}
                      {uploadMode === "success" && (
                        <>
                          <Box
                            sx={{
                              width: "250px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              display: "inline-block",
                            }}
                          >
                            <Typography variant="span"><ArticleIcon htmlColor="#74b9ff"/>
                              {file}
                            </Typography>
                          </Box>
                          <IconButton onClick={handleRemoveFile}>
                            <CloseIcon />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  )}

                  {uploadMode === "none" && (
                    <>
                      <input
                        id="raised-button-file"
                        multiple
                        type="file"
                        accept="application/msword, application/pdf"
                        ref={fileRef}
                      />
                      <Typography
                        className={classes.inputFile}
                        onClick={handleUpload}
                      >
                        Upload
                      </Typography>
                    </>
                  )}
                </div>
              </div>

              <h5 className="pt-4">Lương</h5>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Hệ số lương <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    name="hsl"
                    form={form}
                    type="number"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Hệ số phụ cấp <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    name="hspc"
                    form={form}
                    type="number"
                  />
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-md-4">
                  <p className="label">
                    Lương cơ bản <span className="text-danger">*</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <InputField
                    size="small"
                    name="luongcb"
                    form={form}
                    type="number"
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
