import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryMimiFoods: queryMimiFoods,
      },
      queryMimiFoods: queryMimiFoods,
      repositories: "repositories_mimifood"
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



const queryMimiFoods = _.cloneDeep({
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
