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
    newTopic({ commit }) {
      commit(SET_STATE, { topic: newTopic });
    },
    async fetchTopics({ commit, state }) {
      try {
        const res = await this.$repositories.adminTopics.fetchTopics({ input: state.query })
        commit(SET_STATE, { topics: res.data.topics, metaTopics: res.data.pagy })
      } catch (error) {

      }
    },
    async fetchTopic({ commit }, id) {
      try {
        const res = await this.$repositories.adminTopics.fetchTopic(id)
        commit('SET_STATE', { topic: res.data.topic })
      } catch (error) {

      }
    },
    async createTopic({ commit, state }) {
      try {
        await this.$repositories.adminTopics.createTopic({
          input: state.topic
        });
      } catch (error) { }
    },
    async updateTopic({ commit, state }, id) {
      try {
        await this.$repositories.adminTopics.updateTopic({
          id,
          input: state.topic
        });
      } catch (error) { }
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

  // async get_post({ commit }, post) {
  //   const res = await this.$repositories.post.show(post)
  //   const { status, data } = res
  //   if (status === 200 && data.success && data.code) {
  //     const { data } = data
  //     commit('SET_POST', data)
  //   } else {
  //     // Handle error here
  //   }
  // },

  // async create_post({ commit }, id, post) {
  //   const res = await this.$repositories.post.create(id, post)
  //   const { status, data } = res
  //   if (status === 200 && data.success && data.code) {
  //     const { data } = data
  //     commit('SET_POST', data)
  //   } else {
  //     // Handle error here
  //   }
  // },

  // async update_post({ commit }, id, post) {
  //   const res = await this.$repositories.post.update(id, post)
  //   const { status, data } = res
  //   if (status === 200 && data.success && data.code) {
  //     const { data } = data
  //     commit('SET_POST', data)
  //   } else {
  //     // Handle error here
  //   }
  // },

  // async delete_post({ commit }, id) {
  //   const res = await this.$repositories.post.delete(id)
  //   const { status, data } = res
  //   if (status === 200 && data.success && data.code) {
  //     // Remove from store
  //   } else {
  //     // Handle error here
  //   }
  // }
}

export const newTopic = {
  title: "",
  content: "",
  image: null,
  link: "",
  status: "yes",
  description: "",
};

