import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state: () => ({
    stateDefault: {
      queryItems: queryItems,
    },
    columns: columns,
    repositories: "repositories_mms",
    queryItems: queryItems,
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
});

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
      key: "fileName",
      label: "View",
      type: "text",
      attributes: {
        style: {
          width: "100px",
        },
      },
    },
    {
      key: "disk",
      label: "Root",
      attributes: {
        style: {
          width: "170px",
        },
      },
    },
    {
      key: "byteSize",
      label: "Size",
      type: "number",
      attributes: {
        style: {
          width: "150px",
        },
      },
    },
    {
      key: "url",
      label: "Url",
      copy: true,
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
        align: "center",
        style: {
          width: "30px",
        },
      },
    },
  ]);

