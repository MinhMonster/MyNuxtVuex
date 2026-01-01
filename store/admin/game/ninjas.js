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
  id: "",
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
  yoroi: "",
  eye: "",
  book: "",
  cake: "",
  yen: "",
  clone: "",
  disguise: "",
  mounts: "",
});


const formNinja =
  _.cloneDeep([
    {
      title: "ID",
      type: "number",
      value: 'id'
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
      title: "Vũ Khí",
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
      type: "content-editer",
      value: 'description',
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
      value: 'yoroi'
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
      value: 'username',
      cols: 6,
      sm: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Nhân Vật",
      type: "text",
      value: 'character_name',
      cols: 6,
      sm: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Discount",
      type: "cash",
      value: 'discount_percent',
      cols: 6,
      sm: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Discount Active",
      type: "text",
      disabled: true,
      value: 'active_discount',
      cols: 6,
      sm: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Giá Bán (Vnd)",
      type: "cash",
      value: 'selling_price',
      cols: 6,
      sm: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Giá Sale (Vnđ)",
      type: "cash_sale_off",
      value: 'selling_price',
      cols: 6,
      sm: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Giá Nhập (Vnđ)",
      type: "cash",
      value: 'purchase_price',
      cols: 6,
      sm: 6,
      lg: 6,
      md: 6
    },
    {
      title: "Lợi Nhuận (Vnđ)",
      value: 'giatien',
      type: "profit",
      cols: 6,
      sm: 6,
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
