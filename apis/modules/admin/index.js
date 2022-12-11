import request from "axios";
// import store from 'vuex'
// import Toasted from '@/plugins/toast'

// import toasted from "vue-toasted"
// import router from 'vue-router'

// import store from "@/store/store";
// export default ({ store, $axios,  }) => {

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
  // console.log(store)
  if((result.data.status_code == 401)){
    window.location.href = "/"
    // router('/')
  }
  return result;
})
// (store, api);
// };
export default api;
