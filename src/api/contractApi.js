import axiosClient from './axiosClient';

export const contractApi = {
   getAll(id) {
    const url = `/contract/${id}`;
    return axiosClient.get(url);
  },
   get(id) {
    const url = `/contract/byid/${id}`;
    return axiosClient.get(url);
  },
   remove(id) {
    const url = `/contract/${id}`;
    return axiosClient.delete(url);
  },
   create(data) {
    const url = '/contract';
    return axiosClient.post(url, data);
  },
};

