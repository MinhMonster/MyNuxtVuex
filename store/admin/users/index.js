import { getField, updateField } from "vuex-map-fields";
import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryUsers: queryUsers,
        queryUserCash: queryUserCash,
        queryUser: queryUser,
      },
      repositories: "repositories_mms",
      columns: columns,
      queryUsers: queryUsers,
      queryUser: queryUser,
      queryUserCash: queryUserCash,
      formUpdateCash: formUpdateCash,
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

const queryUsers = _.cloneDeep({
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

const formUpdateCash =
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
      value: 'type',
      options: [
        {
          text: "Increase",
          value: 'increase',
        },
        {
          text: "Decrease",
          value: "decrease",
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


const queryUserCash = _.cloneDeep({
  amount: "",
  type: "increase",
  cash: "",
});

const queryUser = _.cloneDeep({
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
      key: "action",
      label: "Actions",
      type: "actions",
      attributes: {
        style: {
          minWidth: "50px",
        },
      },
    },
  ]);
