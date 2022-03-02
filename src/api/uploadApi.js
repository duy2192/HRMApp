import axiosClient from "./axiosClient";

export const uploadApi = {
  uploadFile(data) {
    const url = "/uploads/file";
    return axiosClient.post(url, data);
  },
};
