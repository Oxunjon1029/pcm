import Cookie from "js-cookie";


export const deleteCookie = (name) => {
  Cookie.remove(name);
};

export const setCookie = (name, value) => {
  Cookie.set(name, value, { path: "/" });
};

export const getCookie = (name) => {
  return Cookie.get(name) ? Cookie.get(name) : null
};
export const isTokenExpired = async (token, navigate) => {
  const decode = JSON.parse(atob(token.split('.')[1]));
  console.log(decode);
  if (decode?.exp * 1000 < new Date().getTime()) {
    deleteCookie(process.env.REACT_APP_TOKEN)
    navigate('/login')
  }

}
