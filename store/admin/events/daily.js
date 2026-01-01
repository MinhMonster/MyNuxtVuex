import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryVotedDailyEvents: queryVotedDailyEvents,
      },
      queryVotedDailyEvents: queryVotedDailyEvents,
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

const queryVotedDailyEvents = _.cloneDeep({
  response: {
    meta: defaultPagy,
    data: [],
    count: 0,
    sum_value: 0
  },
  page: {
    type: "text",
    show: false,
    value: 1
  },
  perPage: {
    type: "text",
    show: false,
    value: 15
  },
  voted: {
    placeholder: "Voted",
    type: "text",
    show: true,
    value: ''
  },
  uid: {
    placeholder: "UID",
    type: "text",
    show: true,
    value: ''
  },
  name: {
    placeholder: "User Name",
    type: "text",
    show: true,
    value: ''
  },
  phone: {
    placeholder: "Phone",
    type: "text",
    show: true,
    value: ''
  },
});
