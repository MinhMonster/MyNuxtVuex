import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    accountAvatars: [],
    metaAvatars: {},
    countAvatars: "",
    accountAvatar: {},
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
    SET_AVATARS(state, payload) {
      state.accountAvatars = payload.accountAvatars;
      state.metaAvatars = payload.pagy
      state.countAvatars = payload.count
    },
    RESET_AVATARS(state) {
      state.accountAvatars = [];
      state.metaAvatars = {}
      state.countAvatars = ""
    },

    SET_AVATAR(state, payload) {
      state.accountAvatar = payload
    },

  },

  actions: {
    async fetchAccountAvatars({ commit, state }) {
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatars({ input: state.query })
        commit('SET_AVATARS', res.data)
      } catch (error) { }
    },
    async fetchAccountAvatar({ commit }, payload) {
      try {
        const res = await this.$repositories.gameAvatars.fetchAccountAvatar(payload)
        commit('SET_AVATAR', res.data.acountAvatar)
      } catch (error) { }
    },

    setAccountAvatar({ commit }, payload) {
      commit('SET_AVATAR', payload);
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit, state }, payload) {
      commit(SET_PAGE, payload);
    },
    resetAccountAvatars({ commit }) {
      commit('RESET_AVATARS');
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, queryAvatar);
    },

  },
}

export const queryAvatar = {
  page: 1,
  perPage: 24,
  q: {
    id: null,
    cash: null,
    username: null,
    sex: null
  },
};
