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
    formAccountSold: formAccountSold,
    formAccountPrice: formAccountPrice


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
    sum_value: 0,
    cost_value: 0,
    profit_value: 0,
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
  type: {
    title: "Game",
    placeholder: "Game",
    type: "select-options",
    show: true,
    value: null,
    options: [
      {
        text: "Tất cả",
        value: null,
      },
      {
        text: "Ninja",
        value: "ninja",
      },
      {
        text: "Avatar",
        value: "avatar",
      },
      {
        text: "NRO",
        value: "ngocrong",
      },
    ],
  },
  taikhoan: {
    title: "Account Name",
    placeholder: "Account Name",
    type: "text",
    show: true,
    value: ''
  },
  idnick: {
    title: "ID Account",
    placeholder: "ID Account",
    type: "text",
    show: true,
    value: ''
  },

  uid: {
    title: "UID",
    placeholder: "UID",
    type: "text",
    show: true,
    value: ''
  },
  from_time: {
    title: "From Time",
    placeholder: "From Time",
    type: "date",
    show: true,
    value: ''
  },
  to_time: {
    title: "To Time",
    placeholder: "To Time",
    type: "date",
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

const formAccountPrice =
  _.cloneDeep([
    {
      title: "Price",
      type: "cash",
      value: 'giatien',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Cost",
      type: "cash",
      value: 'gianhap',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
  ]);

