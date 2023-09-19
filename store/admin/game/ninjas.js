import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    ninjas: [],
    sumPriceNinjas: "",
    countNinjas: "",
    ninja: {},
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
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_NINJAS(state, payload) {
      state.ninjas = payload.ninjas
      state.sumPriceNinjas = payload.sumPrice
      state.countNinjas = payload.count

    },

    SET_NINJA(state, payload) {
      state.ninja = payload
    },
    SET_IMAGES(state, payload) {
      state.ninja.hinhanh = payload
    },

  },

  actions: {
    newAccountNinja({ commit }) {
      commit(SET_STATE, { ninja: newAccountNinja });
    },
    async fetchAccountNinjas({ commit, state }) {
      try {
        const res = await this.$repositories.adminGameNinjas.fetchAccountNinjas()
        commit('SET_NINJAS', res.data)
      } catch (error) { }
    },
    async fetchAccountNinja({ commit }, payload) {
      try {
        const res = await this.$repositories.adminGameNinjas.fetchAccountNinja(payload)
        commit('SET_NINJA', res.data.acountNinja)
      } catch (error) { }
    },
    async createAccountNinja({ commit, state }) {
      const payload = _.omit(state.ninja, "ID");

      try {
        const res = await this.$repositories.adminGameNinjas.createAccountNinja({
          input: payload
        });
        // commit('SET_NINJA', res.data.accountNinja)
        return res
      } catch (error) { }
    },
    async updateAccountNinja({ commit, state }, id) {
      try {
        const res = await this.$repositories.adminGameNinjas.updateAccountNinja({
          id,
          input: state.ninja
        });
        if (res.data.accountNinja) {
          commit('SET_NINJA', res.data.accountNinja)
        }
        return res
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit('SET_NINJA', payload);
    },
    setAccountImagesNinja({ commit }, payload) {
      commit('SET_IMAGES', payload);

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
  eye: "",
  clone: "",
  mounts: "",
  yen: "",
  book: "",
  cake: "",
  disguise: "",
};
