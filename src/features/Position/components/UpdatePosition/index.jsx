import { positionApi } from "api";
import { useSnackbar } from "notistack";
import React from "react";
import UpdateForm from "./UpdateForm";

function UpdatePosition({ open, handleClose, position }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (value) => {
    try {
      await positionApi.update({ ...value, id: position.id });
      enqueueSnackbar("Cập nhật chức vụ thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handleRemove = async () => {
    try {
      await positionApi.remove( position.id);
      enqueueSnackbar("Xóa chức vụ thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <>
      {position?.id && (
        <UpdateForm
          handleUpdatePosition={handleSubmit}
          handleRemovePosition={handleRemove}
          position={position}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default UpdatePosition;
