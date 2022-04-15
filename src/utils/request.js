import axios from 'axios';

import store from '@/store';

export const BASE_API_URL = 'https://www.inoreader.com/';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: BASE_API_URL,
  timeout: 6000, // 请求超时时间
});

// request interceptor
request.interceptors.request.use(
  config => {
    const userConfig = store.state.userConfig;
    console.error(userConfig);
    if (userConfig) {
      // config.headers[ACCESS_TOKEN] = token;
    }
    return config;
  },
  err => {
    console.error('request', err);
  },
);

export default request;
