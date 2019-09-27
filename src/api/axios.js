/*
 * 2019-09-24 jeffery
 * axios的配置
 * */
import axios from "axios";
// import { MessageBox, Message } from "element-ui";

// import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建 axios 实例
let service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // headers: {'Content-Type': 'application/json'},
  timeout: 60000
});

// 设置 post、put 默认 Content-Type
// service.defaults.headers.post["Content-Type"] = "application/json";
// service.defaults.headers.put["Content-Type"] = "application/json";

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === "post" || config.method === "put") {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data);
    }
    // 请求发送前进行处理
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let { data } = response;
    return data;
  },
  error => {
    // Message({
    //   message: "res.message" || "Error",
    //   type: "error",
    //   duration: 5 * 1000
    // });

    // MessageBox.confirm(
    //   "You have been logged out, you can cancel to stay on this page, or log in again",
    //   "Confirm logout",
    //   {
    //     confirmButtonText: "Sure",
    //     cancelButtonText: "Cancel",
    //     type: "warning"
    //   }
    // ).then(() => {
    //   // store.dispatch('user/resetToken').then(() => {
    //   //   location.reload()
    //   // })
    // });

    let { info = {}, status, statusText, data } = error.response;

    if (!error.response) {
      info = {
        code: 5000,
        msg: "Network Error"
      };
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      };
    }
    // 请求错误处理
    return Promise.reject(info);
  }
);

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default service;
