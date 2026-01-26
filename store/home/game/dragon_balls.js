import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    accounts: [],
    meta: {},
    account: {},
    query: {
      page: 1,
      perPage: 2,
      q: {
        code: null,
        cash: null,
        class: null,
        server: null,
      },
    }
  }),

  getters: {
    getField,
  },

  mutations: {
    updateField,
    SET_QUERY(state, payload) {
      state.query = {
        ...state.query,
        ..._.cloneDeep(payload),
      };
    },
    SET_PAGE(state) {
      const page = _.cloneDeep(state.query.page)
      state.query.page = page + 1;
    },
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_DRAGON_BALLS(state, payload) {
      const accounts = _.cloneDeep(state.accounts);
      state.accounts = accounts.concat(payload.data);
      state.meta = payload.meta;
    },
    RESET_DRAGON_BALLS(state) {
      state.accounts = [];
      state.meta = {}
    },

    SET_DRAGON_BALL(state, payload) {
      state.account = payload
    },

  },

  actions: {
    newAccountDragonBall({ commit }) {
      commit(SET_STATE, { account: newAccountDragonBall });
    },

    async fetchAccountDragonBalls({ commit, state }) {
      try {
        const res = await this.$repositories.gameDragonBalls.fetchAccountDragonBalls({ input: state.query })
        commit('SET_DRAGON_BALLS', res.data.response);
      } catch (error) { }
    },
    async fetchAccountDragonBall({ commit }, payload) {
      try {
        const res = await this.$repositories.gameDragonBalls.fetchAccountDragonBall(payload)
        commit('SET_DRAGON_BALL', res.data.response)
      } catch (error) { }
    },

    setAccountDragonBall({ commit }, payload) {
      commit('SET_DRAGON_BALL', payload);
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
    },
    setPage({ commit, state }, payload) {
      commit(SET_PAGE, payload);
    },
    resetAccountDragonBalls({ commit }) {
      commit('RESET_DRAGON_BALLS');
    },
    resetQuery({ commit }) {
      commit(SET_QUERY, {
        page: 1,
        perPage: 2,
        q: {
          code: null,
          cash: null,
          class: null,
          server: null,
        },
      });
    },

  },
}

export const newAccountDragonBall = {
  ID: "",
  dat: "",
  ga: "",
  ca: "",
  inGame: "",
  thongtin: "",
  price: "",
  images: [],
};
