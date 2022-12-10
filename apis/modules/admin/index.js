import request from "axios";
// import Vue from 'vue'
// import Toasted from 'vue-toasted'

// import toasted from "vue-toasted"
// import router from 'vue-router'

// import store from "@/store/store";

const api = request.create({
  baseURL: process.env.VUE_APP_API_HOME
});

api.interceptors.request.use((config) => {
  config.headers = {
    // Authorization: "Bearer " + store.state.ADAU.state.adminToken
    Authorization: "Bearer " + "admxinS"

  };
  return config;
});



api.interceptors.response.use((result) => {
  // Toasted.success("okok")
  if((result.data.status_code == 401)){
    window.location.href = "/"
    // router('/')
  }
  return result;
});

export default api;
