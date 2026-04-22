import {
  typeOptions,
  planetNroOptions,
  serverNroOptions,
  defaultResponse,
  isSoldFilter,
  ownerFilter,
  deletedAtFilter,
  textFilter,
  hiddenFilter,
  formGameItemDefaultModal,
} from "@/utils/admin/default";
import { enableResetStore } from "@/utils/admin/common";
import { getField, updateField } from "vuex-map-fields";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      repositories: "repositories_mms",
      columns: columns,
      stateDefault: {
        queryItems: queryItems,
        queryItem: queryItem,
      },
      queryItems: queryItems,
      queryItem: queryItem,
      formItem: formItem,
      formItemModal: formItemModal,
    };
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
  response: defaultResponse(),
  page: hiddenFilter(1),
  perPage: hiddenFilter(15),
  id: textFilter("ID"),
  code: textFilter("Code"),
  username: textFilter("Username"),
  owner: ownerFilter(),
  is_sold: isSoldFilter(),
  deleted_at: deletedAtFilter(),
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

const formItem = _.cloneDeep([
  {
    title: "Mã",
    type: "cash",
    value: "code",
  },
  {
    title: "Tài khoản",
    type: "text",
    value: "username",
  },
  {
    title: "Giá Bán",
    type: "cash",
    value: "selling_price",
  },
  {
    title: "Giá Nhập",
    type: "cash",
    value: "purchase_price",
  },
  {
    title: "Discount",
    type: "number",
    value: "discount_percent",
  },
  {
    title: "Loại Nick",
    type: "select-options",
    options: typeOptions,
    value: "type",
  },
  {
    title: "Hành tinh",
    type: "select-options",
    options: planetNroOptions,
    value: "planet",
  },
  {
    title: "Máy chủ",
    type: "select-options",
    options: serverNroOptions,
    value: "server",
  },
  {
    title: "Sức mạnh",
    type: "cash",
    value: "strength",
  },
  {
    title: "Đệ tử",
    type: "cash",
    value: "disciple",
  },
  {
    title: "Mô tả",
    type: "content-editer",
    value: "description",
    cols: 12,
    md: 12,
  },
]);

const formItemModal = _.cloneDeep([
  {
    title: "Mã",
    type: "cash",
    value: "code",
    md: 6,
  },
  {
    title: "Tài Khoản",
    type: "text",
    value: "username",
    md: 6,
  },
  ...formGameItemDefaultModal,
]);

const columns = _.cloneDeep([
  {
    key: "id",
    label: "ID",
    type: "number",
    fixed: "left",
    attributes: {
      align: "left",
      style: {
        minWidth: "80px",
      },
    },
  },
  {
    key: "code",
    label: "Mã",
    type: "number",
    fixed: "left",
    attributes: {
      style: {
        minWidth: "80px",
      },
    },
  },
  {
    key: "username",
    label: "Account",
    copy: true,
    attributes: {
      style: {
        minWidth: "150px",
      },
    },
  },
  {
    key: "is_deposit",
    label: "Deposit",
    type: "checkbox",
    method: "toggleDeposit",
    attributes: {
      class: "text-right",
      style: {
        minWidth: "60px",
      },
    },
  },
  {
    key: "is_installments",
    label: "Installments",
    type: "checkbox",
    method: "toggleInstallments",
    attributes: {
      class: "text-right",
      style: {
        minWidth: "60px",
      },
    },
  },
  {
    key: "deleted_at",
    label: "Status",
    type: "deleted_at",
    attributes: {
      style: {
        minWidth: "50px",
      },
    },
  },
  {
    key: "planet",
    label: "Hành tinh",
    type: "text",
    attributes: {
      style: {
        minWidth: "70px",
      },
    },
  },
  {
    key: "server",
    label: "Máy chủ",
    type: "text",
    attributes: {
      style: {
        minWidth: "70px",
      },
    },
  },
  {
    key: "price",
    label: "Price",
    type: "number",
    attributes: {
      class: "text-right",
      style: {
        minWidth: "60px",
      },
    },
  },
  {
    key: "purchase_price",
    label: "Cost",
    type: "number",
    attributes: {
      // class: 'text-right',
      style: {
        minWidth: "60px",
      },
    },
  },
  {
    key: "profit",
    label: "Profit",
    type: "number",
    attributes: {
      class: "text-right",
      style: {
        minWidth: "50px",
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
        maxWidth: "60px",
      },
    },
  },
]);
