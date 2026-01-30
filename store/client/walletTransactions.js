import { defaultPagy } from '@/utils/default'
import { enableResetStore } from '@/utils/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryItems: queryItems,
      },
      columns: columns,
      queryItems: queryItems,
    }
  },

  getters: {
    getField,
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
      label: "Mã GD",
      type: "number",
      class: "min-w-60px text-center",
    },
    {
      key: "description",
      label: "Mô tả",
      class: "min-w-150px",
    },
    {
      key: "balance_before",
      label: "Số dư trước",
      type: "number",
      class: "min-w-100px text-center",
    },
    {
      key: "amount",
      label: "Số tiền",
      type: "number",
      class: "min-w-100px text-center",
    },
    {
      key: "balance_after",
      label: "Số dư sau",
      type: "number",
      class: "min-w-100px text-center",
    },
    {
      key: "created_at",
      label: "Thời gian",
      class: "w-180px min-w-180px text-center",
    },
  ]);


