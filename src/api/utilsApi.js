import axiosClient from './axiosClient';

export const utilsApi = {
   getProvinces(params) {
    const url = '/utils/provinces';
    return axiosClient.get(url, {params});
  },
};

