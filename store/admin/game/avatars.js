import { defaultPagy, sexAvatarOptions, statusOptions } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
export default enableResetStore({
  namespaced: true,
  state() {
    return {
      repositories: "repositories_mms",
      columns: columns,
      stateDefault: {
        queryItems: queryItems,
        queryItem: queryItem,
      },
      queryItems: queryItems,
      queryItem: queryItem,
      formItem: formItem,
      formItemModal: formItemModal
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


const queryItems = _.cloneDeep({
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
    placeholder: "ID",
    type: "text",
    show: true,
    value: ''
  },
  code: {
    placeholder: "code",
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

const queryItem = _.cloneDeep({

  code: "",
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

const formItem =
  _.cloneDeep([
    {
      title: "code",
      type: "number",
      value: 'code'
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
      md: 12,
    },

  ]);

const formItemModal =
  _.cloneDeep([
    {
      title: "Tài Khoản",
      type: "text",
      value: 'username',
      cols: 12,
      md: 12
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
      value: 'selling_price',
      type: "profit",
      md: 6
    },
  ]);


const columns =
  _.cloneDeep([
    {
      key: "id",
      label: "ID",
      type: "number",
      fixed: "left",
      attributes: {
        align: "left",
        style: {
          minWidth: "80px",
        },
      },
    },
    {
      key: "code",
      label: "Mã",
      type: "number",
      fixed: "left",
      attributes: {
        style: {
          minWidth: "80px",
        },
      },
    },
    {
      key: "username",
      label: "Account",
      attributes: {
        style: {
          minWidth: "150px",
        },
      },
    },
    {
      key: "deleted_at",
      label: "Status",
      type: "deleted_at",
      attributes: {
        style: {
          minWidth: "50px",
        },
      },
    },
    {
      key: "land",
      label: "Đất",
      type: "number",
      attributes: {
        style: {
          minWidth: "70px",
        },
      },
    },
    {
      key: "pets",
      label: "Gà",
      type: "number",
      attributes: {
        style: {
          minWidth: "70px",
        },
      },
    },
    {
      key: "fish",
      label: "Cá",
      attributes: {
        style: {
          minWidth: "70px",
        },
      },
    },
    {
      key: "price",
      label: "Price",
      type: "number",
      attributes: {
        class: "text-right",
        style: {
          minWidth: "60px",
        },
      },
    },
    {
      key: "purchase_price",
      label: "Cost",
      type: "number",
      attributes: {
        // class: 'text-right',
        style: {
          minWidth: "60px",
        },
      },
    },
    {
      key: "profit",
      label: "Profit",
      type: "number",
      attributes: {
        class: "text-right",
        style: {
          minWidth: "50px",
        },
      },
    },
    {
      key: "actions",
      label: "Actions",
      type: "actions",
      fixed: "right",
      attributes: {
        align: "center",
        style: {
          maxWidth: "60px",
        },
      },
    },
  ]);

