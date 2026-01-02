import { getField, updateField } from "vuex-map-fields";
import { cleanQuery } from "@/utils/queryHelpers";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    accountNinjas: [],
    meta: {},
    countNinjas: "",
    accountNinja: {},
    xuNinjaPrices: [],
    query: defaultQuery()
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
    SET_NINJAS(state, payload) {
      const accountNinjas = _.cloneDeep(state.accountNinjas);
      state.accountNinjas = accountNinjas.concat(payload.data);
      state.meta = payload.meta;
      state.countNinjas = payload.count;
    },
    RESET_NINJAS(state) {
      state.accountNinjas = [];
      state.meta = {};
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
        const res = await this.$repositories.gameNinjas.fetchAccountNinjas({
          input: filteredQuery
        });
        commit("SET_NINJAS", res.data.response);
      } catch (error) { }
    },
    async fetchXuNinjaPrices({ commit, state }) {
      try {
        const res = await this.$repositories.gameNinjas.fetchXuNinjaPrices({
          input: state.query
        });
        commit("SET_XU_NINJA_PRICES", res.data.data);
      } catch (error) { }
    },
    async fetchAccountNinja({ commit }, payload) {
      commit("SET_NINJA", null);
      try {
        const res = await this.$repositories.gameNinjas.fetchAccountNinja(
          payload
        );
        commit("SET_NINJA", res.data.response);
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit("SET_NINJA", payload);
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
    }
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
