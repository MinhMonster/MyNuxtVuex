import { defaultPagy, typeSeleOffOptions } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        querySaleOffs: querySaleOffs,
        querySaleOff: querySaleOff
      },
      querySaleOffs: querySaleOffs,
      querySaleOff: querySaleOff,
      formSaleOff: formSaleOff
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

const querySaleOffs = _.cloneDeep({
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

const querySaleOff = _.cloneDeep({
  ID: "",
  name: "",
  start_date: "",
  // sale_200k: "",
  end_date: "",
  is_active: "0",
  type: "ninja",
  price_tiers: [
  {
    value: "0"
  },
  {
    value: "0"
  },
  {
    value: "0"
  },
  {
    value: "0"
  },
  {
    value: "0"
  },
  {
    value: "0"
  },
  {
    value: "0"
  },
  {
    value: "0"
  },
],
});


const formSaleOff =
  _.cloneDeep([
    {
      title: "Name",
      type: "text",
      value: 'name',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "Start Date",
      type: "date",
      value: 'start_date',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "End Date",
      type: "date",
      value: 'end_date',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },

    {
      title: "Active",
      type: "select-options",
      value: 'is_active',
      options: [
        {
          text: "Active",
          value: '1',
        },
        {
          text: "No Active",
          value: "0",
        },
      ],
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "Type",
      type: "select-options",
      options: typeSeleOffOptions,
      value: 'type',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "Prices",
      type: "forms",
      forms: [
        {
          title: "100K",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
        {
          title: "300K",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
        {
          title: "500K",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
        {
          title: "1 Triệu",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
        {
          title: "2 Triệu",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
        {
          title: "3 Triệu",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
        {
          title: "5 Triệu",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
        {
          title: "10 Triệu",
          type: "number",
          value: 'value',
          sm: 6,
          md: 4,
          lg: 3
        },
      ],
      value: 'price_tiers',
      // cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
  ]);
