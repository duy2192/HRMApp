import axiosClient from './axiosClient';

export const personnelApi = {
   getAll(params) {
    const url = '/personnel';
    return axiosClient.get(url, {params});
  },
   get(id) {
    const url = `/personnel/${id}`;
    return axiosClient.get(url);
  },
   create(data) {
    const url = '/personnel';
    return axiosClient.post(url, data);
  },
   update(data) {
    const url = '/personnel';
    return axiosClient.patch(url, data);
  },
   getLevel(id) {
    const url = `/personnel/level/${id}`;
    return axiosClient.get(url);
  },
  getPosition(id) {
    const url = `/personnel/position/${id}`;
    return axiosClient.get(url);
  },
  addLevel(data) {
    const url = '/personnel/level';
    return axiosClient.post(url, data);
  },
  addPosition(data) {
    const url = '/personnel/position';
    return axiosClient.post(url, data);
  },
};

