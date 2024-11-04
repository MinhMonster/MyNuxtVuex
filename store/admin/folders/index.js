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
      try {
        console.log("payload", payload);
        let folders = [];
        if (payload.includes('mimifood')) {
          const res = await this.$repositories_mimifood.mimiFoodFolders.adminFetchFolders()
          folders = res.data.response.data;
        } else {
          const res = await this.$repositories.adminFolders.fetchFolders();
          folders = res.data.folders;
        }

        commit('SET_FOLDERS', folders)
      } catch (error) { }
    },
    async createFolder({ commit }, payload) {
      try {
        if (payload.route_path.includes('mimifood')) {
          return await this.$repositories_mimifood.mimiFoodFolders.adminCreateFolder({
            name: payload.name,
            parent_id: payload.parent_id

          })
        } else {
          return await this.$repositories.adminFolders.createFolder(payload)
        }

      } catch (error) { }
    },
    async editNameFolder({ commit }, payload) {
      try {
        if (payload.route_path.includes('mimifood')) {
          return await this.$repositories_mimifood.mimiFoodFolders.adminUpdateFolder({
            name: payload.name,
            id: payload.folder.id
          })
        } else {
          return await this.$repositories.adminFolders.editNameFolder(payload)
        }
      } catch (error) { }
    },

    async deleteMedia({ commit, state }, id) {
      try {
        return await this.$repositories.adminMedias.deleteMedia(id)
      } catch (error) { }
    }


  },
}

