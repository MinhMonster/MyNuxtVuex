import { defaultPagy, sexAvatarOptions, statusOptions } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryAvatars: queryAvatars,
        queryAvatar: queryAvatar,
      },
      queryAvatars: queryAvatars,
      queryAvatar: queryAvatar,
      formAvatar: formAvatar,
      formModalAvatar: formModalAvatar
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


const queryAvatars = _.cloneDeep({
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
  id: {
    // title: "ID",
    placeholder: "ID",
    type: "text",
    show: true,
    value: ''
  },
  username: {
    placeholder: "Tài Khoản",
    type: "text",
    show: true,
    value: ''
  },
  sex: {
    placeholder: "Giới tính",
    type: "select-options",
    show: true,
    value: null,
    options: [
      {
        text: "Giới tính",
        value: null,
      },
      {
        text: "Nam",
        value: "male",
      },
      {
        text: "Nữ",
        value: "female",
      },
      {
        text: "Bê đê",
        value: "gay",
      },
    ],
  },
  status: {
    placeholder: "Trạng Thái",
    type: "select-options",
    show: true,
    value: "yes",
    options: [
      {
        text: "Tất cả",
        value: null,
      },
      {
        text: "Đang bán",
        value: "yes",
      },
      {
        text: "Đã bán",
        value: "no",
      },
    ],
  },
});

const queryAvatar = _.cloneDeep({

  ID: "",
  username: "",
  dat: "",
  ga: "",
  ca: "",
  sex: "",
  mcs: "",
  thongtin: "",
  giatien: "",
  gianhap: "",
  sim: "",
  hinhanh: [],
  full: "0",
  status: 'yes'

});

const formAvatar =
  _.cloneDeep([
    {
      title: "ID",
      type: "number",
      value: 'ID'
    },
    {
      title: "Tài Khoản",
      type: "text",
      value: 'username'
    },
    {
      title: "Giá Bán",
      type: "cash",
      value: 'giatien'
    },
    {
      title: "Giá Nhập",
      type: "cash",
      value: 'gianhap'
    },
    {
      title: "Sim",
      type: "number",
      value: 'sim'
    },
    {
      title: "Đất",
      type: "number",
      value: 'dat'
    },
    {
      title: "Gà",
      type: "number",
      value: 'ga'
    },
    {
      title: "Cá",
      type: "number",
      value: 'ca'
    },
    {
      title: "Giới tính",
      type: "select-options",
      options: sexAvatarOptions,
      value: 'sex'
    },
    {
      title: "Trạng Thái",
      type: "select-options",
      options: statusOptions,
      value: 'status',
    },
    {
      title: "Thông tin",
      type: "content-editer",
      value: 'thongtin',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },

  ]);

const formModalAvatar =
  _.cloneDeep([
    {
      title: "Tài Khoản",
      type: "text",
      value: 'username',
      cols: 12,
      lg: 12,
      md: 12
    },

    {
      title: "Giá Bán (Vnd)",
      type: "cash",
      value: 'giatien',
      cols: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Giá Sale (Vnđ)",
      type: "cash_sale_off",
      value: 'giatien',
      cols: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Giá Nhập (Vnđ)",
      type: "cash",
      value: 'gianhap',
      cols: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Lợi Nhuận (Vnđ)",
      value: 'giatien',
      type: "profit",
      cols: 6,
      lg: 6,
      md: 6
    },
  ]);

