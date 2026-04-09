import { defaultPagy } from "@/utils/admin/default";
import { enableResetStore } from "@/utils/admin/common";
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state: () => ({
    columns: columns,
    repositories: "repositories_mms",
    stateDefault: {
      queryItems: queryItems,
      queryItem: queryItem,
      queryPriceItem: queryPriceItem,
    },

    queryItems: queryItems,
    queryItem: queryItem,
    queryPriceItem: queryPriceItem,
    formAccount: formAccount,
    formPriceItem: formPriceItem,
  }),

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
    sum_value: 0,
    cost_value: 0,
    profit_value: 0,
  },
  page: {
    type: "text",
    show: false,
    value: 1,
  },
  perPage: {
    type: "text",
    show: false,
    value: 15,
  },
  type: {
    placeholder: "Game",
    type: "select-options",
    show: true,
    value: null,
    options: [
      {
        text: "Tất cả loại game",
        value: null,
      },
      {
        text: "Ninja",
        value: "ninja",
      },
      {
        text: "Avatar",
        value: "avatar",
      },
      {
        text: "NRO",
        value: "ngocrong",
      },
    ],
  },
  account_name: {
    placeholder: "Account Name",
    type: "text",
    show: true,
    value: "",
  },
  account_code: {
    placeholder: "Account Code",
    type: "text",
    show: true,
    value: "",
  },

  user_id: {
    placeholder: "User ID",
    type: "text",
    show: true,
    value: "",
  },
  created_at_from: {
    placeholder: "From Time",
    type: "date",
    show: true,
    value: "",
  },
  created_at_to: {
    placeholder: "To Time",
    type: "date",
    show: true,
    value: "",
  },
});

const queryItem = _.cloneDeep({
  id: "",
  username: "",
  password: "",
  transfer_pin: "",
});

const queryPriceItem = _.cloneDeep({
  purchase_price: "",
  selling_price: "",
  note: "",
  images: [],
});

const formAccount = _.cloneDeep([
  {
    title: "Tài Khoản",
    type: "text",
    value: "username",
    cols: 12,
    md: 12,
  },
  {
    title: "Mật Khẩu",
    type: "text",
    value: "password",
    condition: {
      or: [
        {
          and: [
            {
              field: "account_type",
              operator: "in",
              value: ["ninja", "avatar"],
            },
            {
              field: "history_status",
              operator: "in",
              value: ["completed", "installment_first", "deposit"],
            },
          ],
        },
        {
          and: [
            {
              field: "account_type",
              operator: "equals",
              value: "dragon_ball",
            },
            {
              field: "history_status",
              operator: "equals",
              value: "completed",
            },
          ],
        },
      ],
    },
    cols: 12,
    md: 12,
  },
  {
    title: "Mã Pin",
    type: "text",
    value: "transfer_pin",
    condition: {
      and: [
        {
          field: "account_type",
          operator: "in",
          value: ["ninja", "avatar"],
        },
        {
          field: "history_status",
          operator: "equals",
          value: "completed",
        },
      ],
    },
    cols: 12,
    md: 12,
  },
]);

const formPriceItem = _.cloneDeep([
  {
    title: "Cost",
    type: "cash",
    value: "purchase_price",
    md: 6,
  },
  {
    title: "Price",
    type: "cash",
    value: "selling_price",
    md: 6,
  },
  {
    title: "Note",
    type: "content-editer",
    value: "note",
    cols: 12,
    md: 12,
  },
  {
    title: "Images",
    type: "images",
    value: "images",
    cols: 12,
    md: 12,
  },
]);

const columns = _.cloneDeep([
  {
    key: "id",
    label: "ID",
    attributes: {
      style: {
        width: "50px",
      },
    },
  },
  {
    key: "account_code",
    label: "Code",
    type: "number",
    copy: true,
    attributes: {
      style: {
        minWidth: "100px",
      },
    },
  },
  {
    key: "account.username",
    label: "Account",
    copy: true,
    attributes: {
      style: {
        minWidth: "170px",
      },
    },
  },
  {
    key: "type",
    label: "Type",
    type: "option-display",
    options: [
      {
        text: "Normal",
        value: "normal",
        color: "success",
      },
      {
        text: "Deposit",
        value: "deposit",
        color: "warning",
      },
      {
        text: "Installments",
        value: "installments",
        color: "orange",
      },
    ],
    attributes: {
      style: {
        minWidth: "100px",
      },
    },
  },
  {
    key: "status",
    label: "Status",
    type: "option-display",
    options: [
      {
        text: "Completed",
        value: "completed",
        color: "success",
      },
      {
        text: "Installment First",
        value: "installment_first",
        color: "orange",
      },
      {
        text: "Deposit",
        value: "deposit",
        color: "warning",
      },
      {
        text: "Cancelled & Refund Pending",
        value: "cancelled_refund_pending",
        color: "warning",
      },
      {
        text: "Cancelled & Refunded",
        value: "cancelled_refunded",
        color: "error",
      },
      {
        text: "Cancelled",
        value: "cancelled",
        color: "error",
      },
      {
        text: "Expired",
        value: "expired",
        color: "error",
      },
    ],
    attributes: {
      style: {
        minWidth: "180px",
      },
    },
  },
  {
    key: "selling_price",
    label: "Price",
    type: "number",
    attributes: {
      style: {
        width: "100px",
      },
    },
  },
  {
    key: "purchase_price",
    label: "Cost",
    type: "number",
    attributes: {
      style: {
        minWidth: "100px",
      },
    },
  },
  {
    key: "first_paid_amount",
    label: "First Paid",
    type: "number",
    attributes: {
      style: {
        minWidth: "100px",
      },
      class: "text-success bold",
    },
  },
  {
    key: "second_paid_amount",
    label: "Second Paid",
    type: "number",
    attributes: {
      style: {
        minWidth: "100px",
      },
      class: "text-info bold",
    },
  },
  {
    key: "account_type",
    label: "Game",
    attributes: {
      style: {
        minWidth: "100px",
      },
    },
  },
  {
    key: "user",
    label: "User",
    attributes: {
      style: {
        minWidth: "120px",
      },
    },
  },
  {
    key: "purchased_at",
    label: "Time",
    attributes: {
      style: {
        minWidth: "160px",
      },
    },
  },
  {
    key: "actions",
    label: "Actions",
    type: "actions",
    fixed: "right",
    attributes: {
      style: {
        minWidth: "30px",
      },
    },
  },
]);
