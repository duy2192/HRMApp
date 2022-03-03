import axiosClient from './axiosClient';

export const disciplineApi = {
   getById() {
    const url = '/discipline/byid/';
    return axiosClient.get(url);
  },
   getByPersonnel(id) {
    const url = `/discipline/${id}`;
    return axiosClient.get(url);
  },
   create(data) {
    const url = '/discipline';
    return axiosClient.post(url, data);
  },
  remove(id) {
    const url = `/discipline/${id}`;
    return axiosClient.delete(url);
  },
};

