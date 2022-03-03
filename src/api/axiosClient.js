import axios from 'axios';
import fileDownload from 'js-file-download'

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_HOST}api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('access-token');
    config.headers['access-token'] =  token ||'';   
    const URLs = ['download'];
    if (URLs.includes(config.url.split("/")[1])) {
    config.responseType="blob"
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { config, data  } = response;

    const urlDownload = ['download'];
    if (urlDownload.includes(config.url.split("/")[1])) {
      fileDownload(data,config.url.split("/")[2]);
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const URLs = ['/auth/login','/auth', '/auth/forgotpwd','/auth/resetpwd'];

    if (URLs.includes(config.url) && status === 400) {
      const error = data.message || {};
      throw new Error(error);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;