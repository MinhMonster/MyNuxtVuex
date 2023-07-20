import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";


export default {
  namespaced: true,
  state: () => ({
    topics: [],
    topic: null,
    post: [],
    metaTopics: {},
    pageSave: 1,
    query: {
      page: 1,
      perPage: 24
    }
  }),

  mutations: {
    updateField,

    SET_TOPICS(state, topics) {
      state.topics = topics
    },
    SET_POST(state, post) {
      state.post = post
    },
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_QUERY(state, payload) {
      state.query = {
        ...state.query,
        ..._.cloneDeep(payload),
      };
    },
  },
  getters: {
    getField,
  },
  actions: {
    async fetchTopics({ commit, state }) {
      try {
        const res = await this.$repositories.homeTopics.fetchTopics({ input: state.query })
        commit('SET_STATE', { topics: res.data.topics, metaTopics: res.data.pagy })
      } catch (error) {

      }
    },
    async fetchTopic({ commit }, link) {
      try {
        const res = await this.$repositories.homeTopics.fetchTopic(link)
        commit('SET_STATE', { topic: res.data.topic })
      } catch (error) {

      }
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
      commit(SET_STATE, { pageSave: state.query.page });
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, {
        page: 1,
        perPage: 24,
        q: {},
      });
    },

  }
}

export const newAccountNinja = {
  ID: "",
  taikhoan: "",
  ingame: "",
  level: "",
  vukhi: "",
  mcs: "",
  thongtin: "",
  loainick: 1,
  class: 1,
  server: 1,
  giatien: "",
  gianhap: "",
  sim: "",
  hinhanh: [],
  do: "",

  tl1: "",
  tl2: "",
  tl3: "",
  tl4: "",
  tl5: "",
  tl6: "",
  tl7: "",
  tl8: "",
  tl9: "",
  tl10: "",
  tl11: "",
};

