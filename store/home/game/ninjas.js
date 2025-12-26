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
    xuNinjaPrices: [],
    query: defaultQuery()
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
    SET_NINJAS(state, payload) {
      state.accountNinjas = [...state.accountNinjas, ...payload.ninjas];
      state.metaNinjas = payload.pagy;
      state.countNinjas = payload.count;
    },
    SET_XU_NINJA_PRICES(state, payload) {
      state.xuNinjaPrices = payload;
    },
    RESET_NINJAS(state) {
      state.accountNinjas = [];
      state.metaNinjas = {};
      state.countNinjas = "";
    },

    SET_NINJA(state, payload) {
      state.accountNinja = payload;
    }
  },

  actions: {
    async fetchAccountNinjas({ commit, state }) {
      const filteredQuery = cleanQuery(state.query);
      try {
        const res = await this.$repositories.gameNinjas.fetchAccountNinjas({ input: filteredQuery })
        commit('SET_NINJAS', res.data)
      } catch (error) { }
    },
    async fetchXuNinjaPrices({ commit, state }) {
      try {
        const res = await this.$repositories.gameNinjas.fetchXuNinjaPrices({ input: state.query })
        commit('SET_XU_NINJA_PRICES', res.data.data)
      } catch (error) { }
    },
    async fetchAccountNinja({ commit }, payload) {
      try {
        const res = await this.$repositories.gameNinjas.fetchAccountNinja(payload)
        commit('SET_NINJA', res.data.acountNinja)
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit('SET_NINJA', payload);
    },
    setQuery({ commit }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit, state }, payload) {
      commit(SET_PAGE, payload);
    },
    resetAccountNinjas({ commit }) {
      commit("RESET_NINJAS");
    },
    resetQuery({ commit }, type = null) {
      commit(SET_QUERY, defaultQuery(type));
    },
  }
};

const defaultQuery = (type = null) => ({
  page: 1,
  perPage: 36,
  q: {
    id: null,
    ingame: null,
    level: null,
    cash: null,
    class: null,
    server: null,
    family: null,
    type
  }
});

function cleanQuery(query) {
  const q = { ...query, q: { ...query.q } };
  Object.keys(q.q).forEach(key => {
    if (q.q[key] === null || q.q[key] === undefined) delete q.q[key];
  });
  return q;
}
