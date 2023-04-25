import { getField, updateField } from "vuex-map-fields";

const UPDATE_ACTION = "UPDATE_ACTION";


const UPDATE_SUM_CASH_REVENUES = "UPDATE_SUM_CASH_REVENUES";
const UPDATE_SUM_CASH_EXPENSES = "UPDATE_SUM_CASH_EXPENSES";
const UPDATE_INCOME = "UPDATE_INCOME";


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

    getAction: (state) => ({ index, type }) => {
      if (type == 'revenue') {
        return (
          state.revenues[index]
        );
      } else if (type == 'expense') {
        return (
          state.expenses[index]
        );
      }
    },
  },

  mutations: {
    updateField,
    SET_NINJAS(state, payload) {
      state.ninjas = payload.ninjas
      state.sumPriceNinjas = payload.sumPrice
      state.countNinjas = payload.count

    },

    SET_NINJA(state, payload) {
      state.ninja = payload
    },

  },

  actions: {
    async fetchNickNinjas({ commit }) {
      try {
        const res = await this.$repositories.adminGameNinjas.fetchNickNinjas()
        commit('SET_NINJAS', res.data)
      } catch (error) { }
    },
    async fetchAccountNinja({ commit }, payload) {
      console.log(payload);
      try {
        const res = await this.$repositories.adminGameNinjas.fetchAccountNinja(payload)
        commit('SET_NINJA', res.data.acountNinja)
      } catch (error) { }
    },

    async updateAccountNinja({ commit, state }, id) {
      console.log(id);
      try {
        const res = await this.$repositories.adminGameNinjas.updateAccountNinja({
          id,
          input: state.ninja
        });
        commit('SET_NINJA', res.data.accountNinja)
        return res
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit('SET_NINJA', payload);
    },

  },
}

