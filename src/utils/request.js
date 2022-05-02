import axios from 'axios';
import notification from 'ant-design-vue/es/notification';
import store from '@/store';

export const BASE_API_URL = 'https://www.inoreader.com/';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: BASE_API_URL,
  timeout: 60000, // 请求超时时间
});
// 异常拦截处理器
const errorHandler = error => {
  if (error.response) {
    // const data = error.response.data;

    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: 'Forbidden',
      });
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      });
      // if (token) {
      //   store.dispatch('Logout').then(() => {
      //     setTimeout(() => {
      //       window.location.reload();
      //     }, 1500);
      //   });
      // }
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use(config => {
  const userConfig = store.state.userConfig;
  // console.error(userConfig);
  if (userConfig && userConfig.app) {
    config.headers['AppId'] = userConfig.app.app_id;
    config.headers['AppKey'] = userConfig.app.app_key;
    if (userConfig.app.auth) {
      const auth = userConfig.app.auth.split('\n');
      config.headers['Authorization'] = `GoogleLogin ${auth[2]}`;
    }
  }
  // Authorization
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use(response => {
  return response.data;
}, errorHandler);

export default request;
