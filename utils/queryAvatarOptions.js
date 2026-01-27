export const cashOptions = [
  { text: "Chon Giá Tiền", value: null },
  { text: "Dưới 100k", value: "0-100000" },
  { text: "Giá 100k đến 300k", value: "100000-300000" },
  { text: "Giá 300k đến 500k", value: "300000-500000" },
  { text: "Giá 500k đến 1 Triệu", value: "500000-1000000" },
  { text: "Giá 1Tr đến 3 Triệu", value: "1000000-3000000" },
  { text: "Giá trên 3 Triệu", value: "3000000" }
];

export const sexOptions = _.cloneDeep([
  {
    text: "Nam",
    value: "1",
  },
  {
    text: "Nữ",
    value: "2",
  },
  {
    text: "Bê đê",
    value: "3",
  }
]);

export const farmOptions = [
  {
    text: "Chọn Farm",
    value: null,
  },
  {
    text: "Dưới 48 ô đất",
    value: "0-48",
  },
  {
    text: "49 đến 95 ô đất",
    value: "49-95",
  },
  {
    text: "96 ô đất (Max)",
    value: "96",
  },
];

export const clanOptions = [
  { text: "Chọn Clan", value: null },
  { text: "Có Clan", value: "1" },
];
