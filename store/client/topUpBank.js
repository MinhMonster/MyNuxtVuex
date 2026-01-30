import { defaultPagy } from '@/utils/default'
import { enableResetStore } from '@/utils/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryItems: queryItems,
        queryItem: queryItem,
      },
      columns: columns,
      queryItems: queryItems,
      queryItem: queryItem,
    }
  },

  getters: {
    getField,
    getTableInfos: (state, getters) => (item) => {
      if (!item) return []

      return [
        {
          label: "Mã Nạp",
          value: item.id,
        },
        {
          label: "Số tiền",
          value: item.amount,
          type: "number"
        },
        {
          label: "Thời gian",
          value: item.created_at,
        },
        {
          label: "Trạng thái",
          value: item.status,
          type: "status",
          class: "flex flex-center"
        },
      ]
    },
  },

  mutations: {
    updateField,
  },

  actions: {},
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
    value: 10
  },
});

const queryItem = _.cloneDeep({
  id: "",
  amount: "",
  created_at: "",
  status: "",

});

const columns =
  _.cloneDeep([
    {
      key: "id",
      label: "Mã Nạp",
      type: "number",
      class: "min-w-60px text-center",
    },
    {
      key: "amount",
      label: "Số tiền",
      class: "min-w-100px text-center",
      type: "number",
    },
    {
      key: "status",
      label: "Trạng thái",
      class: "min-w-60px text-center",
    },
    {
      key: "transaction_at",
      label: "Time",
      class: "min-w-100px text-center",
    },

    {
      key: "actions",
      label: "Chi tiết",
      fixed: "right",
      class: "w-80px text-center",
    },
  ]);


