import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryProducts: queryProducts,
        queryTopic: queryTopic,
      },
      queryProducts: queryProducts,
      queryTopic: queryTopic,
      formTopic: formTopic
    }

  },

  mutations: {
    updateField,
  },
  getters: {
    getField,
  },
  actions: {
  }
});

export const newTopic = {
  title: "",
  content: "",
  image: '',
  link: "",
  status: "yes",
  description: "",
};



const queryProducts = _.cloneDeep({
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
    // title: "ID",
    placeholder: "ID",
    type: "text",
    show: true,
    value: ''
  },
  title: {
    placeholder: "Title",
    type: "text",
    show: true,
    value: ''
  },
  link: {
    placeholder: "Link",
    type: "text",
    show: true,
    value: ''
  },
  status: {
    placeholder: "Trạng Thái",
    type: "select-options",
    show: true,
    value: "yes",
    options: [
      {
        text: "Tất cả",
        value: null,
      },
      {
        text: "Xuất bản",
        value: "yes",
      },
      {
        text: "Ẩn",
        value: "no",
      },
    ],
  },
});


const queryTopic = _.cloneDeep({

  ID: "",
  name: "",
  image: '',
  link: "",
  description: "",
  quantity: "",
  price: ""
});


const formTopic =
  _.cloneDeep([
    // {
    //   title: "Image",
    //   type: "text",
    //   value: 'image',
    //   show: false,
    //   cols: 12,
    //   sm: 12,
    //   md: 12,
    //   lg: 12
    // },
    {
      title: "Name",
      type: "text",
      value: 'name',
      cols: 12,
      sm: 12,
      md: 6,
      lg: 6
    },
    {
      title: "Link",
      type: "text",
      value: 'link',
      cols: 12,
      sm: 12,
      md: 6,
      lg: 6
    },
    {
      title: "Price",
      type: "cash",
      value: 'price',
      cols: 12,
      sm: 12,
      md: 6,
      lg: 6
    },
    {
      title: "Quantity",
      type: "cash",
      value: 'quantity',
      cols: 12,
      sm: 12,
      md: 6,
      lg: 6
    },
    {
      title: "Mô tả",
      type: "content-editer",
      value: 'description',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Nội dung",
      type: "content-editer",
      value: 'content',
      height: '100%',
      fullHeight: true,
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
  ]);
