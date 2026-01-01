import { getField, updateField } from "vuex-map-fields";

const SET_STATE = "SET_STATE";
const SET_QUERY = "SET_QUERY";

export default {
  namespaced: true,
  state: () => ({
    users: [],
    sumPriceNinjas: "",
    countNinjas: "",
    user: null,
    metaNinjas: {},
    query: {
      page: 1,
      perPage: 15,
      q: {
        Ffname: null,
        username: null,
        id: null,
        uid: null,
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
    SET_STATE(state, payload) {
      _.each(payload, (value, key) => {
        state[key] = value;
      });
    },
    SET_NINJAS(state, payload) {
      state.users = payload.users
      state.sumPriceNinjas = payload.sumPrice
      state.countNinjas = payload.count
      state.metaNinjas = payload.pagy
    },

    SET_NINJA(state, payload) {
      state.user = payload
    },
  },

  actions: {

    async fetchUsers({ commit, state }) {
      try {
        const res = await this.$repositories.adminUsers.fetchUsers({ input: state.query })
        commit('SET_NINJAS', res.data)

      } catch (error) { }
    },
    async fetchUser({ commit }, payload) {
      try {
        const res = await this.$repositories.adminUsers.fetchUser(payload)
        commit('SET_NINJA', res.data.user)
      } catch (error) { }
    },
    async updateUser({ commit, state }, id) {
      try {
        const res = await this.$repositories.adminUsers.updateUser({
          id,
          input: state.gameAccountSold
        });
        if (res.data.gameAccountSold) {
          commit('SET_NINJA', res.data.gameAccountSold)
        }
        return res
      } catch (error) { }
    },

    setAccountNinja({ commit }, payload) {
      commit('SET_NINJA', payload);
    },
    setQuery({ commit, state }, payload) {
      commit(SET_QUERY, payload);
      commit(SET_STATE, { pageSave: state.query.page });
    },
    resetQuery({ commit }, payload) {
      const type = payload ? payload : null;
      commit(SET_QUERY, {
        page: 1,
        perPage: 15,
        q: {
          Ffname: null,
          username: null,
          id: null,
          uid: null,
        },
      });
    },
  },
}