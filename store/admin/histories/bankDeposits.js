import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

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
  user_id: {
    // title: "ID",
    placeholder: "User ID",
    type: "text",
    show: true,
    value: ''
  },
  status: {
    placeholder: "Status",
    type: "select-options",
    show: true,
    value: null,
    options: [
      {
        text: "All",
        value: null,
      },
      {
        text: "Pending",
        value: "pending",
      },
      {
        text: "Success",
        value: "success",
      },
      {
        text: "Failed",
        value: "failed",
      },
    ],
  },
});

const queryItem = _.cloneDeep({

  id: "",
  username: "",
  dat: "",
  ga: "",
  ca: "",
  mcs: "",
  thongtin: "",
  giatien: "",
  gianhap: "",
  sim: "",
  hinhanh: [],
  full: "0"
});

const columns =
  _.cloneDeep([
    {
      key: "id",
      label: "ID",
      type: "number",
      attributes: {
        style: {
          minWidth: "50px",
        },
      },
    },
    {
      key: "actions",
      label: "Actions",
      type: "actions",
      attributes: {
        style: {
          minWidth: "80px",
        },
      },
    },
    {
      key: "amount",
      label: "Amount",
      type: "number",
      attributes: {
        style: {
          minWidth: "100px",
        },
      },
    },
    {
      key: "user",
      label: "User",
      attributes: {
        style: {
          minWidth: "100px",
        },
      },
    },
    {
      key: "transaction_at",
      label: "Time",
      attributes: {
        style: {
          minWidth: "100px",
        },
      },
    },
  ]);
