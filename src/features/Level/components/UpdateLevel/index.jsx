import { levelApi } from "api";
import { useSnackbar } from "notistack";
import React from "react";
import UpdateForm from "./UpdateForm";

function UpdatePosition({ open, handleClose, level }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (value) => {
    try {
      await levelApi.update({ ...value, id: level.id });
      enqueueSnackbar("Cập nhật trình độ thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handleRemove = async () => {
    try {
      await levelApi.remove( level.id);
      enqueueSnackbar("Xóa trình độ thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Không hợp lệ",{variant: 'error'})
    }
  };
  return (
    <>
      {level?.id && (
        <UpdateForm
          handleUpdate={handleSubmit}
          handleRemove={handleRemove}
          level={level}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default UpdatePosition;
