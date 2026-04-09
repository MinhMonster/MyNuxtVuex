import { getField, updateField } from "vuex-map-fields";
import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      repositories: "repositories_mms",
      columns: columns,
      stateDefault: {
        queryItems: queryItems,
        queryItem: queryItem,
        queryItemCash: queryItemCash,
      },
      queryItems: queryItems,
      queryItem: queryItem,
      queryItemCash: queryItemCash,
      formItem: formItem,
      formItemCash: formItemCash,
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
  id: {
    placeholder: "ID",
    type: "text",
    show: true,
    value: ''
  },
  name: {
    placeholder: "Name",
    type: "text",
    show: true,
    value: ''
  },
  email: {
    placeholder: "Email",
    type: "text",
    show: true,
    value: ''
  },
  phone: {
    placeholder: "Phone",
    type: "text",
    show: true,
    value: ''
  },
});


const formItem =
  _.cloneDeep([
    {
      title: "Name",
      value: 'name',
      type: "text",
      cols: 12,
      md: 12
    },
    {
      title: "Phone",
      type: "text",
      value: 'phone',
      cols: 12,
      md: 12
    },
    {
      title: "Email",
      value: 'email',
      type: "text",
      cols: 12,
      md: 12
    },
  ]);


const formItemCash =
  _.cloneDeep([
    {
      title: "Cash",
      value: 'cash',
      type: "cash",
      disabled: true,
      cols: 12,
      sm: 12,
      lg: 12,
      md: 12
    },
    {
      title: "Type",
      type: "select-options",
      value: 'direction',
      options: [
        {
          text: "Increase",
          value: 'in',
        },
        {
          text: "Decrease",
          value: "out",
        },
      ],
      cols: 12,
      sm: 12,
      lg: 12,
      md: 12
    },
    {
      title: "Amount",
      value: 'amount',
      type: "cash",
      cols: 12,
      sm: 12,
      lg: 12,
      md: 12
    },
  ]);


const queryItemCash = _.cloneDeep({
  amount: "",
  direction: "in",
  cash: "",
});

const queryItem = _.cloneDeep({
  id: "",
  cash: "",
  name: "",
});

const columns =
  _.cloneDeep([
    {
      key: "id",
      label: "ID",
      attributes: {},
    },
    {
      key: "name",
      label: "Name",
      attributes: {},
    },
    {
      key: "phone",
      label: "Phone",
      attributes: {},
    },
    {
      key: "email",
      label: "Email",
      attributes: {},
    },
    {
      key: "cash",
      label: "Cash",
      type: "number",
      attributes: {},
    },
    {
      key: "status",
      label: "Status",
      type: "option-display",
      options: [
        {
          text: "",
          value: "active",
          icon: "mdi-circle-small",
          color: "blue",
        },
        {
          text: "",
          value: "locked",
          color: "error",
          icon: "mdi-lock",
        },
      ],
      attributes: {
        align: "center",
      },
    },
    {
      key: "created_at",
      label: "Time",
      type: "text",
      attributes: {
        style: {
          width: "150px !important",
          minWidth: "150px",
        },
      },
    },
    {
      key: "actions",
      label: "Actions",
      type: "actions",
      attributes: {
        style: {
          minWidth: "50px",
        },
      },
    },
  ]);
