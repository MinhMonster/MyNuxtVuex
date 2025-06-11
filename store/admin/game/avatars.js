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
        value: "1",
      },
      {
        text: "Nữ",
        value: "2",
      },
      {
        text: "Bê đê",
        value: "3",
      },
    ],
  },
  status: {
    placeholder: "Trạng Thái",
    type: "select-options",
    show: true,
    value: "active",
    options: [
      {
        text: "Tất cả",
        value: 'all',
      },
      {
        text: "Đang bán",
        value: "active",
      },
      {
        text: "Đã bán",
        value: "deleted",
      },
    ],
  },
});

const queryAvatar = _.cloneDeep({

  ID: "",
  username: "",
  land: "",
  pets: "",
  fish: "",
  sex: "",
  description: "",
  selling_price: "",
  purchase_price: "",
  discount_percent: "",
  images: [],
  is_full_image: "0",
});

const formAvatar =
  _.cloneDeep([
    {
      title: "ID",
      type: "number",
      value: 'id'
    },
    {
      title: "Tài khoản",
      type: "text",
      value: 'username'
    },
    {
      title: "Giá Bán",
      type: "cash",
      value: 'selling_price'
    },
    {
      title: "Giá Nhập",
      type: "cash",
      value: 'purchase_price'
    },
    {
      title: "Discount",
      type: "number",
      value: 'discount_percent'
    },
    {
      title: "Đất",
      type: "number",
      value: 'land'
    },
    {
      title: "Gà",
      type: "number",
      value: 'pets'
    },
    {
      title: "Cá",
      type: "number",
      value: 'fish'
    },
    {
      title: "Giới tính",
      type: "select-options",
      options: sexAvatarOptions,
      value: 'sex'
    },
    // {
    //   title: "Trạng Thái",
    //   type: "select-options",
    //   options: statusOptions,
    //   value: 'status',
    // },
    {
      title: "Thông tin",
      type: "content-editer",
      value: 'description',
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
      title: "Giá Bán (Card)",
      type: "cash",
      value: 'selling_price',
      cols: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Giá Bán (Vnđ)",
      type: "cash_sale_off",
      value: 'selling_price',
      cols: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Giá Nhập (Vnđ)",
      type: "cash",
      value: 'purchase_price',
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

