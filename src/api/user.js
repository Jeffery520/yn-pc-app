import { post, get } from "@/api/request";

export function login(data) {
  return post("/api/authentication/form", data);
}

export function getInfo() {
  return get("/api/user/me");
}

export function logout() {
  return post("/api/user/logout");
}
