import { defaultPagy } from '@/utils/default'
import { cashOptions, classOptions, levelOptions, serverShortOptions, familyOptions } from "@/utils/queryNinjaOptions";
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
      queryPath: '/teamobi/ninja-school',
    }
  },

  getters: {
    getField,
    getInfoItems: (state, getters) => (account) => {
      if (!account) return []

      return [
        {
          label: "Mã số",
          value: getters.formatNumber(account.code),
        },
        {
          label: "Phái",
          value: getters.getOptionText(
            account.class,
            classOptions,
          ),
        },
        {
          label: "Máy chủ",
          value: getters.getOptionText(
            account.server,
            serverShortOptions,
          ),
        },
      ]
    },
    getTableInfos: (state, getters) => (account) => {
      if (!account) return []

      return [
        {
          label: "Phái",
          value: getters.getOptionText(
            account.class,
            classOptions,
          ),
        },
        {
          label: "Cấp độ",
          value: account.level,
        },
        {
          label: "Vũ khí",
          value: account.weapon,
        },

        {
          label: "Máy chủ",
          value: getters.getOptionText(
            account.server,
            serverShortOptions,
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
  type: {
    type: "text",
    show: false,
    value: ""
  },
  code: {
    title: "Mã",
    placeholder: "Mã số...",
    type: "text",
    show: true,
    value: ''
  },
  character_name: {
    title: "IG",
    placeholder: "Tên nhân vật...",
    type: "text",
    show: true,
    value: ''
  },
  cash: {
    placeholder: "Giá tiền",
    type: "select",
    options: cashOptions,
    show: true,
    value: null
  },
  level: {
    placeholder: "Cấp độ",
    type: "select",
    options: levelOptions,
    show: true,
    value: null
  },
  class: {
    placeholder: "Phái",
    type: "select",
    options: classOptions,
    show: true,
    value: null
  },
  server: {
    placeholder: "Máy chủ",
    type: "select",
    options: serverShortOptions,
    show: true,
    value: null
  },
  is_family: {
    placeholder: "Gia tộc",
    type: "select",
    options: familyOptions,
    show: true,
    value: null
  },
});

const queryItem = _.cloneDeep({
  code: "",
  username: "",
  selling_price: "",
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
