import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        formItem: formItem,
        queryItem: queryItem
      },
      formItem: formItem,
      queryItem: queryItem,
      repositories: "repositories_mms",

    }
  },

  getters: {
    getField,
  },
  mutations: {
    updateField,
  },

  actions: {
  },
});


const queryItem = _.cloneDeep({
  data: "",
});


const formItem =
  _.cloneDeep([
    {
      title: "",
      type: "content-editer",
      value: 'notification',
      cols: 12,
      md: 12,
    },
  ]);
