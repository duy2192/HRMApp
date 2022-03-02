import axiosClient from './axiosClient';

export const levelApi = {
   getAll(params) {
    const url = '/level';
    return axiosClient.get(url);
  },
   get(id) {
    const url = `/level/${id}`;
    return axiosClient.get(url);
  },
   create(data) {
    const url = '/level';
    return axiosClient.post(url, data);
  },
};

