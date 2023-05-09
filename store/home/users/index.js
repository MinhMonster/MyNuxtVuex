import { getField, updateField } from "vuex-map-fields";

const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const SET_USER_INFO = "SET_USER_INFO";

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
    // getErrors: (state) => (name) => {
    //   // return _.get(state.validationErrors, name, []);
    // },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await this.$repositories.homeUsers.login(payload);
        commit(
          AUTH_SUCCESS,
          response.data
        );
      } catch { }
    },
    async register({ commit, dispash }, payload) {
      try {
        // await this.$repositories.homeUsers.register(payload);
        const response = await this.$repositories.homeUsers.register(payload);
        commit(
          AUTH_SUCCESS,
          response.data
        );
      } catch { }
    },

    async fetchUser({ commit }) {
      try {
        const response = await this.$repositories.homeUsers.fetchUser();
        const userInfo = response.data.userInfo;
        if (userInfo) {
          commit(SET_USER_INFO, userInfo);
        } else {
          commit(AUTH_LOGOUT);
        }
      } catch { }
    },
    async authRequest({ commit }, authData) {
      // try {
      // const resp = await this.$repositories.globalAuth.agencyLogin(payload);
      // const authData = resp.data.data.loginAgency;
      if (authData.status = "success") {
        commit(AUTH_SUCCESS, authData);
      } else {
        commit(AUTH_ERROR, false);
      }
      // } catch (err) {
      // console.log(err);
      // commit(AUTH_ERROR, err[0].message);
      // }
    },
    logout({ commit }) {
      commit(AUTH_LOGOUT);
    },
  },
  mutations: {
    updateField,
    SET_USER_INFO(state, payload) {
      state.user = payload;
    },
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