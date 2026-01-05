import { defaultPagy, typeNinjaOptions, classNinjaOptions, serverNinjaOptions } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryNinjas: queryNinjas,
        queryNinja: queryNinja
      },
      queryNinjas: queryNinjas,
      queryNinja: queryNinja,
      formNinja: formNinja,
      formModalNinja: formModalNinja
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

const queryNinjas = _.cloneDeep({
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
    // title: "Tài Khoản",
    placeholder: "Username",
    type: "text",
    show: true,
    value: ''
  },
  character_name: {
    // title: "Tài Khoản",
    placeholder: "In Game",
    type: "text",
    show: true,
    value: ''
  },
  status: {
    // title: "Tài Khoản",
    placeholder: "Trạng Thái",
    type: "select-options",
    show: true,
    value: "active",
    options: [
      {
        text: "All",
        value: 'all',
      },
      {
        text: "Active",
        value: "active",
      },
      {
        text: "Deleted",
        value: "deleted",
      },
    ],
  },
});

const queryNinja = _.cloneDeep({
  code: "",
  username: "",
  character_name: "",
  description: "",
  is_full_image: "0",
  images: [],
  selling_price: "",
  purchase_price: "",
  discount_percent: "",
  class: "",
  level: "",
  server: "",
  weapon: "",
  type: "",
  tl_1: "",
  tl_2: "",
  tl_3: "",
  tl_4: "",
  tl_5: "",
  tl_6: "",
  tl_7: "",
  tl_8: "",
  tl_9: "",
  tl_10: "",
  tl_11: "",
  tl_12: "",
  item_1: "",
  item_2: "",
  item_3: "",
  item_4: "",
  item_5: "",
  item_6: "",
  item_7: "",
  item_8: "",
  item_9: "",
  item_10: "",
  item_11: "",
  item_12: "",
  item_13: "",
});


const formNinja =
  _.cloneDeep([
    {
      title: "Mã Nick",
      type: "number",
      value: 'code'
    },
    {
      title: "Tài Khoản",
      type: "text",
      value: 'username'
    },
    {
      title: "Nhân Vật",
      type: "text",
      value: 'character_name'
    },
    {
      title: "Giá Bán (Vnd)",
      type: "cash",
      value: 'selling_price'
    },
    {
      title: "Giá Sale (Vnđ)",
      type: "cash_sale_off",
      value: 'selling_price',
    },
    {
      title: "Giá Nhập (Vnđ)",
      type: "cash",
      value: 'purchase_price'
    },
    {
      title: "Giảm Giá (%)",
      type: "number",
      value: 'discount_percent'
    },
    {
      title: "Loại Nick",
      type: "select-options",
      options: typeNinjaOptions,
      value: 'type'
    },
    {
      title: "Phái",
      type: "select-options",
      options: classNinjaOptions,
      value: 'class'
    },
    {
      title: "Máy chủ",
      type: "select-options",
      options: serverNinjaOptions,
      value: 'server'

    },
    {
      title: "Level",
      type: "number",
      value: 'level'
    },
    {
      title: "V.Khí",
      type: "number",
      value: 'weapon'
    },
    // {
    //   title: "Set Đồ",
    //   type: "text",
    //   value: 'do'
    // },
    {
      title: "Thông tin",
      type: "text",
      value: 'description',
      cols: 12,
      md: 12,
    },
    //row 1
    {
      title: "Item 7",
      type: "text",
      value: 'item_7',
      cols: 4,
      md: 3,
    },
    {
      title: "Nón",
      type: "number",
      value: 'tl_6',
      cols: 2,
      md: 2,
    },
    {
      title: "",
      type: "blank",
      cols: 0,
      md: 2,
    },
    {
      title: "V.Khí",
      type: "number",
      value: 'tl_1',
      cols: 2,
      md: 2,
    },
    {
      title: "Item 1",
      type: "text",
      value: 'item_1',
      cols: 4,
      md: 3,
    },

    // row 2
    {
      title: "Item 8",
      type: "text",
      value: 'item_8',
      cols: 4,
      md: 3,
    },
    {
      title: "Áo",
      type: "number",
      value: 'tl_7',
      cols: 2,
      md: 2,
    },
    {
      title: "",
      type: "blank",
      cols: 0,
      md: 2,
    },
    {
      title: "D.chuyền",
      type: "number",
      value: 'tl_2',
      cols: 2,
      md: 2,
    },
    {
      title: "Item 2",
      type: "text",
      value: 'item_2',
      cols: 4,
      md: 3,
    },
    // row 3
    {
      title: "Item 9",
      type: "text",
      value: 'item_9',
      cols: 4,
      md: 3,
    },
    {
      title: "Quần",
      type: "number",
      value: 'tl_9',
      cols: 2,
      md: 2,
    },
    {
      title: "",
      type: "blank",
      cols: 0,
      md: 2,
    },
    {
      title: "Nhẫn",
      type: "number",
      value: 'tl_3',
      cols: 2,
      md: 2,
    },
    {
      title: "Item 3",
      type: "text",
      value: 'item_3',
      cols: 4,
      md: 3,
    },
    //row 4
    {
      title: "Item 10",
      type: "text",
      value: 'item_10',
      cols: 4,
      md: 3,
    },
    {
      title: "Găng",
      type: "number",
      value: 'tl_8',
      cols: 2,
      md: 2,
    },
    {
      title: "",
      type: "blank",
      cols: 0,
      md: 2,
    },
    {
      title: "Bội",
      type: "number",
      value: 'tl_4',
      cols: 2,
      md: 2,
    },

    {
      title: "Item 4",
      type: "text",
      value: 'item_4',
      cols: 4,
      md: 3,
    },
    // row 5
    {
      title: "Item 11",
      type: "text",
      value: 'item_11',
      cols: 4,
      md: 3,
    },
    {
      title: "Giày",
      type: "number",
      value: 'tl_10',
      cols: 2,
      md: 2,
    },
    {
      title: "",
      type: "blank",
      cols: 0,

      md: 2,
    },
    {
      title: "Bùa",
      type: "number",
      value: 'tl_5',
      cols: 2,
      md: 2,
    },
    {
      title: "Item 5",
      type: "text",
      value: 'item_5',
      cols: 4,
      md: 3,
    },
    // row 6
    {
      title: "Item 12",
      type: "text",
      value: 'item_12',
      cols: 4,
      md: 3,
    },
    {
      title: "Yoroy",
      type: "number",
      value: 'tl_11',
      cols: 2,
      md: 2,
    },
    {
      title: "",
      type: "blank",
      cols: 0,
      md: 2,
    },
    {
      title: "Mắt",
      type: "number",
      value: 'tl_12',
      cols: 2,
      md: 2,
    },
    {
      title: "Item 6",
      type: "text",
      value: 'item_6',
      cols: 4,
      md: 3,
    },
    {
      title: "Thú cữoi",
      type: "text",
      value: 'item_13',
      cols: 12,
      md: 12,
    },
  ]);



const formModalNinja =
  _.cloneDeep([
    // {
    //   title: "ID",
    //   type: "number",
    //   value: 'ID',
    //   cols: 6,
    //    lg: 2,
    //   md: 4
    // },
    {
      title: "Tài Khoản",
      type: "text",
      value: 'username',
      md: 6
    },
    {
      title: "Nhân Vật",
      type: "text",
      value: 'character_name',
      md: 6
    },
    {
      title: "Discount",
      type: "cash",
      value: 'discount_percent',
      md: 6
    },
    {
      title: "Discount Active",
      type: "text",
      disabled: true,
      value: 'active_discount',
      md: 6
    },
    {
      title: "Giá Bán (Vnd)",
      type: "cash",
      value: 'selling_price',
      md: 6
    },
    {
      title: "Giá Sale (Vnđ)",
      type: "cash_sale_off",
      value: 'selling_price',
      md: 6
    },
    {
      title: "Giá Nhập (Vnđ)",
      type: "cash",
      value: 'purchase_price',
      md: 6
    },
    {
      title: "Lợi Nhuận (Vnđ)",
      value: 'giatien',
      type: "profit",
      md: 6
    },
    // {
    //   title: "Giảm Giá (%)",
    //   type: "number",
    //   value: 'sale_off',
    //   cols: 6,
    //    lg: 2,
    //   md: 4
    // },


  ]);
