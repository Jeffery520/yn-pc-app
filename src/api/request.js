import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/token";
import qs from "qs";

// 创建axios实例
const service = axios.create({
  // baseURL: "", // api的base_url
  timeout: 100 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method == "post") {
      config.params = {};
    }
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    // 让每个请求携带token
    config.headers["Authorization"] =
      getToken() || `Basic eWludW86eWludW9zZWNyZXQ=`;
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status === 200) {
      return res;
    } else {
      // Message({
      //   message: res.message || "Error",
      //   type: "error",
      //   duration: 5 * 1000
      // });
      return Promise.reject(new Error(res.message || "Error"));
    }

    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
  },
  error => {
    console.log(error);
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000
    // });
    return { data: { token: 123456 } };
    // return Promise.reject(error);
  }
);

export function get(url, params = {}) {
  return service({
    url: url,
    method: "get", // default
    params: params
  });
}
export function post(url, data = {}) {
  return service({
    url: url,
    method: "post", // default
    data: qs.stringify(data)
  });
}
