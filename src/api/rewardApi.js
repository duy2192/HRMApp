import axiosClient from './axiosClient';

export const rewardApi = {
   getById() {
    const url = '/reward/byid/';
    return axiosClient.get(url);
  },
   getByPersonnel(id) {
    const url = `/reward/${id}`;
    return axiosClient.get(url);
  },
   create(data) {
    const url = '/reward';
    return axiosClient.post(url, data);
  },
};

