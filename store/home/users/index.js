import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const SET_USER_INFO = "SET_USER_INFO";
const SET_QUERY = "SET_QUERY";


export default {
  namespaced: true,
  state: () => ({
    sidebarActive: true,
    token: null,
    authenticated: false,
    authErrorMessage: null,
    user: null,
    historyBuyAccount: {},
    historyBuyAccounts: [],
    historyChangeMoneys:  [],
    historyMeta: {},
    pageSave: 1,
    query: {
      page: 1,
      perPage: 24
    }
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
    async loginFb({ commit }, payload) {
      try {
        const response = await this.$repositories.homeUsers.loginFb();
        console.log("logfb", response);
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

    async buyAccountNinja({ commit, state }, payload) {
      try {
        const response = await this.$repositories.homeUsers.buyAccountNinja({
          input: {
            id: payload
          }
        });
        console.log(response);

        // commit(SET_STATE, {historyBuyAccounts: response.data.historyBuyAccounts});
        // commit(SET_STATE, {historyMeta: response.data.pagy});

      } catch { }
    },
    async historyBuyAccount({ commit, state }, id) {
      try {
        const response = await this.$repositories.homeUsers.historyBuyAccount(id);
        console.log(response);

        commit(SET_STATE, { historyBuyAccount: response.data.historyBuyAccount });

      } catch { }
    },
    async historyBuyAccounts({ commit, state }) {
      try {
        const response = await this.$repositories.homeUsers.historyBuyAccounts({ input: state.query });
        console.log(response.data.historyBuyAccounts);

        commit(SET_STATE, { historyBuyAccounts: response.data.historyBuyAccounts });
        commit(SET_STATE, { historyMeta: response.data.pagy });

      } catch { }
    },
    async historyChangeMoneys({ commit, state }) {
      try {
        const response = await this.$repositories.homeUsers.historyChangeMoneys({ input: state.query });
        console.log(response.data.historyChangeMoneys);

        commit(SET_STATE, { historyChangeMoneys: response.data.historyChangeMoneys });
        commit(SET_STATE, { historyMeta: response.data.pagy });

      } catch { }
    },
    resetHistoryBuyAccount({ commit }) {
      commit(SET_QUERY, {
        historyBuyAccount: null
      });
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
      commit(SET_STATE, { pageSave: state.query.page });
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, {
        page: 1,
        perPage: 24,
        q: {},
      });
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
      console.log("logout");
      commit(AUTH_LOGOUT);
    },
  },
  mutations: {
    updateField,
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_QUERY(state, payload) {
      state.query = {
        ...state.query,
        ..._.cloneDeep(payload),
      };
    },
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
      state.user = null;
    },

  },
};