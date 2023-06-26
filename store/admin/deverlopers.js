import { getField, updateField } from "vuex-map-fields";
import { cloneDeep } from "lodash";


const ADD_ACTION = "ADD_ACTION";
const ADD_ACTION_INDEX = "ADD_ACTION_INDEX";

const REMOVE_ACTION = "REMOVE_ACTION";

const UPDATE_ACTION = "UPDATE_ACTION";



export default {
  namespaced: true,
  state: () => ({
    deverlopers_scroll: [],
    datas: [],
    deverlopers: [],
    deverloper: {},
    deverloper_view: {},
    deverloper_edit: {},
    options: {},
    actions: [],
  }),
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
        // this.items.push('Item ' + this.nextItem++);
        // store.state.deverlopers_scroll.push(res.data.deverlopers_scroll)
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
        const res = await this.$repositories.adminDeverlopers.show_edit(id)
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

export const newDeverloper = {
  title: "",
  link: "",
  info: "",
  code: []
};



