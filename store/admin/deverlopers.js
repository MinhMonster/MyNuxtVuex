export default {
  namespaced: true,
  state: () => ({
    deverlopers: [],
    deverloper: [],
    deverloper_view:{}
  }),

  mutations: {
    SET_Deverlopers(state, deverlopers) {
      state.deverlopers = deverlopers
    },
    SET_Deverloper(state, deverloper) {
      state.deverloper = deverloper
    },
    SET_Deverloper_view(state, deverloper_view) {
      state.deverloper_view = deverloper_view
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
    async get_deverlopers({ commit }) {
      try{
        const res = await this.$repositories.adminDeverlopers.all()
        commit('SET_Deverlopers', res.data.deverlopers)
      } catch(error) {

      }
    },
    async get_deverloper({ commit }, id) {
      
      try{
        const res = await this.$repositories.adminDeverlopers.show(id)
        commit('SET_Deverloper', res.data.deverloper)
      } catch(error) {

      }
    },
    async get_deverloper_view({ commit }, id) {
      try{
        const res = await this.$repositories.adminDeverlopers.view(id)
        commit('SET_Deverloper_view', res.data.deverloper_view)
      } catch(error) {

      }
    }
  },

  // async get_deverloper({ commit }, id) {
  //   const res = await this.$repositories.adminDeverlopers.show(id)
  //   const { status, data } = res
  //   if (status === 200 && data.success && data.code) {
  //     const { data } = data
  //     commit('SET_Deverloper', res.data.deverloper)
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

