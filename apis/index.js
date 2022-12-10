// import request from "../../nuxt.config"

import request from "axios";

const api = request.create({
  baseURL: process.env.VUE_APP_API_HOME
});

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: "Bearer " + store.state.AUTH.state.userToken,
  };
  return config;
});

api.interceptors.response.use((result) => {
  return result;
});


export default api;