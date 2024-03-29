import { getField, updateField } from "vuex-map-fields";
const SET_STATE = "SET_STATE";
const SET_VALIDATION_ERRORS = "SET_VALIDATION_ERRORS";

export default {
  namespaced: true,
  state: () => ({
    isLoadingSearch: false,
    validationErrors: {},
    selectedImages: [],
    screenMobile: true,
    isNotification: true,
    isThemeDark: true,
    showMenuRight: false,
    fixed: false,
    isMb: true,
    is_tablet: false,
    heightHomeRight: 810,
    showLoginRegister: false,
    isFormLoginRegister: 'login',
  }),
  getters: {
    getField,
    getErrors: (state) => (name) => {
      return _.get(state.validationErrors, name, []);
    },
  },
  actions: {
    openModalLogin({ commit }) {
      commit(SET_STATE, { showLoginRegister: true, isFormLoginRegister: 'login', });
    },
    setValidationErrors({ commit }, payload) {
      commit(SET_VALIDATION_ERRORS, payload);
    },

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