import { getField, updateField } from "vuex-map-fields";
const SET_STATE = "SET_STATE";

export default {
  namespaced: true,
  state: () => ({
    ready: false,
    isFilter: false,
    sidebarActive: true,
    customerDetailsActive: true,
    token: null,
    localesMaster: null,
    authErrorMessage: null,
    authErrorKey: null,
    authenticated: false,
    breadcrumb: {},
    validationErrors: {},
    prefectures: [],
    locale: null,
    localeTimestamp: null,
    accountName: null,
    orderCompletedStates: [],
    initState: null,
    agencyToken: null,
    account: {},
    accountUser: {},
    customerTags: [],
    accountTags: [],
    notifications: [],
    noticationUnreads: 0,
    isLoadingButton: false,
    notificaitonPage: 0,
    notificaitonPages: 1,
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
    // nextOldPath({state}) {
    //   window.location.href = state.oldPath || "/";
    // },

    async fileUpload({ state, commit, dispatch }, payload) {
      // return new Promise((resolve, reject) => {
      //   const config = {
      //     header: {
      //       "Content-Type": "multiple/form-data",
      //     },
      //     timeout: 300000,
      //   };
      console.log("fileUpload", payload);

      try {
        if (payload.route_path.includes('mimifood')) {
          return await this.$repositories_mimifood.mimiFoodFiles.uploads(payload)
        } else {
          return await this.$repositories.adminUploads.upload(payload)
        }
      } catch (err) {
      };
    },
    async fetchFiles({ commit }, payload) {
      if (payload.route_path.includes('mimifood')) {
        const res = await this.$repositories_mimifood.mimiFoodFiles.fetchFiles(
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
    async deleteFile({ commit }, payload) {
      if (payload.route_path.includes('mimifood')) {
        return await this.$repositories_mimifood.mimiFoodFiles.deleteFile(
          payload.file.id
        );
      } else {
        return await this.$repositories.adminUploads.deleteFile(
          payload.file
        );
      }

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
    SET_INIT_STATE(state, payload) {
      if (state.agencyToken) {
        state.initState = "completed";
      } else {
        state.initState = payload;
      }
    },
  },
};
