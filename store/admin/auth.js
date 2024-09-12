import { getField, updateField } from "vuex-map-fields";

const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
// const SET_AGENCY_USER_INFO = "SET_AGENCY_USER_INFO";

export default {
  namespaced: true,
  state: () => ({
    sidebarActive: true,
    token: null,
    authenticated: false,
    authErrorMessage: null,
    user: null
  }),
  getters: {
    getField,

  },
  actions: {

    async authRequest({ commit }, authData) {

      if (authData.status = "success") {
        commit(AUTH_SUCCESS, authData);
      } else {
        commit(AUTH_ERROR, false);
      }

    },
    async logout({ commit, dispatch }) {
      const  res = await this.$repositories.adminAuths.logout()
      commit("AUTH_LOGOUT");
    },
  },
  mutations: {
    updateField,
    AUTH_SUCCESS(state, authData) {
      state.token = authData.token;
      state.authenticated = true;
      state.authErrorMessage = null;
    },
    AUTH_ERROR(state, payload) {
      state.token = null;
      state.authenticated = false;
      state.authErrorMessage = payload;
    },
    AUTH_LOGOUT(state) {
      state.authenticated = false;
      state.token = null;
    },

  },
};