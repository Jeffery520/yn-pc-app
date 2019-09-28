import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/token";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000 // request timeout
});

// // request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.method == "post") {
      config.params = {};
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (response.status === 200) {
      return res;
    } else {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
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
    data: data
  });
}
