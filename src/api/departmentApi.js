import axiosClient from './axiosClient';

export const departmentApi = {
   getAll(params) {
    const url = '/department';
    return axiosClient.get(url, {params});
  },
   get(id) {
    const url = `/department/${id}`;
    return axiosClient.get(url);
  },
   create(data) {
    const url = '/department';
    return axiosClient.post(url, data);
  },
};

