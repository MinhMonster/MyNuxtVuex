import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";


export default {
  namespaced: true,
  state: () => ({
    isEvent: false,
    historyVotedDailyEvents: [],
    votedDaylyEvent: null,
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
    async voted({ commit }, payload) {
      try {
        const response = await this.$repositories.clientDailyEvents.voted(payload);
        return response
      } catch { }
    },
    async fetchStatusEvent({ commit, state }) {
      try {
        const response = await this.$repositories.clientDailyEvents.fetchStatusEvent();
        commit(SET_STATE, { isEvent: response.data.status });

      } catch { }
    },
    async fetchVotedDailyEventHistories({ commit, state }) {
      try {
        const response = await this.$repositories.clientDailyEvents.fetchVotedDailyEventHistories({ input: state.query });
        commit(SET_STATE, { historyVotedDailyEvents: response.data.historyVotedDailyEvents, votedDaylyEvent: response.data.voted });

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
