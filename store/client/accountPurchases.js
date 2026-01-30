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
      key: "account_type",
      label: "Game",
      class: "min-w-100px text-center",
      type: "game-name"
    },
    {
      key: "account_code",
      label: "Mã số",
      type: "number",
      class: "min-w-100px text-center",
    },
    {
      key: "selling_price",
      label: "Giá bán",
      type: "number",
      class: "min-w-100px text-center",
    },
    {
      key: "purchased_at",
      label: "Thời gian",
      class: "min-w-100px text-center",
    },
        {
      key: "actions",
      label: "Chi tiết",
      fixed: "right",
      class: "w-80px text-center",
    },
  ]);


