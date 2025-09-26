import { defaultPagy, typeNinjaOptions, classNinjaOptions, serverNinjaOptions } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";

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
  taikhoan: {
    // title: "Tài Khoản",
    placeholder: "Tài Khoản",
    type: "text",
    show: true,
    value: ''
  },
  ingame: {
    // title: "Tài Khoản",
    placeholder: "Nhân Vật",
    type: "text",
    show: true,
    value: ''
  },
  status: {
    // title: "Tài Khoản",
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

const queryNinja = _.cloneDeep({
  ID: "",
  taikhoan: "",
  ingame: "",
  level: "",
  vukhi: "",
  mcs: "",
  thongtin: "",
  loainick: 1,
  class: 1,
  server: 1,
  giatien: "",
  gianhap: "",
  sale_off: "",
  sim: "",
  hinhanh: [],
  do: "",

  tl1: "",
  tl2: "",
  tl3: "",
  tl4: "",
  tl5: "",
  tl6: "",
  tl7: "",
  tl8: "",
  tl9: "",
  tl10: "",
  tl11: "",
  eye: "",
  clone: "",
  mounts: "",
  yen: "",
  book: "",
  cake: "",
  disguise: "",
});


const formNinja =
  _.cloneDeep([
    {
      title: "ID",
      type: "number",
      value: 'ID'
    },
    {
      title: "Tài Khoản",
      type: "text",
      value: 'taikhoan'
    },
    {
      title: "Nhân Vật",
      type: "text",
      value: 'ingame'
    },
    {
      title: "Giá Bán (Vnd)",
      type: "cash",
      value: 'giatien'
    },
    {
      title: "Giá Sale (Vnđ)",
      type: "cash_sale_off",
      value: 'giatien',
    },
    {
      title: "Giá Nhập (Vnđ)",
      type: "cash",
      value: 'gianhap'
    },
    {
      title: "Giảm Giá (%)",
      type: "number",
      value: 'sale_off'
    },
    {
      title: "Loại Nick",
      type: "select-options",
      options: typeNinjaOptions,
      value: 'loainick'
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
      title: "Vũ Khí",
      type: "number",
      value: 'vukhi'
    },
    // {
    //   title: "Set Đồ",
    //   type: "text",
    //   value: 'do'
    // },
    {
      title: "Thông tin",
      type: "text",
      value: 'thongtin',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Vũ Khí",
      type: "number",
      value: 'tl1'
    },
    {
      title: "Dây chuyền",
      type: "number",
      value: 'tl2'
    },
    {
      title: "Nhẫn",
      type: "number",
      value: 'tl3'
    },
    {
      title: "Bội",
      type: "number",
      value: 'tl4'
    },
    {
      title: "Bùa",
      type: "number",
      value: 'tl5'
    },
    {
      title: "Yoroy",
      type: "number",
      value: 'tl11'
    },
    {
      title: "Nón",
      type: "number",
      value: 'tl6'
    },
    {
      title: "Áo",
      type: "number",
      value: 'tl7'
    },
    {
      title: "Găng",
      type: "number",
      value: 'tl8'
    },
    {
      title: "Quần",
      type: "number",
      value: 'tl9'
    },
    {
      title: "Giày",
      type: "number",
      value: 'tl10'
    },
    {
      title: "Mắt",
      type: "number",
      value: 'eye'
    },
    {
      title: "Thú cữoi",
      type: "text",
      value: 'mounts',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Phân thân",
      type: "text",
      value: 'clone'
    },
    {
      title: "Cải trang",
      type: "text",
      value: 'disguise'
    },
    {
      title: "Cải trang 2",
      type: "text",
      value: 'disguise_2'
    },
    {
      title: "Pet",
      type: "text",
      value: 'pet'
    },
    {
      title: "Mặt nạ",
      type: "text",
      value: 'mask'
    },
        {
      title: "Gậy",
      type: "text",
      value: 'stick'
    },
    {
      title: "Yên",
      type: "text",
      value: 'yen'
    },
    {
      title: "Sách",
      type: "text",
      value: 'book'
    },
    {
      title: "Bánh",
      type: "text",
      value: 'cake'
    },
    {
      title: "Ngọc 1",
      type: "text",
      value: 'gem_1'
    },
     {
      title: "Ngọc 2",
      type: "text",
      value: 'gem_2'
    },
     {
      title: "Ngọc 3",
      type: "text",
      value: 'gem_3'
    },
    // {
    //   title: "Sim",
    //   type: "text",
    //   value: 'sim'
    // },
  ]);



const formModalNinja =
  _.cloneDeep([
    // {
    //   title: "ID",
    //   type: "number",
    //   value: 'ID',
    //   cols: 6,
    //   lg: 4,
    //   md: 4
    // },
    {
      title: "Tài Khoản",
      type: "text",
      value: 'taikhoan',
      cols: 6,
    lg: 6,
    md: 6
    },
    {
      title: "Nhân Vật",
      type: "text",
      value: 'ingame',
      cols: 6,
    lg: 6,
    md: 6
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
    // {
    //   title: "Giảm Giá (%)",
    //   type: "number",
    //   value: 'sale_off',
    //   cols: 6,
    //   lg: 4,
    //   md: 4
    // },


  ]);
