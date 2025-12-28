export const cashOptions = [
  {
    text: "Chọn Giá Tiền",
    value: null,
  },
  {
    text: "Dưới 100k",
    value: {
      min: 10000,
      max: 120000,
    },
  },
  {
    text: "Giá 100k đến 300k",
    value: {
      min: 120000,
      max: 350000,
    },
  },
  {
    text: "Giá 300k đến 600k",
    value: {
      min: 350000,
      max: 700000,
    },
  },
  {
    text: "Giá 600k đến 1 Triệu",
    value: {
      min: 700000,
      max: 1200000,
    },
  },
  {
    text: "Giá 1Tr đến 3 Triệu",
    value: {
      min: 1200000,
      max: 3600000,
    },
  },
  {
    text: "Giá trên 3 Triệu",
    value: {
      min: 3600000,
    },
  },
];

export const sexOptions = [
  {
    text: "Chọn Giới tính",
    value: null,
  },
  {
    text: "Nam",
    value: "male",
  },
  {
    text: "Nữ",
    value: "female",
  },
  {
    text: "Bê Đê",
    value: "gay",
  },
];

export const farmOptions = [
  {
    text: "Chọn Farm",
    value: null,
  },
  {
    text: "Dưới 48 ô đất",
    value: {
      min: 6,
      max: 48,
    },
  },
  {
    text: "49 đến 95 ô đất",
    value: {
      min: 49,
      max: 95,
    },
  },
  {
    text: "96 ô đất (Max)",
    value: {
      min: 96,
    },
  },
];
