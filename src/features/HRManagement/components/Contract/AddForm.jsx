import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, FormLabel, IconButton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { uploadApi } from "api";
import CalendarField from "components/FormControl/CalendarField";
import InputField from "components/FormControl/InputField";
import SelectField from "components/FormControl/SelectField";
import { CONTRACT_TYPES } from "constants";
import React, { useState } from "react";
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
  const [file, setFile] = useState("");

  const schema = yup.object().shape({
    loaihd: yup.string().required("Chưa chọn loại hợp đồng"),
  });

  const form = useForm({
    defaultValues: {
      loaihd: "",
      ngayky: new Date(),
      ngaykt: new Date(),
      ghichu: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (!onSubmit) return;
    const data = {
      ...value,
      ngaykt:convertMySqlTime(value.ngaykt),
      ngayky:convertMySqlTime(value.ngayky),
      file,
    };
    onSubmit(data);
    // form.reset();
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
  const { isSubmitting } = form.formState;
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Loại hợp đồng </p>
            </div>
            <div className="col-md-6">
              <SelectField data={CONTRACT_TYPES} name="loaihd" form={form} />
            </div>
          </div>
          <div className="row pt-1">
            <div className="col-md-4">
              <p className="label">Ngày ký </p>
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
              <p className="label">Ghi chú</p>
            </div>
            <div className="col-md-6">
              <InputField
                size="small"
                label="Ghi chú "
                name="ghichu"
                form={form}
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
