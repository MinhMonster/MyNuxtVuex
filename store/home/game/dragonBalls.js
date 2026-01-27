// import { defaultPagy, typeOptions, statusOptions, planetNroOptions, serverNroOptions } from '@/utils/admin/default'
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
    meta: {},
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
    placeholder: "Mã",
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
  selling_price: "",
  purchase_price: "",
  discount_percent: "",
  strength: "",
  disciple: "",
  planet: "",
  server: "",
  type: "",
  description: "",
  images: [],
  is_full_image: "0",
});

const formItem =
  _.cloneDeep([
    {
      title: "Mã",
      type: "cash",
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
      title: "Loại Nick",
      type: "select-options",
      options: [],
      value: 'type'
    },
    {
      title: "Hành tinh",
      type: "select-options",
      options: [],
      value: 'planet'
    },
    {
      title: "Máy chủ",
      type: "select-options",
      options: [],
      value: 'server'

    },
    {
      title: "Sức mạnh",
      type: "cash",
      value: 'strength'
    },
    {
      title: "Đệ tử",
      type: "cash",
      value: 'disciple'
    },
    {
      title: "Mô tả",
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
      md: 6
    },
    {
      title: "Mã",
      type: "cash",
      value: 'code',
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
      key: "planet",
      label: "Hành tinh",
      type: "text",
      attributes: {
        style: {
          minWidth: "70px",
        },
      },
    },
    {
      key: "server",
      label: "Máy chủ",
      type: "text",
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


