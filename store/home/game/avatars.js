import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    accounts: [],
    meta: {},
    count: "",
    account: {},
    query: queryAvatar
  }),

  getters: {
    getField,
  },

  mutations: {
    updateField,
    SET_QUERY(state, payload) {
      state.query = {
        ...state.query,
        ..._.cloneDeep(payload),
      };
    },
    SET_PAGE(state) {
      const page = _.cloneDeep(state.query.page)
      state.query.page = page + 1;
    },
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_ACCOUNTS(state, payload) {
      state.accounts = payload.data;
      state.meta = payload.meta
      state.count = payload.count
    },
    RESET_ACCOUNTS(state) {
      state.accounts = [];
      state.meta = {}
      state.count = ""
    },

    SET_ACCOUNT(state, payload) {
      state.account = payload
    },

  },

  actions: {
    async fetchAccountAvatars({ commit, state }) {
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatars({ input: state.query })
        commit('SET_ACCOUNTS', res.data.response)
      } catch (error) { }
    },
    async fetchAccountAvatar({ commit }, payload) {
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatar(payload)
        commit('SET_ACCOUNT', res.data.response)
      } catch (error) { }
    },

    setAccountAvatar({ commit }, payload) {
      commit('SET_ACCOUNT', payload);
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit, state }, payload) {
      commit(SET_PAGE, payload);
    },
    resetAccountAvatars({ commit }) {
      commit('RESET_ACCOUNTS');
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, queryAvatar);
    },

  },
}

export const queryAvatar = {
  page: 1,
  perPage: 60,
  q: {
    id: null,
    cash: null,
    username: null,
    sex: null,
    farm: null
  },
};
