import { getField, updateField } from "vuex-map-fields";

const UPDATE_ACTION = "UPDATE_ACTION";


const UPDATE_SUM_CASH_REVENUES = "UPDATE_SUM_CASH_REVENUES";
const UPDATE_SUM_CASH_EXPENSES = "UPDATE_SUM_CASH_EXPENSES";
const UPDATE_INCOME = "UPDATE_INCOME";


export default {
  namespaced: true,
  state: () => ({
    folders: [],
    media: {},
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
    SET_FOLDERS(state, payload) {
      state.folders = payload
    },

    SET_finance(state, finance) {
      state.finance = finance
    },
  },

  actions: {

    setAction({ dispatch, commit }, payload) {
      commit(UPDATE_ACTION, payload);
      // sumCashRevenues
      dispatch("updateSumCash")
    },

    updateSumCash({ commit, state }) {
      let sumCashRevenues = 0;
      for (let i = 0; i < state.revenues.length; i++) {
        sumCashRevenues += Number(state.revenues[i].cash);
      }
      commit(UPDATE_SUM_CASH_REVENUES, sumCashRevenues);

      // sumCashExpenses
      let sumCashExpenses = 0;
      for (let i = 0; i < state.expenses.length; i++) {
        sumCashExpenses += Number(state.expenses[i].cash);
      }
      commit(UPDATE_SUM_CASH_EXPENSES, sumCashExpenses);
      commit(UPDATE_INCOME, { sumCashRevenues, sumCashExpenses });
    },


    async fetchFolders({ commit }, payload) {
      console.log(`store`);
      try {
        const res = await this.$repositories.adminFolders.fetchFolders()
        commit('SET_FOLDERS', res.data.folders)
      } catch (error) { }
    },
    async createFolder({ commit }, payload) {
      console.log(`store`);
      try {
        return await this.$repositories.adminFolders.createFolder(payload)
      } catch (error) { }
    },
    async deleteMedia({ commit, state }, id) {
      try {
        return await this.$repositories.adminMedias.deleteMedia(id)
      } catch (error) { }
    }


  },
}

