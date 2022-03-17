import axiosClient from './axiosClient';

export const authApi = {
   getAll(params) {
    const url = '/auth';
    return axiosClient.get(url,{params});
  },
   get(id) {
    const url = `/auth/${id}`;
    return axiosClient.get(url);
  },
  checkToken(token) {
    const url = `/auth/token`;
    return axiosClient.get(url, {params:{
      token:token
    }});
  },
  register(data){
    const url = `/auth`;
    return axiosClient.post(url,data);
  }
  ,
   login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
   forgotPwd(data) {
    const url = '/auth/forgotpwd';
    return axiosClient.post(url, data);
  },
   resetPwd(data) {
    const url = '/auth/resetpwd';
    return axiosClient.post(url, data);
  },
   changePwd(data) {
    const url = '/auth/changepwd';
    return axiosClient.patch(url, data);
  },
   changeRole(data) {
    const url = '/auth/changerole';
    return axiosClient.patch(url, data);
  },

};

