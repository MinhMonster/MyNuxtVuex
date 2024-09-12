import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state: () => ({
    stateDefault: {
      queryGameAccountSolds: queryGameAccountSolds,
      queryGameAccountSold: queryGameAccountSold,
    },
    queryGameAccountSolds: queryGameAccountSolds,
    queryGameAccountSold: queryGameAccountSold,
    formAccountSold: formAccountSold

  }),

  getters: {
    getField,
  },

  mutations: {
    updateField,
  },

  actions: {
  },
});


const queryGameAccountSolds = _.cloneDeep({
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
  taikhoan: {
    placeholder: "Account",
    type: "text",
    show: true,
    value: ''
  },
  idnick: {
    placeholder: "ID Account",
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
});

const queryGameAccountSold = _.cloneDeep({

  ID: "",
  taikhoan: "",
  matkhau: "",
  mapin: "",
});



const formAccountSold =
  _.cloneDeep([
    {
      title: "Tài Khoản",
      type: "text",
      value: 'taikhoan',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Mật Khẩu",
      type: "text",
      value: 'matkhau',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Mã Pin",
      type: "text",
      value: 'mapin',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
  ]);
