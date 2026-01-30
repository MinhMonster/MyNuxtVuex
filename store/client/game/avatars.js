import { defaultPagy } from '@/utils/default'
import { cashOptions, sexOptions, farmOptions, clanOptions } from "@/utils/queryAvatarOptions";
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
      queryPath: '/teamobi/avatar',
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
          label: "Đất",
          value: account.land,
        },
        {
          label: "Gà",
          value: account.pets,
        },
        {
          label: "Cá",
          value: account.fish,
        },
      ]
    },
    getTableInfos: (state, getters) => (account) => {
      if (!account) return []

      return [
        {
          label: "Đất",
          value: account.land,
        },
        {
          label: "Gà",
          value: account.pets,
        },
        {
          label: "Cá",
          value: account.fish,
        },
        {
          label: "Giới tính",
          value: getters.getOptionText(
            account.sex,
            sexOptions,
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
    title: "Mã",
    placeholder: "Mã số...",
    type: "text",
    show: true,
    value: ''
  },
  username: {
    title: "ID",
    placeholder: "Nhập ID...",
    type: "text",
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
  land: {
    placeholder: "Số ô đất",
    type: "select",
    options: farmOptions,
    show: true,
    value: ""
  },
  sex: {
    placeholder: "Giới tính",
    type: "select",
    options: sexOptions,
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
