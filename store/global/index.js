import { getField, updateField } from "vuex-map-fields";
const SET_STATE = "SET_STATE";

export default {
  namespaced: true,
  state: () => ({
    ready: false,
    validationErrors: {},
    selectedImages: [],
    screenMobile: true,
    oldPath: "/",
    nowPath: "/",
  }),
  getters: {
    getField,

  },
  actions: {
    setScreenMobile({ commit }, payload) {
      commit(SET_STATE, { screenMobile: payload });
    },
    setSelectedImages({ commit }, payload) {
      commit("SET_SELECTED_IMAGES", payload)
    },
    setPath({ commit, state }, path) {
      commit(SET_STATE, { oldPath: state.nowPath || "/" });
      commit(SET_STATE, { nowPath: path });
    },

    async fileUpload({ state, commit, dispatch }, payload) {
      try {
        const result = await this.$repositories.adminUploads.upload(payload)
        return result;
      } catch (err) {
      };
    },
    async fetchFiles({ commit }, payload) {
      return await this.$repositories.adminUploads.fetchFiles(
        payload
      );
    },
    async deleteFile({ commit }, payload) {
      return await this.$repositories.adminUploads.deleteFile(
        payload
      );
    },
  },
  mutations: {
    updateField,
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_SELECTED_IMAGES(state, payload) {
      state.selectedImages = payload;
    },
  },
};