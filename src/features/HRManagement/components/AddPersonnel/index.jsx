import { personnelApi } from "api";
import { useSnackbar } from "notistack";
import React from "react";
import AddForm from "./AddForm";



function AddPersonnel(props) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (value) => {
    try {
      await personnelApi.create(value);
      enqueueSnackbar("Thêm hồ sơ thành công", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Lỗi!",{variant: 'error'})
    }
  };
  return (
      <div className="container">
        <div className="">
          <AddForm onSubmit={handleSubmit} />
        </div>
      </div>
  );
}

export default AddPersonnel;
