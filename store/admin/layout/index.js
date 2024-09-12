import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state() {
    return {
      showMenuLeft: false,
      showMenuRight: false,
      checkedEdit: false,
      checkedMove: false,
      fixed: false,
    }

  },
  getters: {
    getField,

  },
  actions: {
  },
  mutations: {
    updateField,
  },
};