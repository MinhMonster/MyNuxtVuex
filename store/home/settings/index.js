import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";


export default {
  namespaced: true,
  state: () => ({
    notification: "",
    historyMeta: {},
    pageSave: 1,
    query: {
      page: 1,
      perPage: 10
    }
  }),
  getters: {
    getField,
  },
  actions: {
    async fetchNotification({ commit, state }) {
      try {
        const response = await this.$repositories.settings.fetchNotification();
        console.log("response", response.data.data);
        
        commit(SET_STATE, { notification: response.data.data });

      } catch { }
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

  },
  mutations: {
    updateField,
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
};
