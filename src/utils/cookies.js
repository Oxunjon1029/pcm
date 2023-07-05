import Cookie from "js-cookie";
const jwt_decode = require("jwt-decode");

export const deleteCookie = (name) => {
  Cookie.remove(name);
};

export const setCookie = (name, value) => {
  Cookie.set(name, value, { path: "/" });
};
export const isTokenExpired = (token) => {
  const decoded = jwt_decode.default(token);
  const tokenExpireTime = decoded.exp;

  return tokenExpireTime < Date.now() ? true : false;
};
export const getCookie = (name) => {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
};
