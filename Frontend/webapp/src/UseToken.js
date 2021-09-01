import Cookie from 'js-cookie';

export const getToken = () => {
  // const tokenString = localStorage.getItem('token');
  // const userToken = tokenString;
  return Cookie.get("token") ? Cookie.get("token") : null;
};

export const saveToken = userToken => {
  // localStorage.setItem('token', userToken);
  Cookie.set("token", userToken);
  window.location.reload();
};

export const removeToken = userToken => {
  // localStorage.setItem('token', userToken);
  Cookie.remove("token");
  window.location.reload();
};