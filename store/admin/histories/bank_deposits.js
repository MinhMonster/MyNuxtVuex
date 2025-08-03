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
  user_id: {
    // title: "ID",
    placeholder: "User ID",
    type: "text",
    show: true,
    value: ''
  },
  // uid: {
  //   placeholder: "UID",
  //   type: "text",
  //   show: true,
  //   value: ''
  // },
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
        text: "Pending",
        value: "pending",
      },
      {
        text: "Success",
        value: "success",
      },
      {
        text: "Failed",
        value: "failed",
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
