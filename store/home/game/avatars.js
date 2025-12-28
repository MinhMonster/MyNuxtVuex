import { getField, updateField } from "vuex-map-fields";
import { cleanQuery } from "@/utils/queryHelpers";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    accountAvatars: [],
    metaAvatars: {},
    countAvatars: "",
    accountAvatar: {},
    query: defaultQueryAvatar(),
  }),

  getters: {
    getField,
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
    SET_AVATARS(state, payload) {
      state.accountAvatars = payload.accountAvatars;
      state.metaAvatars = payload.pagy;
      state.countAvatars = payload.count;
    },
    RESET_AVATARS(state) {
      state.accountAvatars = [];
      state.metaAvatars = {};
      state.countAvatars = "";
    },

    SET_AVATAR(state, payload) {
      state.accountAvatar = payload;
    },

  },

  actions: {
    async fetchAccountAvatars({ commit, state }) {
      const filteredQuery = cleanQuery(state.query);
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatars({
          input: filteredQuery,
        });
        commit("SET_AVATARS", res.data);
      } catch (error) { }
    },
    async fetchAccountAvatar({ commit }, payload) {
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatar(payload);
        commit("SET_AVATAR", res.data.acountAvatar);
      } catch (error) { }
    },

    setAccountAvatar({ commit }, payload) {
      commit("SET_AVATAR", payload);
    },
    setQuery({ commit }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit }) {
      commit("SET_PAGE");
    },

    resetAccountAvatars({ commit }) {
      commit("RESET_AVATARS");
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, defaultQueryAvatar());
    },
  },
};

const defaultQueryAvatar = () => ({
  page: 1,
  perPage: 60,
  q: {
    id: null,
    cash: null,
    username: null,
    sex: null,
    farm: null,
  },
});
