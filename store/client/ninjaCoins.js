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
      ninjaCoinPrices: []
    }
  },

  getters: {
    getField,
    getInfoItems: (state, getters) => (account) => {
      if (!account) return []

      return [
        {
          label: "Mã GD",
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
    getTableInfos: (state, getters) => (item) => {
      if (!item) return []

      return [
        {
          label: "Mã GD",
          value: item.id,
        },
        {
          label: "Tên nhân vật",
          value: item.character_name,
        },
        {
          label: "Máy chủ",
          value: item.server,
        },
        {
          label: "Số tiền",
          value: item.amount,
          type: "number"
        },
        {
          label: "Giá",
          value: "x " + item.price,
        },
        {
          label: "Số Xu",
          value: item.coin,
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

  actions: {
    async fetchXuNinjaPrices({ commit, state }) {
      try {
        const res = await this.$repositories.clientNinjaCoins.fetchXuNinjaPrices({
          input: state.query
        });
        commit("SET_STATE", {
          stateName: "ninjaCoinPrices",
          data: res.data.response.data || [],
        })

      } catch (error) { }
    },
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

const columns =
  _.cloneDeep([
    {
      key: "id",
      label: "Mã GD",
      type: "number",
      attributes: {
        align: "center",
        style: {
          textAlign: "center",
          minWidth: "50px",
        },
      },
    },
    {
      key: "amount",
      label: "Số tiền",
      type: "number",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "80px",
        },
      },
    },
    {
      key: "server",
      label: "Máy chủ",
      type: "text",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "70px",
        },
      },
    },
    {
      key: "price",
      label: "Giá",
      type: "number",
      prefix: "x ",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "50px",
        },
      },
    },
    {
      key: "coin",
      label: "Số Xu",
      type: "number",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "80px",
        },
      },
    },
    {
      key: "created_at",
      label: "Time",
      type: "text",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "150px",
        },
      },
    },
    {
      key: "actions",
      label: "Actions",
      type: "actions",
      fixed: "right",
      attributes: {
        align: "center",
        style: {
          textAlign: "center",
          maxWidth: "60px",
        },
      },
    },
  ]);


