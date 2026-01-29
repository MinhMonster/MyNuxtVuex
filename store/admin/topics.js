import _ from "lodash";
import { defaultPagy } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
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
  keyword: {
    placeholder: "Keyword",
    type: "text",
    show: true,
    value: ''
  },

  slug: {
    placeholder: "Slug",
    type: "text",
    show: true,
    value: ''
  },

  is_active: {
    placeholder: "Status",
    type: "select-options",
    show: true,
    value: "1",
    options: [
      { text: "Tất cả", value: null },
      { text: "Hiển thị", value: "1" },
      { text: "Ẩn", value: "0" },
    ],
  },
});

const queryItem = _.cloneDeep({
  id: "",
  title: "",
  slug: "",
  description: "",
  content: "",
  images: [],
  is_active: true,
});

const formItem = _.cloneDeep([
  {
    title: "Title",
    type: "text",
    value: 'title',
    cols: 12,
    sm: 12,
    md: 6,
    lg: 6
  },
  {
    title: "Slug",
    type: "text",
    value: 'slug',
    cols: 12,
    sm: 12,
    md: 6,
    lg: 6
  },
  {
    title: "Description",
    type: "content-editer",
    value: 'description',
    cols: 12,
    sm: 12,
    md: 12,
    lg: 12
  },
  {
    title: "Content",
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


const columns = _.cloneDeep([
  {
    key: "id",
    label: "ID",
    attributes: {
      style: {
        width: "50px !important",
        minWidth: "50px !important",
      },
    },
  },
  {
    key: "thumbnail",
    label: "Image",
    attributes: {
      style: {
        width: "50px !important",
        minWidth: "100px !important",
      },
    },
  },
  {
    key: "title",
    label: "Title",
    attributes: {
      style: {
        minWidth: "200px",
      },
    },
  },
  {
    key: "slug",
    label: "Slug",
    attributes: {
      style: {
        minWidth: "200px",
      },
    },
  },
  {
    key: "description",
    label: "Description",
    attributes: {
      style: {
        minWidth: "200px",
      },
    },
  },
  {
    key: "actions",
    label: "Actions",
    type: "actions",
    attributes: {
      minWidth: "120x",
    },
  },
]);


