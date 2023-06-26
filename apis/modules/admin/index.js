import request from "axios";
import store from "~/plugins/vuex-persistedstate";
import * as Cookies from "js-cookie";
import cookie from "cookie";


const api = request.create({
  baseURL: process.env.VUE_APP_API_HOME
});



api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: "Bearer " 
  };


  return config;
}, function (error) {
  const status = error.response.status
  if (status === 401) {
    window.location.href = "/"
  }
  return Promise.reject(error);
});


api.interceptors.response.use((result) => {
  return result;
}, function (error) {
  const status = error.response.status
  if (status === 401) {
    window.location.href = "/"
  }
  // Do something with request error
  return Promise.reject(error);
});

export default api;
