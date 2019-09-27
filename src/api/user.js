import { post, get } from "@/api/request";

export function login(data) {
  return post("/user/login", data);
}

export function getInfo() {
  return get("/user/login");
}

export function logout() {
  return post("/user/login");
}
