import axiosClient from './axiosClient';

export const salaryApi = {

   create(data) {
    const url = '/salary';
    return axiosClient.post(url, data);
  },
   get(id) {
    const url = `/salary/${id}`
    return axiosClient.get(url);
  },
};

