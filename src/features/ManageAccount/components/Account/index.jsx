import React from "react";
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
import SelectField from "components/FormControl/SelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { ROLE_ACCOUNT } from "constants";

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
  const { open, handleClose, onSubmit = null, account,onBlock } = props;
  const classes = useStyles();

  const schema = yup.object().shape({});
  const form = useForm({
    defaultValues: {
      role: account.role,
    },
    reValidateMode: "onSubmit",

    resolver: yupResolver(schema),
  });
  const handleSubmit = async (value) => {
    if (onSubmit) await onSubmit(value);
  };
  const handleBlockAccount = async (value) => {
    if (onSubmit) await onBlock();
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
        <Typography variant="span"></Typography>
      </Container>
      <DialogContent>
        <Container sx={{ height: "250px" }}>
          <Box>
            <Typography
              component="span"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Họ tên:
            </Typography>
            <Typography component="span" sx={{ fontSize: "20px",marginLeft:"20px" }}>
              {account.name}
            </Typography>
          </Box>
          <Box>
            <Typography
              component="span"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Tên tài khoản:
            </Typography>
            <Typography component="span" sx={{ fontSize: "20px",marginLeft:"20px" }}>
              {account.username}
            </Typography>
          </Box>
          <Box>
            <Typography
              component="span"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Email:
            </Typography>
            <Typography component="span" sx={{ fontSize: "20px",marginLeft:"20px" }}>
              {account.email}
            </Typography>
          </Box>

          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <SelectField data={ROLE_ACCOUNT} name="role" form={form} />
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
                sx={{
                  marginTop:"20px"
                }}
              >
                Lưu 
              </Button>
              <Button
                disabled={isSubmitting}
                variant="contained"
                fullWidth
                size="large"
                color="error"
                onClick={handleBlockAccount}
              >
                Vô hiệu hóa
              </Button>
              </>
            )}
          </form>
          {/* <ConfirmBox
            open={openDialog}
            handleClose={handleCloseDialog}
            title="Xóa trình độ"
            label="Bạn chắc chắn muốn xóa?"
            handleConfirm={handleRemoveConfirm}
          /> */}
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default AddForm;
