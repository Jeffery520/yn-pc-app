import request from "@/api/request";

const header = {};
const baseURL = process.env.VUE_APP_BASE_API;

export function articles(params) {
  // return出去了一个promise
  return request.get(`${baseURL}`, params, header);
}
