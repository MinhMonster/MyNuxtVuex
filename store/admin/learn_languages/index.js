import { defaultPagy, typeNinjaOptions, classNinjaOptions, serverNinjaOptions } from '@/utils/admin/default'
import { enableResetStore } from '@/utils/admin/common'
import { getField, updateField } from "vuex-map-fields";


const ADD_ACTION = "ADD_ACTION";
const ADD_ACTION_INDEX = "ADD_ACTION_INDEX";

const REMOVE_ACTION = "REMOVE_ACTION";

const UPDATE_ACTION = "UPDATE_ACTION";



export default enableResetStore({
  namespaced: true,
  state() {
    return {
      stateDefault: {
        queryLearnLanguages: queryLearnLanguages,
        queryLearnLanguage: queryLearnLanguage,
        queryLanguageWords: queryLanguageWords,
        paramDefaults: { id: '' },
        language: language,
        languageTopic:languageTopic,
        languageWord: languageWord,
        languageExample: languageExample,
        languageItem:languageItem,
        formUpdateLanguage: formUpdateLanguage,
        formLanguageCategory: formLanguageCategory,
        formLanguageTopic: formLanguageTopic,
        formUpdateLanguageItem: formUpdateLanguageItem,
        formLanguageWord: formLanguageWord,
        formLanguageExample: formLanguageExample

      },
      queryLearnLanguages: queryLearnLanguages,
      queryLearnLanguage: queryLearnLanguage,
      queryLanguageWords: queryLanguageWords,
      paramDefaults: { id: '' },
      language: language,
      languageTopic:languageTopic,
      languageWord: languageWord,
      languageExample: languageExample,
      languageItem: languageItem,
      formUpdateLanguage: formUpdateLanguage,
      formLanguageCategory: formLanguageCategory,
      formLanguageTopic: formLanguageTopic,
      formUpdateLanguageItem: formUpdateLanguageItem,
      formLanguageWord: formLanguageWord,
      formLanguageExample: formLanguageExample,

      // formNinja: formNinja,

      deverlopers_scroll: [],
      datas: [],
      deverlopers: [],
      deverloper: {},
      deverloper_view: {},
      deverloper_edit: {},
      options: {},
      actions: [],
    }
  },

  getters: {
    getField,
    getAction: (state) => (index) => {
      return (
        state.actions[index] || {
          id: Math.random().toString(36).substr(2, 8),
          type: "message",
          timing: "now",
        }
      );
    },
  },
  mutations: {
    updateField,
  },
  mutations: {
    updateField,
    SET_Deverlopers_scroll(state, deverlopers_scroll) {
      state.deverlopers.push(deverlopers_scroll)
      // state.deverlopers_scroll = deverlopers_scroll
    },
    SET_Deverlopers(state, deverlopers) {
      state.deverlopers = deverlopers
    },
    SET_Deverloper(state, deverloper) {
      state.deverloper = deverloper
    },
    SET_Deverloper_view(state, deverloper_view) {
      state.deverloper_view = deverloper_view
      if (deverloper_view.code) {
        state.actions = deverloper_view.code
      } else {
        state.actions = []
      }
    },
    SET_Deverloper_edit(state, deverloper_edit) {
      state.deverloper_edit = deverloper_edit
      if (deverloper_edit.code) {
        state.actions = deverloper_edit.code
      } else {
        state.actions = []
      }
    },
    ADD_ACTION(state, type) {
      state.actions.push({
        id: Math.random().toString(36).substr(2, 8),
        typeCode: type.type,
        code: "",
        title: "",
        content: "",
        mode: type.mode
      });
    },
    ADD_ACTION_INDEX(state, payload) {
      state.actions.splice((payload.index + 1), 0, {
        id: Math.random().toString(36).substr(2, 8),
        typeCode: payload.typeCode.type,
        code: "",
        title: "",
        content: "",
        mode: payload.typeCode.mode,
      });
    },
    REMOVE_ACTION(state, index) {
      state.actions = state.actions.filter((item, i) => i !== index);
      // state.actions.splice((index), 1)

    },
    UPDATE_ACTION(state, { index, value }) {
      const actions = _.cloneDeep(state.actions);
      actions[index] = _.cloneDeep(value);
      state.actions = actions;
    },
  },

  actions: {
    setNew({ commit },) {
      commit("SET_Deverloper_edit", { ...newDeverloper });
    },
    updateDeverloper({ commit }, payload) {
      commit("SET_Deverloper", payload);
    },
    setAction({ commit }, payload) {
      commit(UPDATE_ACTION, payload);
    },

    async get_deverlopers_scroll({ commit }, payload) {
      try {
        const res = await this.$repositories.adminDeverlopers.scroll(payload)
        commit('SET_Deverlopers_scroll', res.data.deverlopers_scroll)
      } catch (error) {

      }
    },
    async get_deverlopers({ commit }) {
      try {
        const res = await this.$repositories.adminDeverlopers.all()
        commit('SET_Deverlopers', res.data.deverlopers)
      } catch (error) {

      }
    },
    async get_deverloper({ commit }, id) {

      try {
        const res = await this.$repositories.adminDeverlopers.show(id)
        commit('SET_Deverloper', res.data.deverloper || {})
      } catch (error) {

      }
    },
    async get_deverloper_view({ commit }, id) {
      try {
        const res = await this.$repositories.adminDeverlopers.view(id)
        // if(res.data.code === 200){
        commit('SET_Deverloper_view', res.data.deverloper_view)
        commit('SET_Deverloper', res.data.deverloper)
        // }
      } catch (error) {

      }
    },

    async get_deverloper_edit({ commit }, id) {
      try {
        const res = await this.$repositories.adminLearnLanguages.show_edit(id)
        if (res.data.code === 200) {
          commit('SET_Deverloper_edit', res.data.deverloper_edit)
          commit('SET_Deverloper', res.data.deverloper)
        }
      } catch (error) {

      }
    },

    async change_positions({ commit }, payload) {
      try {
        await this.$repositories.adminDeverlopers.change_positions(payload)
      } catch (error) {
        console.log(error);

      }
    },

    async changePositionItemDev({ commit }, payload) {
      try {
        await this.$repositories.adminDeverlopers.changePositionItemDev(payload)
      } catch (error) {
        console.log(error);
      }
    },

    addAction({ commit, state }, payload) {
      commit(ADD_ACTION, payload);
    },

    addActionIndex({ commit, state }, payload) {
      commit(ADD_ACTION_INDEX, payload);
    },
    removeAction({ commit, state }, payload) {
      commit(REMOVE_ACTION, payload);
    },

  },
});

export const newDeverloper = {
  title: "",
  link: "",
  info: "",
  code: []
};



const queryLearnLanguages = _.cloneDeep({
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
    placeholder: "Name Language",
    type: "text",
    show: true,
    value: ''
  },
});



const queryLearnLanguage = _.cloneDeep({
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
    show: false,
    value: ''
  },
  title: {
    placeholder: "Name Language",
    type: "text",
    show: true,
    value: ''
  },
});


const queryLanguageWords = _.cloneDeep({
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
    placeholder: "Name Language",
    type: "text",
    show: true,
    value: ''
  },

});



const language =
  _.cloneDeep({
    ID: null,
    title: '',
    link: ''
});

const languageItem =
  _.cloneDeep({
    title: "",
    ID: null
});

const languageTopic =
  _.cloneDeep({
    title: "",
    ID: null
});




const languageWord =
  _.cloneDeep({
    word: "",
    ID: null
  });

  const languageExample =
  _.cloneDeep({
    example: "",
    ID: null
  });

const formUpdateLanguage =
  _.cloneDeep([
    {
      title: "Title",
      type: "text",
      value: 'title',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Link",
      type: "text",
      value: 'link',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
]);

const formLanguageCategory =
  _.cloneDeep([
    {
      title: "",
      type: "text",
      value: 'title',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
]);

const formLanguageTopic =
  _.cloneDeep([
    {
      title: "Title",
      type: "text",
      value: 'title',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Content",
      type: "content-editer",
      value: 'content',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
]);



const formUpdateLanguageItem =
  _.cloneDeep([
    {
      title: "",
      type: "text",
      value: 'title',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
]);

const formLanguageWord =
  _.cloneDeep([
    {
      title: "Word",
      type: "text",
      value: 'word',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Translate",
      type: "text",
      value: 'translate',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Spell",
      type: "text",
      value: 'spell',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
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
  ]);



  const formLanguageExample =
  _.cloneDeep([
    {
      title: "Example",
      type: "text",
      value: 'example',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Spell",
      type: "text",
      value: 'spell',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
    },
    {
      title: "Translate",
      type: "text",
      value: 'translate',
      cols: 12,
      sm: 12,
      md: 12,
      lg: 12
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
  ]);








