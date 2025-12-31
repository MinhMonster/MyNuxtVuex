import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    meta: {},
    ninjaCoinPrices: [],
    historyBuyXuNinjas: [],
    historyMeta: {},
    // query: defaultQuery()
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

    SET_NINJA(state, payload) {
      state.accountNinja = payload;
    }
  },

  actions: {

    async fetchXuNinjaPrices({ commit, state }) {
      try {
        const res = await this.$repositories.gameNinjaCoin.fetchXuNinjaPrices({
          input: state.query
        });
        commit(SET_STATE, { ninjaCoinPrices: res.data.response.data || [] });

      } catch (error) { }
    },
    async buyXuNinja({ commit }, payload) {
      try {
        const response = await this.$repositories.gameNinjaCoin.buyXuNinja(payload);
        return response
      } catch { }
    },
    async fetchHistoryBuyXuNinjas({ commit, state }) {
      try {
        const response = await this.$repositories.gameNinjaCoin.fetchHistoryBuyXuNinjas({ input: state.query });
        commit(SET_STATE, { historyBuyXuNinjas: response.data.response.data });
        commit(SET_STATE, { historyMeta: response.data.response.meta });

      } catch { }
    },
    setQuery({ commit }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit, state }, payload) {
      commit(SET_PAGE, payload);
    },
  }
};
