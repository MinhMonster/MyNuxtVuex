import _ from 'lodash'

export const defaultPagy = _.cloneDeep({
  count: 1,
  page: 1,
  per_page: 15,
  pages: 0,
  from: 0,
  to: 0
})


// Ninja
export const typeNinjaOptions = _.cloneDeep([
  {
    text: "Thường",
    value: "3",
  },
  {
    text: "VIP",
    value: "1",
  },
  {
    text: "TTGT",
    value: "2",
  }
]);

export const serverNinjaOptions = _.cloneDeep([
  {
    text: "Sv1 - Bokken",
    value: "1",
  },
  {
    text: "Sv2+3 - Shuriken + Tessen",
    value: "2",
  },
  {
    text: "Sv4 - Kunai",
    value: "4",
  },
  {
    text: "Sv5 - Katana",
    value: "5",
  },
  {
    text: "Sv67 - Tone + Sanzu",
    value: "6",
  },
  {
    text: "Sv8 - Sensha",
    value: "8",
  },
]);


export const classNinjaOptions = _.cloneDeep([
  {
    text: "Đao",
    value: "1",
  },
  {
    text: "Kiếm",
    value: "2",
  },
  {
    text: "Tiêu",
    value: "3",
  },
  {
    text: "Cung",
    value: "4",
  },
  {
    text: "Quạt",
    value: "5",
  },
  {
    text: "Kunai",
    value: "6",
  },
  {
    text: "Chưa",
    value: "7",
  },
]);

// Avatar
export const sexAvatarOptions = _.cloneDeep([
  {
    text: "Nam",
    value: "male",
  },
  {
    text: "Nữ",
    value: "female",
  },
  {
    text: "Bê đê",
    value: "gay",
  }
]);

