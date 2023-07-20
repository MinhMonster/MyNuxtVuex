import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state: () => ({
    topics: [],
    topic: null,
    post: []
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
  },
  getters: {
    getField,
  },
  actions: {
    // async get_topics({ commit }) {
    //   const res = await this.$repositories.adminTopics.all()
    //   const { status, data } = res
    //   if (status === 200) {
    //     commit('SET_TOPICS', data.topics)
    //   } else {
    //     // Handle error here
    //   }
    // },
    async fetchTopics({ commit }) {
      try {
        const res = await this.$repositories.adminTopics.fetchTopics()
        commit('SET_STATE', { topics: res.data.topics })
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
    async updateTopic({ commit, state }, id) {
      try {
        await this.$repositories.adminTopics.updateTopic({
          id,
          input: state.topic
        });
      } catch (error) { }
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

