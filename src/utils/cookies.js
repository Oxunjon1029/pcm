import Cookie from "js-cookie";
import jwt_decode from 'jwt-decode';


export const deleteCookie = (name) => {
  Cookie.remove(name);
};

export const setCookie = (name, value) => {
  Cookie.set(name, value, { path: "/" });
};

export const getCookie = (name) => {
  return Cookie.get(name) ? Cookie.get(name) : null
};
export const isTokenExpired = async (token) => {
  if (await token) {
    const exprTime = jwt_decode(token).exp
    const currentTime = Date.now() / 1000;
    return exprTime < currentTime
  }
  if (!(await token)) return true

}