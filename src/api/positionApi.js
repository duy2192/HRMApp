import axiosClient from './axiosClient';

export const positionApi = {
   getAll() {
    const url = '/position';
    return axiosClient.get(url);
  },
   get(id) {
    const url = `/position/${id}`;
    return axiosClient.get(url);
  },
   create(data) {
    const url = '/position';
    return axiosClient.post(url, data);
  },
};

