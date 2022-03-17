import { departmentApi } from "api";
import { useSnackbar } from "notistack";
import React from "react";
import UpdateForm from "./UpdateForm";

function UpdateDepartment({ open, handleClose, department }) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (value) => {
    try {
      await departmentApi.update({ ...value, id: department.id });
      enqueueSnackbar("Cập nhật đơn vị thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handleRemove = async () => {
    try {
      await departmentApi.remove( department.id);
      enqueueSnackbar("Xóa đơn vị thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Không hợp lệ",{variant: 'error'})
    }
  };
  return (
    <>
      {department?.id && (
        <UpdateForm
          handleUpdate={handleSubmit}
          handleRemove={handleRemove}
          department={department}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default UpdateDepartment;
