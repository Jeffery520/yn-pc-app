import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, day) {
  if (day) {
    return Cookies.set(TokenKey, token, { expires: day });
  } else {
    return Cookies.set(TokenKey, token);
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
