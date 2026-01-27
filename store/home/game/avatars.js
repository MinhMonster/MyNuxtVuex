import { getField, updateField } from "vuex-map-fields";
import { cleanQuery } from "@/utils/queryHelpers";

const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    accounts: [],
    meta: {},
    count: "",
    account: {},
    query: defaultQueryAvatar
  }),

  getters: {
    getField
  },

  mutations: {
    updateField,
    SET_QUERY(state, payload) {
      state.query = { ...state.query, ...payload };
    },
    SET_PAGE(state) {
      state.query.page += 1;
    },
    SET_STATE(state, payload) {
      Object.assign(state, payload);
    },
    SET_ACCOUNTS(state, payload) {
      state.accounts = payload.data;
      state.meta = payload.meta;
      state.count = payload.count;
    },
    RESET_ACCOUNTS(state) {
      state.accounts = [];
      state.meta = {};
      state.count = "";
    },

    SET_ACCOUNT(state, payload) {
      state.account = payload;
    }
  },

  actions: {
    async fetchAccountAvatars({ commit, state }) {
      const filteredQuery = cleanQuery(state.query);
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatars({
          input: filteredQuery
        });
        commit("SET_ACCOUNTS", res.data.response);
      } catch (error) { }
    },
    async fetchAccountAvatar({ commit }, payload) {
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatar(
          payload
        );
        commit("SET_ACCOUNT", res.data.response);
      } catch (error) { }
    },

    setAccountAvatar({ commit }, payload) {
      commit("SET_ACCOUNT", payload);
    },
    setQuery({ commit }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit }) {
      commit("SET_PAGE");
    },

    resetAccountAvatars({ commit }) {
      commit("RESET_ACCOUNTS");
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, defaultQueryAvatar);
    }
  }
};

const defaultQueryAvatar = {
  page: 1,
  perPage: 60,
  q: {
    id: null,
    cash: null,
    username: null,
    sex: null,
    farm: null
  }
};
