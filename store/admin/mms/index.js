import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        querymmss: querymmss,
      },
      querymmss: querymmss,
      repositories: "repositories_mms"
    }

  },

  mutations: {
    updateField,
  },
  getters: {
    getField,
  },
  actions: {}

});



const querymmss = _.cloneDeep({
  response: {
    meta: defaultPagy,
    data: [
      {
        name: "Products",
        link: "products"
      }
    ],
  },
});
