import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryBankDeposits: queryBankDeposits,
        queryBankDeposit: queryBankDeposit,
      },
      queryBankDeposits: queryBankDeposits,
      queryBankDeposit: queryBankDeposit,
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


const queryBankDeposits = _.cloneDeep({
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
  id_nap: {
    // title: "ID",
    placeholder: "ID User",
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
  status: {
    placeholder: "Status",
    type: "select-options",
    show: true,
    value: null,
    options: [
      {
        text: "All",
        value: null,
      },
      {
        text: "Warning",
        value: "0",
      },
      {
        text: "Success",
        value: "1",
      },
      {
        text: "Failed",
        value: "2",
      },
    ],
  },
});

const queryBankDeposit = _.cloneDeep({

  id: "",
  username: "",
  dat: "",
  ga: "",
  ca: "",
  mcs: "",
  thongtin: "",
  giatien: "",
  gianhap: "",
  sim: "",
  hinhanh: [],
  full: "0"

});
