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
      columns: columns,
      queryItems: queryItems,
      queryItem: queryItem,
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
    getTableInfos: (state, getters) => (item) => {
      if (!item) return []

      return [
        {
          label: "ID",
          value: item.id,
        },
        {
          label: "Game",
          value: item.game_type,
        },
        {
          label: "Tài khoản",
          value: item.username,
        },
        {
          label: "Máy chủ",
          value: item.server,
        },
        {
          label: "Mệnh giá",
          value: item.amount,
          type: "number"
        },
        {
          label: "Giá tiền",
          value: item.price,
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
      label: "ID",
      type: "number",
      attributes: {
        align: "center",
        style: {
          textAlign: "center",
          minWidth: "80px",
        },
      },
    },
    {
      key: "amount",
      label: "Mệnh giá",
      type: "number",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "80px",
        },
      },
    },
    {
      key: "price",
      label: "Giá",
      type: "number",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "150px",
        },
      },
    },
    {
      key: "game_type",
      label: "Game",
      type: "deleted_at",
      attributes: {
        style: {
          textAlign: "center",
          minWidth: "50px",
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


