import axiosClient from './axiosClient';

export const exportApi = {
   exportStatisticalPersonnel(params) {
    const url = '/statistical';
    return axiosClient.get(url, {params});
  },
};

