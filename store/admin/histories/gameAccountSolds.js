import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state: () => ({
    stateDefault: {
      queryGameAccountSolds: queryGameAccountSolds,
      queryGameAccountSold: queryGameAccountSold,
      queryPriceGameAccountSold: queryPriceGameAccountSold
    },
    columns: columns,
    repositories: "repositories_mms",
    queryGameAccountSolds: queryGameAccountSolds,
    queryGameAccountSold: queryGameAccountSold,
    queryPriceGameAccountSold: queryPriceGameAccountSold,
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
    placeholder: "Account Name",
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
  from_time: {
    placeholder: "From Time",
    type: "date",
    show: true,
    value: ''
  },
  to_time: {
    placeholder: "To Time",
    type: "date",
    show: true,
    value: ''
  },
});

const queryGameAccountSold = _.cloneDeep({
  id: "",
  username: "",
  password: "",
  transfer_pin: "",
});

const queryPriceGameAccountSold = _.cloneDeep({
  purchase_price: "",
  selling_price: "",
  note: "",
  images: [],
});

const formAccountSold =
  _.cloneDeep([
    {
      title: "Tài Khoản",
      type: "text",
      value: 'username',
      cols: 12,
      md: 12,
    },
    {
      title: "Mật Khẩu",
      type: "text",
      value: 'password',
      cols: 12,
      md: 12,
    },
    {
      title: "Mã Pin",
      type: "text",
      value: 'transfer_pin',
      cols: 12,
      md: 12,
    },
  ]);

const formAccountPrice =
  _.cloneDeep([
    {
      title: "Price",
      type: "cash",
      value: 'purchase_price',
      md: 6,
    },
    {
      title: "Cost",
      type: "cash",
      value: 'selling_price',
      md: 6,
    },
    {
      title: "Note",
      type: "content-editer",
      value: 'note',
      cols: 12,
      md: 12,
    },
    {
      title: "Images",
      type: "images",
      value: 'images',
      cols: 12,
      md: 12,
    },
  ]);

const columns =
  _.cloneDeep([
    {
      key: "id",
      label: "ID",
      attributes: {
        style: {
          width: "50px",
        },
      },
    },
    {
      key: "account_code",
      label: "Code",
      type: "number",
      copy: true,
      attributes: {
        style: {
          minWidth: "100px",
        },
      },
    },
    {
      key: "account.username",
      label: "Account",
      copy: true,
      attributes: {
        style: {
          minWidth: "170px",
        },
      },
    },
    {
      key: "selling_price",
      label: "Price",
      type: "number",
      attributes: {
        style: {
          width: "100px",
        },
      },
    },
    {
      key: "purchase_price",
      label: "Cost",
      type: "number",
      attributes: {
        style: {
          width: "100px",
        },
      },
    },
    {
      key: "account_type",
      label: "Game",
      attributes: {
        style: {
          minWidth: "150px",
        },
      },
    },
    {
      key: "user.name",
      label: "User",
      attributes: {
        style: {
          minWidth: "150px",
        },
      },
    },
    {
      key: "purchased_at",
      label: "Time",
      attributes: {
        style: {
          minWidth: "150px",
        },
      },
    },
    {
      key: "action",
      label: "Actions",
      type: "actions",
      fixed: "right",
      attributes: {
        style: {
          minWidth: "30px",
        },
      },
    },
  ]);

