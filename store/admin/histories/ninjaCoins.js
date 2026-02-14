import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      columns: columns,
      repositories: "repositories_mms",
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
  id_nap: {
    // title: "ID",
    placeholder: "ID User",
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
        text: "Warning",
        value: "0",
      },
      {
        text: "Success",
        value: "1",
      },
      {
        text: "Failed",
        value: "2",
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
      fixed: "left",
      attributes: {
        style: {
          minWidth: "50px",
          textAlign: "center !important",
        },
      },
    },
    {
      key: "status",
      label: "Status",
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
      key: "price",
      label: "Price",
      type: "number",
      attributes: {
        align: "center",
        style: {
          minWidth: "50px",
        },
      },
    },
    {
      key: "coin",
      label: "Coin",
      type: "number",
      attributes: {
        style: {
          minWidth: "80px",
          textAlign: "center !important",
        },
      },
    },
    {
      key: "character_name",
      label: "In Game",
      attributes: {
        style: {
          minWidth: "100px",
        },
      },
    },
    {
      key: "server",
      label: "Server",
      attributes: {
        align: "center",
        style: {
          minWidth: "50px",
        },
      },
    },
    {
      key: "user",
      label: "User",
      attributes: {
        style: {
          minWidth: "150px",
        },
      },
    },

    {
      key: "created_at",
      label: "Time",
      attributes: {
        style: {
          minWidth: "150px",
          textAlign: "center !important",
        },
      },
    },
    {
      key: "actions",
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
