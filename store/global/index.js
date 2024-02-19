import { getField, updateField } from "vuex-map-fields";
const SET_STATE = "SET_STATE";
const SET_VALIDATION_ERRORS = "SET_VALIDATION_ERRORS";

export default {
  namespaced: true,
  state: () => ({
    ready: false,
    validationErrors: {},
    selectedImages: [],
    screenMobile: true,
    oldPath: "/",
    nowPath: "/",
    isNotification: true,
    isThemeDark: true,
    showMenuRight: false,
    fixed: false,
    isMb: true,
    heightHomeRight: 810
  }),
  getters: {
    getField,
    getErrors: (state) => (name) => {
      return _.get(state.validationErrors, name, []);
    },

    hasErrors: (state) => (name) => {
      const errors = _.get(state.validationErrors, name, []);
      return !!(errors && (errors.length || Object.keys(errors).length));
    },
  },
  actions: {
    setValidationErrors({ commit }, payload) {
      commit(SET_VALIDATION_ERRORS, payload);
    },
    setScreenMobile({ commit }, payload) {
      commit(SET_STATE, { screenMobile: payload });
    },
    // setSelectedImages({ commit }, payload) {
    //   commit("SET_SELECTED_IMAGES", payload)
    // },
    // setPath({ commit, state }, path) {
    //   commit(SET_STATE, { oldPath: state.nowPath || "/" });
    //   commit(SET_STATE, { nowPath: path });
    // },

    // async fileUpload({ state, commit, dispatch }, payload) {
    //   try {
    //     const result = await this.$repositories.adminUploads.upload(payload)
    //     return result;
    //   } catch (err) {
    //   };
    // },
    // async fetchFiles({ commit }, payload) {
    //   return await this.$repositories.adminUploads.fetchFiles(
    //     payload
    //   );
    // },
    // async deleteFile({ commit }, payload) {
    //   return await this.$repositories.adminUploads.deleteFile(
    //     payload
    //   );
    // },
    // setThemeDark({ commit, dispatch }) {
    //   const isThemeDark = state.isThemeDark;
    //   commit(SET_STATE, { isThemeDark: !isThemeDark });
    // },
    // save isNotification in 2h
    setNotification({ commit, dispatch }, payload) {
      const expiresDate = new Date();
      expiresDate.setHours(expiresDate.getHours() + 2);
      if (payload) {
        window.localStorage.removeItem('isNotification');
      } else {
        window.localStorage.setItem('isNotification', expiresDate.getTime());
      }
      dispatch("getNotification");
    },
    getNotification({ commit }) {
      const isNotification = window.localStorage.getItem('isNotification');
      const expiresDate = new Date();
      if (isNotification && expiresDate.getTime() < isNotification) {
        commit(SET_STATE, { isNotification: false });
      } else {
        commit(SET_STATE, { isNotification: true });
      }
    }
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
    SET_VALIDATION_ERRORS(state, payload) {
      state.validationErrors = _.cloneDeep(payload);
    },
  },
};