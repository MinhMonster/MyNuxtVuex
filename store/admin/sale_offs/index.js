import { defaultPagy } from '@/utils/admin/default'
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
  sale_100k: "",
  // sale_200k: "",
  sale_300k: "",
  sale_500k: "",
  sale_1000k: "",
  sale_1500k: "",
  sale_2000k: "",
  sale_2500k: "",
  sale_3000k: "",
});


const formSaleOff =
  _.cloneDeep([
    {
      title: "100k",
      type: "text",
      value: 'sale_100k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "300k",
      type: "text",
      value: 'sale_300k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "500k",
      type: "text",
      value: 'sale_500k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "1000k",
      type: "text",
      value: 'sale_1000k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "1500k",
      type: "text",
      value: 'sale_1500k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "2000k",
      type: "text",
      value: 'sale_2000k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
    {
      title: "2500k",
      type: "text",
      value: 'sale_2500k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3 
    },
    {
      title: "3000k",
      type: "text",
      value: 'sale_3000k',
      // cols: 12,
      sm: 6,
      md: 4,
      lg: 3
    },
  ]);
