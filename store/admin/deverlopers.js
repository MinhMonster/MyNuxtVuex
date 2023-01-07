import { getField, updateField } from "vuex-map-fields";
export default {
  namespaced: true,
  state: () => ({
    deverlopers_scroll:[],
    datas:[],
    deverlopers: [],
    deverloper: false,
    deverloper_view:{},
    deverloper_edit:{}
  }),
  getters: {
    getField,
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
    },
    SET_Deverloper_edit(state, deverloper_edit) {
      state.deverloper_edit = deverloper_edit
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
    async get_deverlopers_scroll({ commit },payload) {
      try{
        const res = await this.$repositories.adminDeverlopers.scroll(payload)
        // this.items.push('Item ' + this.nextItem++);
        // store.state.deverlopers_scroll.push(res.data.deverlopers_scroll)
        commit('SET_Deverlopers_scroll', res.data.deverlopers_scroll)
      } catch(error) {

      }
    },
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
        commit('SET_Deverloper', res.data.deverloper)
      } catch(error) {

      }
    },
    async get_deverloper_edit({ commit }, id) {
      try{
        const res = await this.$repositories.adminDeverlopers.show_edit(id)
        commit('SET_Deverloper_edit', res.data.deverloper_edit)
        commit('SET_Deverloper', res.data.deverloper)
      } catch(error) {

      }
    },
    async change_positions({ commit }, payload) {
      try{
        const res = await this.$repositories.adminDeverlopers.change_positions(payload)
        commit('SET_Deverlopers', res.data.deverlopers)
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

