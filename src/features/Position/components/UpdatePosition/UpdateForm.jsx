import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import ConfirmBox from "components/ConfirmBox";
import InputField from "components/FormControl/InputField";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

UpdateForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleUpdatePosition: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
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
  remove: {
    marginTop: "10px",
    background: "#ff4757",
  },
  progress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
function UpdateForm(props) {
  const {
    open,
    handleClose,
    handleUpdatePosition = null,
    position,
    handleRemovePosition = null,
  } = props;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const schema = yup.object().shape({
    ten: yup
      .string()
      .trim()
      .required("Chưa nhập tên chức vụ!")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        "Tên chức vụ không hợp lệ!"
      ),
    mota: yup.string().trim().nullable(),
  });
  const form = useForm({
    defaultValues: useMemo(() => {
      return {
        ten: position?.ten,
        mota: position?.mota,
      };
    }, [position]),
    reValidateMode: "onSubmit",

    resolver: yupResolver(schema),
  });
  const handleSubmit = async (value) => {
    if (handleUpdatePosition) await handleUpdatePosition(value);
  };
  const { isSubmitting } = form.formState;

  const handleRemoveClick = () => {
    setOpenDialog(true);
  };
  const handleRemovePositionConfirm = async () => {
    if (handleRemovePosition) await handleRemovePosition();
    setOpenDialog(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
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
        <Typography variant="span">Cập nhật chức vụ</Typography>
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
              <>
                <Button
                  disabled={isSubmitting}
                  className={classes.submit}
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  color="primary"
                >
                  Cập nhật
                </Button>
                <Button
                  className={classes.remove}
                  disabled={isSubmitting}
                  variant="contained"
                  onClick={handleRemoveClick}
                  fullWidth
                  size="large"
                  color="primary"
                >
                  Xóa
                </Button>
              </>
            )}
          </form>
          <ConfirmBox
            open={openDialog}
            handleClose={handleCloseDialog}
            title="Xóa chức vụ"
            label="Bạn chắc chắn muốn xóa?"
            handleConfirm={handleRemovePositionConfirm}
          />
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateForm;
