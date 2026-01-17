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
      },
      queryItems: queryItems,
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
      key: "balance_before",
      label: "Before",
      type: "number",
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
      key: "balance_after",
      label: "After",
      type: "number",
      attributes: {
        style: {
          minWidth: "80px",
        },
      },
    },
    {
      key: "description",
      label: "Description",
      attributes: {
        style: {
          minWidth: "80px",
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
      key: "created_at",
      label: "Time",
      attributes: {
        style: {
          minWidth: "100px",
        },
      },
    },
  ]);
