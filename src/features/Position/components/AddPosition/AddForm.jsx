import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import InputField from "components/FormControl/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";

AddForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};
const useStyles = makeStyles({
  root: {},
  closeButton: {
    width: "48px",
    top: "16px",
    left: "90%",
  },
  addButton: {
    marginLeft: "20px",
    background: "#0984e3",
    borderRadius: "10px",
    fontSize: "20px",
    padding: "5px",
    color: "#f5f6fa",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
  },
  title: {
    fontWeight: "bold",
    fontSize: "25px",
    textAlign: "center",
  },
  submit: {
    top: "0",
  },
  progress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
function AddForm(props) {
  const { open, handleClose, onSubmit = null } = props;
  const classes = useStyles();

  const schema = yup.object().shape({
    ten: yup
      .string()
      .trim()
      .required("Chưa nhập tên chức vụ!")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Tên chức vụ không hợp lệ!"
      ),
    mota: yup.string(),
  });
  const form = useForm({
    defaultValues: {
      ten: "",
      mota: "",
    },
    reValidateMode: "onSubmit",

    resolver: yupResolver(schema),
  });
  const handleSubmit = async (value) => {
    if (onSubmit) await onSubmit(value);
    form.reset({
      ten: "",
      mota: "",
    });
  };
  const { isSubmitting } = form.formState;

  return (
    <Dialog open={open} onClose={handleClose} disableEscapeKeyDown fullWidth>
      <IconButton
        size="small"
        className={classes.closeButton}
        onClick={handleClose}
      >
        <Close />
      </IconButton>
      <Container className={classes.title}>
        <Typography variant="span">Thêm chức vụ</Typography>
      </Container>
      <DialogContent>
        <Container>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField
              name="ten"
              label="Tên chức vụ"
              form={form}
              disabled={isSubmitting}
            />
            <InputField
              name="mota"
              label="Mô tả"
              form={form}
              disabled={isSubmitting}
            />
            {isSubmitting ? (
              <Box className={classes.progress}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                disabled={isSubmitting}
                className={classes.submit}
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                color="primary"
              >
                Thêm chức vụ
              </Button>
            )}
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default AddForm;
