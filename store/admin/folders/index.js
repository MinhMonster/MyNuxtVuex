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
    isUploadMms: false,
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


    async fetchFolders({ state, commit }) {
      try {
        let folders = [];
        if (state.isUploadMms) {
          const res = await this.$repositories_mms.mmsFolders.adminFetchFolders()
          folders = res.data.response.data;
        } else {
          const res = await this.$repositories.adminFolders.fetchFolders();
          folders = res.data.folders;
        }

        commit('SET_FOLDERS', folders)
      } catch (error) { }
    },
    async createFolder({ state }, payload) {
      try {
        if (state.isUploadMms) {
          return await this.$repositories_mms.mmsFolders.adminCreateFolder({
            name: payload.name,
            parent_id: payload.parent_id

          })
        } else {
          return await this.$repositories.adminFolders.createFolder(payload)
        }

      } catch (error) { }
    },
    async editNameFolder({ state }, payload) {
      try {
        if (state.isUploadMms) {
          return await this.$repositories_mms.mmsFolders.adminUpdateFolder({
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
    },
    async fileUpload({ state }, payload) {
      try {
        if (state.isUploadMms) {
          return await this.$repositories_mms.mmsFiles.uploads(payload)
        } else {
          return await this.$repositories.adminUploads.upload(payload)
        }
      } catch (err) {
      };
    },
    async fetchFiles({ state }, payload) {
      if (state.isUploadMms) {
        const res = await this.$repositories_mms.mmsFiles.fetchFiles(
          payload
        );
        return res.data.response.data;
      } else {
        const res = await this.$repositories.adminUploads.fetchFiles(
          payload.folder
        );
        return res.data.files;
      }
    },
    async deleteFile({ state }, payload) {
      if (state.isUploadMms) {
        return await this.$repositories_mms.mmsFiles.deleteFile(
          payload.file.id
        );
      } else {
        return await this.$repositories.adminUploads.deleteFile(
          payload.file
        );
      }
    },

  },
}

