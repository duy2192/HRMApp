import axiosClient from "./axiosClient";

export const jobApi = {
  get(id) {
    const url = `/job/${id}`;
    return axiosClient.get(url);
  },
  create(data) {
    const url = "/job";
    return axiosClient.post(url, data);
  },
  remove(id) {
    const url = `/job/${id}`;
    return axiosClient.delete(url);
  },
};
