import _ from "lodash";

export const defaultPagy = _.cloneDeep({
  count: 1,
  page: 1,
  per_page: 15,
  pages: 0,
  from: 0,
  to: 0,
});

// Ninja
export const typeOptions = _.cloneDeep([
  {
    text: "VIP",
    value: 1,
  },
  {
    text: "Thường",
    value: 2,
  },
]);

export const serverNinjaOptions = _.cloneDeep([
  {
    text: "Sv1 - Bokken",
    value: 1,
  },
  {
    text: "Sv2+3 - Shuriken + Tessen",
    value: 2,
  },
  {
    text: "Sv4 - Kunai",
    value: 4,
  },
  {
    text: "Sv5 - Katana",
    value: 5,
  },
  {
    text: "Sv67 - Tone + Sanzu",
    value: 6,
  },
  {
    text: "Sv8 - Sensha",
    value: 8,
  },
]);

export const classNinjaOptions = _.cloneDeep([
  {
    text: "Đao",
    value: 1,
  },
  {
    text: "Kiếm",
    value: 2,
  },
  {
    text: "Tiêu",
    value: 3,
  },
  {
    text: "Cung",
    value: 4,
  },
  {
    text: "Quạt",
    value: 5,
  },
  {
    text: "Kunai",
    value: 6,
  },
  {
    text: "Chưa",
    value: 7,
  },
]);

// Avatar
export const sexAvatarOptions = _.cloneDeep([
  {
    text: "Nam",
    value: 1,
  },
  {
    text: "Nữ",
    value: 2,
  },
  {
    text: "Bê đê",
    value: 3,
  },
]);

export const statusOptions = _.cloneDeep([
  {
    text: "Chưa Bán",
    value: "yes",
  },
  {
    text: "Đã Bán",
    value: "no",
  },
  {
    text: "Chờ Duyệt",
    value: "pending",
  },
]);

// Ninja
export const typeSeleOffOptions = _.cloneDeep([
  {
    text: "Ninja",
    value: "ninja",
  },
  {
    text: "Avatar",
    value: "avatar",
  },
]);

export const accountTypeOptions = _.cloneDeep([
  {
    text: "Account Type",
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
    value: "dragon_ball",
  },
]);

export const purchaseTypeOptions = _.cloneDeep([
  {
    text: "Purchase Type",
    value: null,
    color: "secondary",
  },
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
]);

export const purchaseStatusOptions = _.cloneDeep([
  {
    text: "Status",
    value: null,
  },
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
]);
export const serverNroOptions = _.cloneDeep([
  {
    text: "Vũ trụ 1",
    value: 1,
  },
  {
    text: "Vũ trụ 2",
    value: 2,
  },
  {
    text: "Vũ trụ 3",
    value: 3,
  },
  {
    text: "Vũ trụ 4",
    value: 4,
  },
  {
    text: "Vũ trụ 5",
    value: 5,
  },
  {
    text: "Vũ trụ 6",
    value: 6,
  },
  {
    text: "Vũ trụ 7",
    value: 7,
  },
  {
    text: "Vũ trụ 8",
    value: 8,
  },
  {
    text: "Vũ trụ 9",
    value: 9,
  },
  {
    text: "Vũ trụ 10",
    value: 10,
  },
  {
    text: "Vũ trụ 11",
    value: 11,
  },
  {
    text: "Vũ trụ 12",
    value: 12,
  },
  {
    text: "Vũ trụ 13",
    value: 13,
  },
  {
    text: "Vũ trụ 14",
    value: 14,
  },
]);

export const planetNroOptions = _.cloneDeep([
  {
    text: "Trái đất",
    value: 1,
  },
  {
    text: "Xayda",
    value: 2,
  },
  {
    text: "Namec",
    value: 3,
  },
]);

export const defaultResponse = () =>
  _.cloneDeep({
    meta: defaultPagy,
    data: [],
    count: 0,
  });

export const isSoldFilter = () =>
  _.cloneDeep({
    placeholder: "Sale status",
    type: "select-options",
    show: true,
    value: "0",
    options: [
      { text: "All", value: null },
      { text: "Available", value: "0" },
      { text: "Sold", value: "1" },
    ],
  });

  export const ownerFilter = () =>
  _.cloneDeep({
    placeholder: "Owner",
    type: "select-options",
    show: true,
    value: null,
    options: [
      { text: "Owner", value: null },
      { text: "Admin", value: "admin" },
      { text: "CTV", value: "ctv" },
    ],
  });

export const deletedAtFilter = () =>
  _.cloneDeep({
    placeholder: "Status",
    type: "select-options",
    show: true,
    value: "0",
    options: [
      {
        text: "Active",
        value: "0",
      },
      {
        text: "Deleted",
        value: "1",
      },
    ],
  });

export const textFilter = (placeholder) => ({
  type: "text",
  show: true,
  value: "",
  placeholder,
});

export const dateFilter = (placeholder) => ({
  type: "date",
  show: true,
  value: "",
  placeholder,
});

export const hiddenFilter = (value) => ({
  type: "text",
  show: false,
  value,
});

export const optionFilter = (placeholder, options = []) => ({
  type: "select-options",
  placeholder,
  show: true,
  value: null,
  options,
});

export const formGameItemDefaultModal = _.cloneDeep([
  {
    title: "Discount",
    type: "cash",
    value: "discount_percent",
    md: 6,
  },
  {
    title: "Discount Active",
    type: "text",
    disabled: true,
    value: "active_discount",
    md: 6,
  },
  {
    title: "Giá Bán (Vnd)",
    type: "cash",
    value: "selling_price",
    md: 6,
  },
  {
    title: "Giá Sale (Vnđ)",
    type: "cash_sale_off",
    value: "selling_price",
    md: 6,
  },
  {
    title: "Giá Nhập (Vnđ)",
    type: "cash",
    value: "purchase_price",
    md: 6,
  },
  {
    title: "Lợi Nhuận (Vnđ)",
    value: "selling_price",
    type: "profit",
    md: 6,
  },
  {
    title: "Đặt cọc (Vnđ)",
    type: "cash",
    value: "deposit_price",
    condition: {
      field: "is_deposit",
      operator: "truthy",
    },
    md: 6,
  },
  {
    title: "Trả góp (Vnđ)",
    value: "installments_price",
    type: "cash",
    condition: {
      field: "is_installments",
      operator: "truthy",
    },
    md: 6,
  },
]);
