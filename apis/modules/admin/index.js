import request from "axios";
import store from "~/plugins/vuex-persistedstate";
import * as Cookies from "js-cookie";
import cookie from "cookie";

// import store from "vuex";
// /home/user/Desktop/MinhMonster/NuxtJs/MyNuxtVuex/plugins/vuex-persistedstate.js

// import store from 'vuex'
// import Toasted from '@/plugins/toast'

// import toasted from "vue-toasted"
// import router from 'vue-router'

// import store from "@/store/store";
// export default ({ store, $axios,  }) => {

const api = request.create({
  baseURL: process.env.VUE_APP_API_HOME
});

// console.log(Cookies.get("DST"))


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
  // console.log(error.response.status)
  if (status === 401) {
    window.location.href = "/"
  }
  // Do something with request error
  return Promise.reject(error);
});

// (store, api);
// };
export default api;
