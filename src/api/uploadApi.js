import axiosClient from "./axiosClient";

export const uploadApi = {
  uploadFile( data,updateProgress) {
    const url = "/uploads/file";
    return axiosClient.post(url, data,{
      onUploadProgress: progressEvent => {
        let percentComplete = progressEvent.loaded / progressEvent.total
        percentComplete = parseInt(percentComplete * 100);
        console.log(percentComplete);
        updateProgress(percentComplete);
      }
    });
  },
};
