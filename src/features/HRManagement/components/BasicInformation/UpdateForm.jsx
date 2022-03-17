import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import React from "react";
import { useForm } from "react-hook-form";
import { convertMySqlTime } from "utils/convertTime";
import * as yup from "yup";
import { isDateBeforeToday } from "utils";

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

const gender = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

function UpdateForm({ onSubmit, personnel }) {
  const classes = useStyles();

  const schema = yup.object().shape({
    ten: yup
      .string()
      .trim()
      .required("Chưa nhập họ tên")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,

        "Không hợp lệ"
      )
      ,
    gioitinh: yup.string().trim().required("Chưa chọn giới tính!"),
    cccd: yup
      .number()
      .typeError("Sai CMND/CCCD")
      .required("Chưa nhập CMND/CCCD"),
    nguyenquan: yup
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

        "Không hợp lệ!"
      ),
    quoctich: yup
      .string()
      .trim()
      .matches(
        /^$|[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,

        "Không hợp lệ!"
      )
      ,
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
      ngaysinh: yup
      .string()
      .trim()
      .required("Chưa nhập ngày sinh!")
      .test("checkBirthday", "Ngày sinh không hợp lệ!", (value) => {
        return isDateBeforeToday(value);
      }),  });

  const form = useForm({
    defaultValues: {
      ten: personnel.ten,
      gioitinh: personnel.gioitinh,
      ngaysinh: personnel.ngaysinh,
      nguyenquan: personnel.nguyenquan,
      dantoc: personnel.dantoc,
      tongiao: personnel.tongiao,
      quoctich: personnel.quoctich || "",
      cccd: personnel.cccd,
      ngaycap: personnel.ngaycap,
      noicap: personnel.noicap,
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
    };
    onSubmit(data);
  };

  const { isSubmitting } = form.formState;
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                Số CMND / CCCD <span className="text-danger">*</span>
              </p>
            </div>
            <div className="col-md-6">
              <InputField size="small" name="cccd" form={form} type="number" />
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
