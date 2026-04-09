import { defaultPagy, typeSeleOffOptions } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryItems: queryItems,
        queryItem: queryItem
      },
      columns: columns,
      repositories: "repositories_mms",
      queryItems: queryItems,
      queryItem: queryItem,
      formItem: formItem
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
    value: 15
  },
});

const queryItem = _.cloneDeep({
  ID: "",
  name: "",
  start_date: "",
  // sale_200k: "",
  end_date: "",
  is_active: "0",
  type: "ninja",
  price_tiers: [
    {
      price: 100000,
      value: 0
    },
    {
      price: 300000,
      value: 0
    },
    {
      price: 500000,
      value: 0
    },
    {
      price: 1000000,
      value: 0
    },
    {
      price: 2000000,
      value: 0
    },
    {
      price: 3000000,
      value: 0
    },
    {
      price: 5000000,
      value: 0
    },
    {
      price: 10000000,
      value: 0
    },
  ],
});


const formItem =
  _.cloneDeep([
    {
      title: "Name",
      type: "text",
      value: 'name',
      md: 3,
    },
    {
      title: "Type",
      type: "select-options",
      options: typeSeleOffOptions,
      value: 'type',
      md: 3,
    },
    {
      title: "Start Date",
      type: "date",
      value: 'start_date',
      md: 3,
    },
    {
      title: "End Date",
      type: "date",
      value: 'end_date',
      md: 3,
    },

    {
      title: "Active",
      type: "select-options",
      value: 'is_active',
      options: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "No Active",
          value: false,
        },
      ],
      md: 3,
    },

    {
      title: "Prices",
      type: "forms",
      forms: [
        {
          title: "100K",
          type: "number",
          value: 'value',
          md: 3,
        },
        {
          title: "300K",
          type: "number",
          value: 'value',
          md: 3,
        },
        {
          title: "500K",
          type: "number",
          value: 'value',
          md: 3,
        },
        {
          title: "1 Triệu",
          type: "number",
          value: 'value',
          md: 3,
        },
        {
          title: "2 Triệu",
          type: "number",
          value: 'value',
          md: 3,
        },
        {
          title: "3 Triệu",
          type: "number",
          value: 'value',
          md: 3,
        },
        {
          title: "5 Triệu",
          type: "number",
          value: 'value',
          md: 3,
        },
        {
          title: "10 Triệu",
          type: "number",
          value: 'value',
          md: 3,
        },
      ],
      value: 'price_tiers',
      cols: 12,
      md: 12,
    },
  ]);


const columns =
  _.cloneDeep([
    {
      key: "id",
      label: "ID",
      attributes: {
        style: {
          minWidth: "50px",
        },
      },
    },
    {
      key: "is_active",
      label: "Active",
      type: "checkbox"
    },
    {
      key: "price_tiers[0].value",
      label: "100k",
    },
    {
      key: "price_tiers[1].value",
      label: "300k",
    },
    {
      key: "price_tiers[2].value",
      label: "500k",
    },
    {
      key: "price_tiers[3].value",
      label: "1 Triệu 500k",
    },
    {
      key: "price_tiers[4].value",
      label: "2 Triệu",
    },
    {
      key: "price_tiers[5].value",
      label: "3 Triệu 500k",
    },
    {
      key: "price_tiers[6].value",
      label: "5 Triệu",
    },
    {
      key: "price_tiers[7].value",
      label: "10 Triệu",
    },
    {
      key: "type",
      label: "Type",
      type: "text",
      attributes: {
        style: {
          minWidth: "50px",
        },
      },
    },
    // {
    //   key: "actions",
    //   label: "Actions",
    //   type: "actions",
    //   attributes: {
    //     minWidth: "120",
    //   },
    // },
  ]);

