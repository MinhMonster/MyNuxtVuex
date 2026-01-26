import { defaultPagy } from '@/utils/default'
import { cashOptions, serverOptions, planetOptions } from "@/utils/queryDragonBallOptions";
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
      queryItems: queryItems,
      queryItem: queryItem,
      queryPath: '/teamobi/ngoc-rong',
    }
  },

  getters: {
    getField,
    getInfoItems: (state, getters) => (account) => {
      if (!account) return []

      return [
        {
          label: "Mã số",
          value: account.code,
        },
        {
          label: "Máy chủ",
          value: `${account.server} Sao`,
        },
        {
          label: "Hành tinh",
          value: getters.getOptionText(
            account.planet,
            planetOptions,
          ),
        },
      ]
    },
    getTableInfos: (state, getters) => (account) => {
      if (!account) return []

      return [
        {
          label: "Máy chủ",
          value: `${account.server} Sao`,
        },
        {
          label: "Hành tinh",
          value: getters.getOptionText(
            account.planet,
            planetOptions,
          ),
        },
        {
          label: "Mô tả",
          value: account.description,
          html: true,
        },
      ]
    },
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
    value: 24
  },
  code: {
    placeholder: "Mã số",
    type: "text",
    show: true,
    value: ''
  },
  server: {
    placeholder: "Máy chủ",
    type: "select",
    options: serverOptions,
    show: true,
    value: ''
  },
  planet: {
    placeholder: "Hành tinh",
    type: "select",
    options: planetOptions,
    show: true,
    value: ''
  },
  cash: {
    placeholder: "Giá tiền",
    type: "select",
    options: cashOptions,
    show: true,
    value: ""
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
