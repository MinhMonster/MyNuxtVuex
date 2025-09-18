import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    accountNinjas: [],
    metaNinjas: {},
    countNinjas: "",
    accountNinja: {},
    query: {
      page: 1,
      perPage: 36,
      q: {
        id: null,
        ingame: null,
        level: null,
        cash: null,
        class: null,
        server: null,
        type: null,
      },
    }
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
    SET_NINJAS(state, payload) {
      const accountNinjas = _.cloneDeep(state.accountNinjas);
      state.accountNinjas = accountNinjas.concat(payload.data);
      state.metaNinjas = payload.meta
      state.countNinjas = payload.count
    },
    RESET_NINJAS(state) {
      state.accountNinjas = [];
      state.metaNinjas = {}
      state.countNinjas = ""
    },

    SET_NINJA(state, payload) {
      state.accountNinja = payload
    },

  },

  actions: {
    async fetchAccountNinjas({ commit, state }) {
      try {
        const res = await this.$repositories.gameNinjas.fetchAccountNinjas({ input: state.query })
        commit('SET_NINJAS', res.data.response)
      } catch (error) { }
    },
    async fetchAccountNinja({ commit }, payload) {
      try {
        const res = await this.$repositories.gameNinjas.fetchAccountNinja(payload)
        commit('SET_NINJA', res.data.response)
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit('SET_NINJA', payload);
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit, state }, payload) {
      commit(SET_PAGE, payload);
    },
    resetAccountNinjas({ commit }) {
      commit('RESET_NINJAS');
    },
    resetQuery({ commit }, payload) {
      const type = payload ? payload : null;
      commit(SET_QUERY, {
        page: 1,
        perPage: 36,
        q: {
          id: null,
          ingame: null,
          level: null,
          cash: null,
          class: null,
          server: null,
          type: type,
        },
      });
    },

  },
}