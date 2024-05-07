import axios from "axios";

const token = localStorage.getItem("token");

// 创建 Axios 实例
const instance = axios.create({
  baseURL: "/exam_api", // 设置默认的 baseURL
  timeout: 10000, // 设置超时时间
  withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (config.params) {
      config.params.cookie = cookie;
    if (token) {
      console.log(token);
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做些什么
    return response.data;
  },
  function (error) {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
