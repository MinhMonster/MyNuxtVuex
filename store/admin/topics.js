export default {
  namespaced: true,
  state: () => ({
    topics: [],
    post: []
  }),

  mutations: {
    SET_TOPICS(state, topics) {
      state.topics = topics
    },
    SET_POST(state, post) {
      state.post = post
    }
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
    async get_topics({ commit }) {
      try{
        const res = await this.$repositories.adminTopics.all()
        commit('SET_TOPICS', res.data.topics)
      } catch(error) {

      }
    }
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

