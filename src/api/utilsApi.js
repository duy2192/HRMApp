import axiosClient from './axiosClient';

export const utilsApi = {
   getProvinces(params) {
    const url = '/utils/provinces';
    return axiosClient.get(url, {params});
  },
   download(file) {
    const url = `/download/${file}`;
    return axiosClient.get(url);
  },
};

