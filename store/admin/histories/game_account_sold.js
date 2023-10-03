import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    gameAccountSolds: [],
    sumPriceNinjas: "",
    countNinjas: "",
    gameAccountSold: null,
    metaNinjas: {},
    query: {
      page: 1,
      perPage: 15,
      q: {
        taikhoan: null,
        id: null,
        level: null,
        cash: null,
        class: null,
        server: null,
        type: null,
        status: null
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
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_NINJAS(state, payload) {
      state.gameAccountSolds = payload.gameAccountSolds
      state.sumPriceNinjas = payload.sumPrice
      state.countNinjas = payload.count
      state.metaNinjas = payload.pagy
    },

    SET_NINJA(state, payload) {
      state.gameAccountSold = payload
    },
  },

  actions: {

    async fetchGameAccountSolds({ commit, state }) {
      try {
        const res = await this.$repositories.adminGameAccountSold.fetchGameAccountSolds({ input: state.query })
        commit('SET_NINJAS', res.data)

      } catch (error) { }
    },
    async fetchGameAccountSold({ commit }, payload) {
      try {
        const res = await this.$repositories.adminGameAccountSold.fetchGameAccountSold(payload)
        commit('SET_NINJA', res.data.gameAccountSold)
      } catch (error) { }
    },
    async updateGameAccountSold({ commit, state }, id) {
      try {
        const res = await this.$repositories.adminGameAccountSold.updateGameAccountSold({
          id,
          input: state.gameAccountSold
        });
        if (res.data.gameAccountSold) {
          commit('SET_NINJA', res.data.gameAccountSold)
        }
        return res
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit('SET_NINJA', payload);
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
      commit(SET_STATE, { pageSave: state.query.page });
    },
    resetQuery({ commit }, payload) {
      const type = payload ? payload : null;
      commit(SET_QUERY, {
        page: 1,
        perPage: 15,
        q: {
          taikhoan: null,
          id: null,
          level: null,
          cash: null,
          class: null,
          server: null,
          type: type,
          status: null
        },
      });
    },
    newAccountNinja({ commit }) {
      commit(SET_STATE, {
        ninja: {
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
        }
      });
    },
  },
}

// export const newAccountNinja = {
//   ID: "",
//   taikhoan: "",
//   ingame: "",
//   level: "",
//   vukhi: "",
//   mcs: "",
//   thongtin: "",
//   loainick: 1,
//   class: 1,
//   server: 1,
//   giatien: "",
//   gianhap: "",
//   sim: "",
//   hinhanh: [],
//   do: "",

//   tl1: "",
//   tl2: "",
//   tl3: "",
//   tl4: "",
//   tl5: "",
//   tl6: "",
//   tl7: "",
//   tl8: "",
//   tl9: "",
//   tl10: "",
//   tl11: "",
//   eye: "",
//   clone: "",
//   mounts: "",
//   yen: "",
//   book: "",
//   cake: "",
//   disguise: "",
// };
