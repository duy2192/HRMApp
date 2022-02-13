import axiosClient from './axiosClient';

const userApi = {
   login(data) {
    const url = '/user/login';
    return axiosClient.post(url, data);
  }
};

export default userApi;
