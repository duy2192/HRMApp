import axiosClient from './axiosClient';

export const contractApi = {
   get(id) {
    const url = `/contract/${id}`;
    return axiosClient.get(url);
  },
   create(data) {
    const url = '/contract';
    return axiosClient.post(url, data);
  },
};

