import { post, get } from "@/api/request";

export function getAlertList(params) {
  return get("/api/alert", params);
}
