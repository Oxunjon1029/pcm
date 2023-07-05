import Cookie from "js-cookie";

export const deleteCookie = (name) => {
  Cookie.remove(name);
};

export const setCookie = (name, value) => {
  Cookie.set(name, value, { path: "/" });
};

export const getCookie = (name) => {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
};
