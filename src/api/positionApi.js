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
   update(data) {
    const url = '/position';
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/position/${id}`;
    return axiosClient.delete(url);
  },
};

