import axiosClient from './axiosClient';

export const insuranceApi = {
   create(data) {
    const url = '/insurance/';
    return axiosClient.post(url,data);
  },
   getAll(id) {
    const url = `/insurance/${id}`;
    return axiosClient.get(url);
  },
   remove(id) {
    const url = `/insurance/${id}`;
    return axiosClient.delete(url);
  },

};
