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
      perPage: 24,
      q: {
        id: null,
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
      state.accountNinjas = accountNinjas.concat(payload.ninjas);
      state.metaNinjas = payload.pagy
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
    newAccountNinja({ commit }) {
      commit(SET_STATE, { ninja: newAccountNinja });
    },
    async fetchAccountNinjas({ commit, state }) {
      try {
        const res = await this.$repositories.gameNinjas.fetchAccountNinjas({ input: state.query })
        commit('SET_NINJAS', res.data)
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
        perPage: 24,
        q: {
          id: null,
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

export const newAccountNinja = {
  ID: "",
  taikhoan: "",
  ingame: "",
  level: "",
  vukhi: "",
  mcs: "",
  thongtin: "",
  loainick: 1,
  class: 1,
  server: 1,
  giatien: "",
  gianhap: "",
  sim: "",
  hinhanh: [],
  do: "",

  tl1: "",
  tl2: "",
  tl3: "",
  tl4: "",
  tl5: "",
  tl6: "",
  tl7: "",
  tl8: "",
  tl9: "",
  tl10: "",
  tl11: "",
};
