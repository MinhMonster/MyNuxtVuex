
import AdminAuth from "./admin/auth"
import AdminTopics from "./admin/topics"
import AdminDeverlopers from "./admin/deverlopers"
import HomeUser from "./home/users"


const ADD_REQUEST = "ADD_REQUEST";
const REMOVE_REQUEST = "REMOVE_REQUEST";
const DISABLE_LOADING = "DISABLE_LOADING";



export default {
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    ADD_REQUEST(state, payload) {
      state.requests = [...state.requests, payload];
    },
    REMOVE_REQUEST(state, payload) {
      state.requests = state.requests.filter((id) => id !== payload);
    },
    DISABLE_LOADING(state) {
      state.requests = [];
    },
  },
  actions: {
    addRequest({ commit }, payload) {
      commit(ADD_REQUEST, payload);
    },
    disableLoading({ commit }) {
      commit(DISABLE_LOADING);
    },
    removeRequest({ commit }, payload) {
      setTimeout(() => {
        commit(REMOVE_REQUEST, payload);
      }, 300);
    },
  },

  modules: {
    ADAU: AdminAuth,
    ADTP: AdminTopics,
    ADDV: AdminDeverlopers,
    HOUS: HomeUser,

  },
  
};
