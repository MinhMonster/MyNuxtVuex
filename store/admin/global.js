import { getField, updateField } from "vuex-map-fields";
const SET_VALIDATION_ERRORS = "SET_VALIDATION_ERRORS";
export default {
  namespaced: true,
  state: () => ({
    validationErrors: {},
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
  },
  mutations: {
    updateField,
    SET_VALIDATION_ERRORS(state, payload) {
      state.validationErrors = _.cloneDeep(payload);
    },
  },
};
